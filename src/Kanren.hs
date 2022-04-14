{-# LANGUAGE  DeriveGeneric  #-}
module Kanren where

import Data.List
import Data.Map (Map)
import qualified Data.Map as Map
import Data.Maybe (fromJust, maybe)
import Debug.Trace
import GHC.Generics (Generic)

type VarName = String

data Error = Occurred | Mismatch deriving (Eq, Show)

data Term
  = Var String
  | Atom String
  | Pair Term Term
  | Unit
  deriving (Eq, Show)

type Subst = Map String Term

-- Splitting = Key ([Variants] [Upstreams])
type Splitting = [(String, ([Int], [Term]))]

type KanrenState = (Subst, Int, Splitting)

emptyS :: KanrenState
emptyS = (Map.empty, 0, [])

isVar :: Term -> Bool
isVar (Var _) = True
isVar _ = False

isFresh :: Term -> Bool
isFresh (Var a) = "fresh" `isPrefixOf` a
isFresh _ = False

allVars :: Term -> [Term]
allVars v@(Var _) = [v]
allVars Atom {} = []
allVars Unit = []
allVars (Pair x y) = allVars x ++ allVars y

fromList :: [Term] -> Term
fromList [] = undefined
fromList [x] = x
fromList (x : xs) = Pair x (fromList xs)

toList :: Term -> [Term]
toList (Pair x y) = x : toList y
toList a = [a]

properList :: Term -> Bool
properList (Pair _ Unit) = True
properList (Pair _ b) = properList b
properList _ = False

atomToString :: Term -> String
atomToString (Atom x) = x
atomToString _ = error "Cannot deref a non-atom term"

varToString :: Term -> String
varToString (Var x) = x
varToString _ = error "Cannot deref a non-var term"

concat' :: Term -> Term -> Term
concat' a b
  | properList a = Pair a b
  | otherwise =
    case a of
      Pair x y -> Pair x (concat' y b)
      _ -> Pair a b

walk :: KanrenState -> Term -> Term
walk (subst, n, splitting) (Var x) = maybe (Var x) (walk (subst, n, splitting)) (Map.lookup x subst)
walk _ term = term

walk' :: KanrenState -> Term -> Term
walk' sub v =
  let v' = walk sub v
   in case v' of
        Var x -> Var x
        Pair h t -> Pair (walk' sub h) (walk' sub t)
        _ -> v'

extend :: VarName -> Term -> KanrenState -> Either Error KanrenState
extend x term (subst, n, splitting) =
  if occurs (subst, n, splitting) x term
    then Left Occurred
    else Right (Map.insert x term subst, n, splitting)

occurs :: KanrenState -> VarName -> Term -> Bool
occurs subst x term =
  case walk subst term of
    Var y ->
      x == y
    Pair a b ->
      occurs subst x a || occurs subst x b
    _ ->
      False

-- x  a b = a * b  (x=== funOf [var a, var b, var c])
-- u = x 3 4  (var x' === funOf  [atom int, atom int var u])

unify :: Term -> Term -> KanrenState -> Either Error KanrenState
unify a b st =
  case (walk st a, walk st b) of
    (Atom x, Atom y) ->
      if x == y
        then Right st
        else Left Mismatch
    (Var x, Var y) ->
      if x == y
        then Right st
        else extend x (Var y) st
    (Var x, term) ->
      extend x term st
    (term, Var y) ->
      extend y term st
    (Pair a1 a2, Pair b1 b2) ->
      unify a1 b1 st >>= unify a2 b2
    (Unit, Unit) ->
      Right st
    _ ->
      Left Mismatch

type Goal = (KanrenState -> [KanrenState])

succeeds :: Goal
succeeds sub = [sub]

fails :: Goal
fails _ = []

(===) :: Term -> Term -> Goal
(===) x y sub =
  case unify x y sub of
    Left e -> []
    Right s -> [s]

split Unit n = Unit
split (Atom x) n = Atom x
split (Var x) n = var $ x ++ ".split." ++ show n
split (Pair x y) n = Pair (split x n) (split y n)

makeSplitter :: Term -> Goal
makeSplitter (Var str) (sub, n, splitting)
  | Just _ <- lookup str splitting = succeeds (sub, n, splitting)
  | otherwise = succeeds (sub, n, (str, ([], [])) : splitting)
makeSplitter _ _ = error "Making splitter using non-variable term"

setSplit :: Splitting -> String -> [Int] -> Splitting
setSplit [] x ns = []
setSplit ((v, (splits, upstreams)) : rest) x ns
  | x == v = (v, (ns, upstreams)) : rest
  | otherwise = (v, (splits, upstreams)) : setSplit rest x ns

addUpstream :: Splitting -> String -> Term -> Splitting
addUpstream [] x upstream = []
addUpstream ((v, (splits, upstreams)) : rest) x upstream
  | x == v && upstream `notElem` upstreams && var x /= upstream =
    -- trace ("[Add upstram" ++ show upstream ++ " to " ++ x ++"]") $
    (v, (splits, upstream : upstreams)) : rest
  | otherwise = (v, (splits, upstreams)) : addUpstream rest x upstream

-- Splitter has two relations: MatchUp and MatchDown
-- MatchUp (Splitter =.= RHS):  RHS vars will be splitters too
-- Propagate (Splitter =.= Splitter):
-- MatchDown (LHS =.= Splitter): LHS will match every splits
showSubs :: KanrenState -> IO ()
showSubs (a, b, c) = mapM_ print $ Map.toList a

showSplits :: KanrenState -> IO ()
showSplits (a, b, c) = mapM_ print c

showState :: KanrenState -> IO ()
showState st = do
  putStrLn "Subs:"
  showSubs st
  putStrLn "Splits:"
  showSplits st

(=.=>) :: Term -> Term -> Goal
(=.=>) (Var x) (Var y) (sub, n, splitting)
  | Just (splits, upstreams) <- lookup x splitting,
    Nothing <- lookup y splitting -- match up
    =
    -- trace ("Match up var " ++ x ++ " to var " ++ y ++ " Split: " ++ show splits ++ " Upstream: " ++ show upstreams) $
    let newSplitting = addUpstream ((y, (splits, [])) : splitting) x (var y)
     in conjN (map (\m -> split (var x) m === split (var y) m) splits ++ [Var x === Var y]) (sub, n, newSplitting)
  | Nothing <- lookup x splitting,
    Just (splits, upstreams) <- lookup y splitting -- match down (multiple)
    =
    -- trace ("Match down var " ++ y ++ " to var " ++ x ++ " Creating new split: " ++ show n ++ " Upstream: " ++ show upstreams) $
    let newSplits = n : splits
        newGoal = split (var y) n === var x
        newPropGoals = map (\u -> var y =.=> u) upstreams -- match up
        newSplitting = setSplit splitting y newSplits
     in conjN (newGoal : newPropGoals) (sub, n + 1, newSplitting)
  | Just (splits, _) <- lookup x splitting,
    Just (splits', upstreams) <- lookup y splitting -- Propagate
    =
    -- trace ("Propagate var " ++ x ++ " to var " ++ y ++ " Split: " ++ show splits ++ " Upstream: " ++ show upstreams) $
    let newSplitting = setSplit splitting y (nub (splits ++ splits'))
        newSplitting' = addUpstream newSplitting x (Var y)
        newPropGoals = map (\u -> var y =.=> u) upstreams
        matchingGoals = map (\sp' -> split (var x) sp' === split (var y) sp') splits
     in conjN (newPropGoals ++ matchingGoals ++ [var x === var y]) (sub, n, newSplitting')
  | Nothing <- lookup x splitting, Nothing <- lookup y splitting = (var x === var y) (sub, n, splitting)
(=.=>) (Var x) t@(Atom _) (sub, n, splitting)
  | Just (splits, upstreams) <- lookup x splitting =
    -- trace ("Match up var " ++ x ++ " to atom " ++ show t ++ " With Split : " ++ show splits) $
    let newSplitting = addUpstream splitting x t
     in conjN (map ((=== t) . split (Var x)) splits ++ [var x === t]) (sub, n, newSplitting) -- match up
  | otherwise = var x === t $ (sub, n, splitting)
(=.=>) t@(Atom _) (Var x) (sub, n, splitting)
  | Just splits <- lookup x splitting = error "Match down to a non-variable term is forbidden" -- match down (not allowed)
  | otherwise = var x === t $ (sub, n, splitting)
(=.=>) (Var x) t@(Pair a b) (sub, n, splitting)
  | Just (splits, upstreams) <- lookup x splitting =
    -- trace ("Match up var " ++ x ++ " to pair " ++ show t ++ ". Split: " ++ show splits ++ " Upstream: " ++ show upstreams) $ -- match up
    let vleft = x ++ ".left"
        vright = x ++ ".right"
        insertLeftRight = case (lookup vleft splitting, lookup vright splitting) of
          (Nothing, Nothing) -> ((vleft, (splits, [])) :) . ((vright, (splits, [])) :)
          (Just _, Nothing) -> (\sp -> setSplit sp vleft splits) . ((vright, (splits, [])) :)
          (Nothing, Just _) -> ((vleft, (splits, [])) :) . (\sp -> setSplit sp vright splits)
          (Just _, Just _) -> (\sp -> setSplit sp vleft splits) . (\sp -> setSplit sp vright splits)
        newSplitting =
          insertLeftRight
            . (\s' -> addUpstream s' x $ Pair (var vleft) (var vright))
            $ splitting
        propGoal = map (\n -> split (var x) n === Pair (split (var vleft) n) (split (var vright) n)) splits
     in conjN
          ( [var vleft =.=> a, var vright =.=> b, var x === t] -- match up
              ++ propGoal
          )
          (sub, n, newSplitting)
  | otherwise = var x === t $ (sub, n, splitting)
(=.=>) t@(Pair _ _) (Var x) (sub, n, splitting)
  | Just splits <- lookup x splitting = error "Match down to a non-variable term is forbidden" -- match down (not allowed)
  | otherwise = var x === t $ (sub, n, splitting)
(=.=>) x y s = x === y $ s

(==<) :: Term -> Term -> Goal
(==<) = copy

copy :: Term -> Term -> Goal
copy x y (sub, n, splitting) =
  let y' = walk' (sub, n, splitting) y
      uniqueVars = nub (allVars y')
      copiedVars = map (var . ("internal." ++) . show) . take (length uniqueVars) $ [n ..]
      mapping = zip uniqueVars copiedVars
      replace v@(Var _) origAndCopy = snd . fromJust $ find ((== v) . fst) origAndCopy
      replace (Pair x y) origAndCopy = Pair (replace x origAndCopy) (replace y origAndCopy)
      replace n _ = n
      newY = replace y' mapping
   in (x === newY) (sub, n + length uniqueVars, splitting)

conj2 :: Goal -> Goal -> Goal
conj2 g1 g2 sub = g1 sub >>= g2

conjN :: [Goal] -> Goal
conjN [] sub = succeeds sub
conjN (goal : goals) sub = goal sub >>= conjN goals

disj2 :: Goal -> Goal -> Goal
disj2 g1 g2 sub = interleave (g1 sub) (g2 sub)

disjN :: [Goal] -> Goal
disjN = foldr disj2 fails

interleave :: [a] -> [a] -> [a]
interleave a b =
  case (a, b) of
    ([], y) ->
      y
    (x : xs, y) ->
      x : interleave y xs

appendMap :: Goal -> [KanrenState] -> [KanrenState]
appendMap g = foldr (interleave . g) []

ifte :: Goal -> Goal -> Goal -> Goal
ifte g1 g2 g3 st =
  let s' = g1 st
   in if null s'
        then g3 st
        else appendMap g2 s'

once :: Goal -> Goal
once g sub =
  let sub' = g sub
   in case sub' of
        [] -> []
        s : ss -> [s]

always :: Goal
always = disj2 succeeds always

never :: Goal
never = never

var = Var

atom = Atom

callFresh :: (Term -> Goal) -> Goal
callFresh f (sub, n, splitting) = f (Var ("internal." ++ show n)) (sub, n + 1, splitting)

callFreshN :: Int -> ([Term] -> Goal) -> Goal
callFreshN m f (sub, n, splitting) = f (map (var . ("internal." ++) . show) . take m $ [n ..]) (sub, n + m, splitting)

callFreshNamed :: VarName -> (Term -> Goal) -> Goal
callFreshNamed varname f = f (Var varname)

callFreshNamed2 :: VarName -> VarName -> (Term -> Term -> Goal) -> Goal
callFreshNamed2 varname1 varname2 f = f (Var varname1) (Var varname2)

reifyName :: Int -> String
reifyName n = "_." ++ show n

replaceTerm :: Term -> Term -> Term -> Term
replaceTerm old new v@(Var _) = if v == old then new else v
replaceTerm old new (Pair x y) = Pair (replaceTerm old new x) (replaceTerm old new y)
replaceTerm old new x = x

reifyS :: Term -> KanrenState -> KanrenState
reifyS term (sub, n, splitting) =
  let v = walk (sub, n, splitting) term
   in case v of
        Var v' ->
          let n = length sub
              rn = reifyName n
           in (Map.insert v' (var rn) sub, n, splitting)
        Pair h t ->
          let r = reifyS h (sub, n, splitting)
           in reifyS t r
        _ -> (sub, n, splitting)

reify :: Term -> KanrenState -> Term
reify term sub =
  let v = walk' sub term
      r = reifyS v emptyS
   in walk' r v

runGoalN :: Int -> Goal -> [KanrenState]
runGoalN n g = take n (g emptyS)

runGoalNWithState :: KanrenState -> Int -> Goal -> [KanrenState]
runGoalNWithState st n g = take n (g st)

runGoalWithState :: KanrenState -> Goal -> [KanrenState]
runGoalWithState st g = g st

runGoal :: Goal -> [KanrenState]
runGoal g = g emptyS

conde :: [[Goal]] -> Goal
conde conds = disjN (fmap conjN conds)

conda :: [[Goal]] -> Goal
conda [] = fails
conda [g] = conjN g
conda (g : gs) = ifte (head g) (conjN (tail g)) (conda gs)

condu :: [[Goal]] -> Goal
condu [] = fails
condu (g : gs) = conda $ (once (head g) : tail g) : gs

run :: [String] -> Goal -> [[Term]]
run vars g = map (\sub -> map (\v -> reify (Var v) sub) vars) (runGoal g)

runN :: Int -> [String] -> Goal -> [[Term]]
runN n vars g = map (\sub -> map (\v -> reify (Var v) sub) vars) (runGoalN n g)

runNWithState :: KanrenState -> Int -> [String] -> Goal -> [[Term]]
runNWithState st n vars g = map (\sub -> map (\v -> reify (Var v) sub) vars) (runGoalNWithState st n g)

run1WithState :: KanrenState -> [String] -> Goal -> [[Term]]
run1WithState st = runNWithState st 1

run1 :: [String] -> Goal -> [[Term]]
run1 = runN 1

run2 :: [String] -> Goal -> [[Term]]
run2 = runN 2

run3 :: [String] -> Goal -> [[Term]]
run3 = runN 3

run4 :: [String] -> Goal -> [[Term]]
run4 = runN 4

run5 :: [String] -> Goal -> [[Term]]
run5 = runN 5

conso :: Term -> Term -> Term -> Goal
conso x y pair = pair === Pair x y

heado :: Term -> Term -> Goal
heado (Pair t' _) t = t === t'
heado _ _ = fails

elemo :: Term -> Term -> Goal
elemo t (Pair x xs) =
  disj2 (x === t) (elemo t xs)
elemo t _ = fails

plus :: Goal
plus =
  let plusG t =
        conjN
          [ var "f" === funOf [atom "int", atom "int", atom "int"],
            callFresh (\v -> conjN [v ==< var "f", v === t])
          ]
   in conjN
        [ plusG $ funOf [atom "int", var "x", var "y"],
          plusG $ funOf [atom "int", var "z"]
        ]

matchFun env name t = case lookup name env of
  Nothing -> fails
  Just t' -> callFresh (\f -> conj2 (f ==< t') (f === t))

identity :: Goal
identity =
  let env = [("identity", funOf [var "a", var "a"])]
   in conjN
        [ matchFun env "identity" $ funOf [var "x", atom "int"],
          matchFun env "identity" $ funOf [atom "bool", var "y"],
          matchFun env "identity" $ funOf [lstOf (atom "char"), var "z"]
        ]

eq :: Goal
eq =
  let eqG t =
        conjN
          [ var "f" === funOf [var "a", var "a", atom "bool"],
            callFresh (\v -> conjN [v ==< var "f", v === t])
          ]
   in conjN
        [ eqG $ funOf [atom "int", var "x", var "y"],
          eqG $ funOf [atom "int", var "z"]
        ]

testOrder :: Goal
testOrder =
  let env =
        [ ("y", funOf [var "x", Atom "Int"]),
          ("z", funOf [var "y", Atom "Int"]),
          ("x", funOf [Atom "Int", Atom "Int", var "u"])
        ]
   in conjN
        [ var "u" === atom "Int",
          matchFun env "y" (funOf [Atom "Int", var "z"]),
          matchFun env "x" (funOf [Atom "Int", var "y"])
        ]

testPoly :: Goal
testPoly =
  let x = 1
   in conjN
        [ makeSplitter (var "id"),
          var "f1" === funOf [atom "Int", var "x"],
          var "f2" === funOf [var "y", atom "Bool"],
          var "f1" =.=> var "id",
          var "f2" =.=> var "id",
          var "id" =.=> funOf [var "a", var "a"],
          succeeds
        ]

tupOf :: [Term] -> Term
tupOf [] = Unit
tupOf [x] = x
tupOf (x:xs) = Pair (atom "Tuple") (Pair x (tupOf xs))

lstOf :: Term -> Term
lstOf = Pair (atom "List")

funOf :: [Term] -> Term
funOf [] = Unit
funOf [x] = x
funOf (x : xs) = Pair (atom "Function") (Pair x (funOf xs))

termToType :: Term -> String
termToType term =
  go (zip (allVars term) ['a' ..]) 0 Unit term
  where
    go :: [(Term, Char)] -> Int -> Term -> Term -> String
    go varMap n parent Unit = ""
    go varMap n parent (Var ('_' : '.' : x)) = [['a' ..] !! (read x :: Int)]
    go varMap n parent (Atom x) = x
    -- go varMap n parent (Var x) = [fromJust (lookup (Var x) varMap)]
    go varMap n parent p@(Pair (Atom "Function") (Pair a b))
      | isFunction parent && n == 0 = "(" ++ go varMap 0 p a ++ " -> " ++ go varMap 1 p b ++ ")"
      | otherwise = go varMap 0 p a ++ " -> " ++ go varMap 1 p b
    go varMap n parent p@(Pair (Atom "List") t) = "[" ++ go varMap 0 p t ++ "]"
    go varMap n parent p@(Pair (Atom "Tuple") t) =
      -- let listP = toList t
      --     content = intercalate "," (zipWith (\t' n' -> go varMap n' p t') listP [0 ..])
      --  in "(" ++ content ++ ")"
      "(" ++  go varMap 0 p t ++ ")"
    go varMap n parent p@(Pair x y)
      | isTypeCon parent =
        let listP = toList y
            content = unwords (zipWith (\t' n' -> go varMap n' p t') listP [0 ..])
         in "(" ++ content ++ ")"
      | otherwise =
        let listP = toList y
            content = unwords (zipWith (\t' n' -> go varMap n' p t') listP [0 ..])
         in content
    go _ _ _ _ = error ""


toSig t = fromTerm t Unit Empty

data TypeForm = TypeFormPart String | TypeForm [TypeForm] deriving (Show, Eq, Generic)

-- instance Semigroup TypeForm where
--   (<>) = mappend

-- instance Monoid  TypeForm where
--   mappend (TypeFormPart a)  (TypeFormPart b) = TypeForm [TypeFormPart a, TypeFormPart b]
--   mappend (TypeForm a) (TypeForm b) = TypeForm (a ++ b)
--   mappend (TypeFormPart a) (TypeForm b) = TypeForm (TypeFormPart a:b)
--   mappend (TypeForm b) (TypeFormPart a)  = TypeForm (b ++ [TypeFormPart a ])
--   mempty = TypeForm []

toTypeForm :: Term -> Term -> Flag -> TypeForm
-- fromTerm varMap term parentTerm level index
toTypeForm Unit parent flag = TypeForm []

toTypeForm (Atom x) parent flag  = TypeFormPart x

toTypeForm (Var ('_' : '.' : x)) parent flag = TypeFormPart  [['a' ..] !! (read x :: Int)]

toTypeForm (Var _) parent index = error "Variable is not fresh"

toTypeForm p@(Pair (Atom "Function") (Pair a b)) parent flag
      | isFunction parent && flag == FunctionFirst =
          TypeForm [
            TypeFormPart"(",
             toTypeForm a p FunctionFirst,
             TypeFormPart"->" ,
              toTypeForm b p Empty,
              TypeFormPart")"]
      | otherwise =
        TypeForm [toTypeForm a p FunctionFirst,TypeFormPart  "->", toTypeForm b p Empty]

toTypeForm p@(Pair (Atom "List") t) parent flag =
  TypeForm [TypeFormPart"[", toTypeForm t p Empty, TypeFormPart"]"]

toTypeForm p@(Pair (Atom "Tuple") (Pair a b)) parent flag =
  TypeForm [
    TypeFormPart"(" ,
    toTypeForm a p TupleFirst ,
    TypeFormPart ",",
    toTypeForm b p TupleBody,
    TypeFormPart ")"]

toTypeForm p@(Pair x y) parent flag
      | isTypeCon parent =
          TypeForm [
            TypeFormPart"(" ,
            toTypeForm x parent Empty ,
            TypeFormPart" ",
            toTypeForm y parent Empty,
             TypeFormPart")"]
      | otherwise =
          TypeForm [toTypeForm x p Empty , TypeFormPart" ", toTypeForm y p Empty]

typeForm t = toTypeForm t Unit Empty

fromTerm :: Term -> Term -> Flag -> String
-- fromTerm varMap term parentTerm level index
fromTerm Unit parent flag = ""
fromTerm (Atom x) parent flag  = x
fromTerm (Var ('_' : '.' : x)) parent flag = [['a' ..] !! (read x :: Int)]
fromTerm (Var _) parent index = error "Variable is not fresh"
fromTerm p@(Pair (Atom "Function") (Pair a b)) parent flag
      | isFunction parent && flag == FunctionFirst = mconcat ["(", fromTerm a p FunctionFirst, "->" , fromTerm b p Empty, ")"]
      | otherwise = mconcat [fromTerm a p FunctionFirst,  "->", fromTerm b p Empty]

fromTerm p@(Pair (Atom "List") t) parent flag = mconcat ["[", fromTerm t p Empty, "]"]

fromTerm p@(Pair (Atom "Tuple") (Pair a b)) parent flag   = mconcat ["(" , fromTerm a p TupleFirst , ",", fromTerm b p TupleBody,  ")"]

fromTerm p@(Pair x y) parent flag
      | isTypeCon parent = mconcat ["(" , fromTerm x parent Empty , " ", fromTerm y parent Empty,  ")"]
      | otherwise = mconcat [fromTerm x p Empty , " ", fromTerm y p Empty]

data Flag = TupleRoot | TupleFirst | TupleBody | FunctionFirst | Empty deriving(Eq)

isFunction :: Term -> Bool
isFunction (Pair (Atom "Function") _) = True
isFunction _ = False

funHead :: Term -> Term
funHead (Pair (Atom "Function") (Pair a b)) = a
funHead _ = error "Function head applied to non functional term"

funBody :: Term -> Term
funBody (Pair (Atom "Function") (Pair a b)) = b
funBody _ = error "Function body applied to non functional term"

isTuple :: Term -> Bool
isTuple (Pair (Atom "Tuple") _) = True
isTuple _ = False

isTypeCon :: Term -> Bool
isTypeCon (Pair (Atom "Function") _) = False
isTypeCon (Pair (Atom "List") _) = False
isTypeCon (Pair (Atom "Tuple") _) = False
isTypeCon (Pair _ _) = True
isTypeCon _ = False

prettyTerm :: Term -> String
prettyTerm Unit = ""
prettyTerm (Var x)
  | "fresh." `isPrefixOf` x = x
  | "internal." `isPrefixOf` x = x
  | otherwise = takeWhile (/= '.') x
prettyTerm (Atom x) = x
prettyTerm (Pair x y) = prettyTerm x ++ ", " ++ prettyTerm y

moreConcreteThan :: Term -> Term -> Bool
moreConcreteThan (Pair a1 a2) (Pair b1 b2) = a1 `moreConcreteThan` b1 && a2 `moreConcreteThan` b2
moreConcreteThan (Pair _ _) _ = True
moreConcreteThan (Atom _) (Var _) = True
moreConcreteThan _ _ = False


-- examples
kstring = Pair (atom "List") (atom "Char")
kmaybeInt = Pair (atom "Maybe") (atom "Int")
kmaybeString = Pair (atom "Maybe") kstring
kmaybemaybeInt = Pair (atom "Maybe") kmaybeInt

kflip = funOf [funOf [atom "a", atom "b" , atom "c"] , atom "b", atom "a", atom "c"]
