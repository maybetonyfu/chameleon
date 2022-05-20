{-# LANGUAGE DeriveGeneric #-}

module Kanren where

import Control.Lens hiding (Empty)
import Data.List
import Data.Map (Map)
import qualified Data.Map as Map
import Data.Maybe (fromJust, maybe)
import Debug.Trace
import GHC.Generics (Generic)

data Requirement = Need String | Provid String deriving (Eq, Ord, Show)

type VarName = String

data Error = Occurred | Mismatch deriving (Eq, Show)

data Term
  = Var String [Requirement]
  | Atom String [Requirement]
  | Pair Term Term [Requirement]
  | Unit
  deriving (Show, Eq, Ord)

concatTag :: [Requirement] -> Term -> Term
concatTag tags (Var x tags') = Var x (tags' ++ tags)
concatTag tags (Atom x tags') = Atom x (tags' ++ tags)
concatTag tags (Pair x y tags') = Pair x y (tags' ++ tags)
concatTag _ Unit = Unit

-- instance Eq Term where
--   Var x _ == Var y _ = x == y
--   Atom x _ == Atom y _ = x == y
--   Pair x1 x2 _ == Pair y1 y2 _ = x1 == x2 && y1 == y2
--   Unit == Unit = True
--   _ == _ = False

type Subst = Map String Term

type KanrenState = (Subst, Int)

emptyS :: KanrenState
emptyS = (Map.empty, 0)

isVar :: Term -> Bool
isVar (Var _ _) = True
isVar _ = False

isFresh :: Term -> Bool
isFresh (Var a _) = "fresh" `isPrefixOf` a
isFresh _ = False

allVars :: Term -> [Term]
allVars v@(Var _ _) = [v]
allVars Atom {} = []
allVars Unit = []
allVars (Pair x y _) = allVars x ++ allVars y

fromList :: [Term] -> Term
fromList [] = undefined
fromList [x] = x
fromList (x : xs) = Pair x (fromList xs) []

toList :: Term -> [Term]
toList (Pair x y _) = x : toList y
toList a = [a]

properList :: Term -> Bool
properList (Pair _ Unit _) = True
properList (Pair _ b _) = properList b
properList _ = False

atomToString :: Term -> String
atomToString (Atom x _) = x
atomToString _ = error "Cannot deref a non-atom term"

varToString :: Term -> String
varToString (Var x _) = x
varToString _ = error "Cannot deref a non-var term"

walk :: KanrenState -> Term -> Term
walk (subst, n) (Var x tags) = maybe (Var x tags) (concatTag tags . walk (subst, n)) (Map.lookup x subst)
walk _ term = term

walk' :: KanrenState -> Term -> Term
walk' sub v =
  let v' = walk sub v
   in case v' of
        Var x tags -> Var x tags
        Pair h t tags -> Pair (walk' sub h) (walk' sub t) tags
        _ -> v'

extend :: VarName -> Term -> KanrenState -> Either Error KanrenState
extend x term (subst, n) =
  if occurs (subst, n) x term
    then Left Occurred
    else Right (Map.insert x term subst, n)

occurs :: KanrenState -> VarName -> Term -> Bool
occurs subst x term =
  case walk subst term of
    Var y tags ->
      x == y
    Pair a b _ ->
      occurs subst x a || occurs subst x b
    _ ->
      False

-- x  a b = a * b  (x=== funOf [var a, var b, var c])
-- u = x 3 4  (var x' === funOf  [atom int, atom int var u])

unify :: Term -> Term -> KanrenState -> Either Error KanrenState
unify a b st =
  case (walk st a, walk st b) of
    (Atom x tagsX, Atom y tagsY) ->
      if x == y
        then Right st
        else Left Mismatch
    (Var x tagsX, Var y tagsY) ->
      if x == y
        then Right st
        else extend x (Var y (tagsY ++ tagsX)) st
    (Var x tags, term) ->
      extend x term st
    (term, Var y tags) ->
      extend y term st
    (Pair a1 a2 tagsA, Pair b1 b2 tagsB) ->
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

-- Splitter has two relations: MatchUp and MatchDown
-- MatchUp (Splitter =.= RHS):  RHS vars will be splitters too
-- Propagate (Splitter =.= Splitter):
-- MatchDown (LHS =.= Splitter): LHS will match every splits
showSubs :: KanrenState -> IO ()
showSubs (a, b) = mapM_ print $ Map.toList a

(==<) :: Term -> Term -> Goal
(==<) = copy

copy :: Term -> Term -> Goal
copy x y (sub, n) =
  let y' = walk' (sub, n) y
      oldVars = nub (allVars y')
      newVars =
        zipWith
          ( \(Var _ tags) i ->
              Var (intercalate "." ["internal", show i]) tags
          )
          oldVars
          [n ..]
      mapping = zip oldVars newVars
      replace v@(Var _ _) origAndCopy = snd . fromJust $ find ((== v) . fst) origAndCopy
      replace (Pair x y tags) origAndCopy = Pair (replace x origAndCopy) (replace y origAndCopy) tags
      replace n _ = n
      newY = replace y' mapping
   in (x === newY) (sub, n + length newVars)

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

var x = Var x []

atom x = Atom x []

pair x y = Pair x y []

getTags :: Term -> [Requirement]
getTags (Var _ tags) = tags
getTags (Atom _ tags) = tags
getTags (Pair _ _ tags) = tags
getTags Unit = []

setTags :: [Requirement] -> Term -> Term
setTags tags (Var x _) = Var x tags
setTags tags (Atom x _) = Atom x tags
setTags tags (Pair x y _) = Pair x y tags
setTags _ Unit = Unit

appendTags :: [Requirement] -> Term -> Term
appendTags tags t = setTags (getTags t ++ tags) t

callFresh :: (Term -> Goal) -> Goal
callFresh f (sub, n) = f (var ("internal." ++ show n)) (sub, n + 1)

callFreshN :: Int -> ([Term] -> Goal) -> Goal
callFreshN m f (sub, n) = f (map (var . ("internal." ++) . show) . take m $ [n ..]) (sub, n + m)

callFreshNamed :: VarName -> (Term -> Goal) -> Goal
callFreshNamed varname f = f (var varname)

callFreshNamed2 :: VarName -> VarName -> (Term -> Term -> Goal) -> Goal
callFreshNamed2 varname1 varname2 f = f (var varname1) (var varname2)

reifyName :: Int -> String
reifyName n = "_." ++ show n

replaceTerm :: Term -> Term -> Term -> Term
replaceTerm old new v@(Var _ _) = if v == old then new else v
replaceTerm old new (Pair x y tags) = Pair (replaceTerm old new x) (replaceTerm old new y) tags
replaceTerm old new x = x

-- name KanrenState

reifyS :: Term -> KanrenState -> KanrenState
reifyS term (sub, n) =
  let v = walk (sub, n) term
   in case v of
        Var v' tags ->
          let n = length sub
              rn = reifyName n
           in (Map.insert v' (Var rn tags) sub, n)
        Pair h t tags ->
          let r = reifyS h (sub, n)
           in reifyS t r
        _ -> (sub, n)

reify :: Term -> KanrenState -> Term
reify term sub =
  let v = walk' sub term
      r =
        -- trace ("\n[Reify] " ++ show term ++ " ->" ++ show v ++ "\n") $
        reifyS v emptyS
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
run vars g = map (\sub -> map (\v -> reify (var v) sub) vars) (runGoal g)

runN :: Int -> [String] -> Goal -> [[Term]]
runN n vars g = map (\sub -> map (\v -> reify (var v) sub) vars) (runGoalN n g)

runNWithState :: KanrenState -> Int -> [String] -> Goal -> [[Term]]
runNWithState st n vars g = map (\sub -> map (\v -> reify (var v) sub) vars) (runGoalNWithState st n g)

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
conso x y pair = pair === Pair x y []

heado :: Term -> Term -> Goal
heado (Pair t' _ _) t = t === t'
heado _ _ = fails

elemo :: Term -> Term -> Goal
elemo t (Pair x xs _) =
  disj2 (x === t) (elemo t xs)
elemo t _ = fails

plus :: Goal
plus =
  let plusG t =
        conjN
          [ var "f" === funOf [var "x", var "x", var "x"],
            callFresh (\v -> conjN [v ==< var "f", v === t])
          ]
   in conjN
        [ plusG $ funOf [atom "int", var "u", var "v"],
          plusG $ funOf [atom "char", var "z"]
        ]

runAndShow = mapM_ (\(sub, _) -> mapM_ print (Map.toList sub)) . runGoalWithState emptyS

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
          eqG $ funOf [atom "char", var "z"]
        ]

testOrder :: Goal
testOrder =
  let env =
        [ ("y", funOf [var "x", atom "Int"]),
          ("z", funOf [var "y", atom "Int"]),
          ("x", funOf [atom "Int", atom "Int", var "u"])
        ]
   in conjN
        [ var "u" === atom "Int",
          matchFun env "y" (funOf [atom "Int", var "z"]),
          matchFun env "x" (funOf [atom "Int", var "y"])
        ]

tupOf :: [Term] -> Term
tupOf [] = Unit
tupOf [x] = x
tupOf (x : xs) = pair (atom "Tuple") (pair x (tupOf xs))

lstOf :: Term -> Term
lstOf = pair (atom "List")

funOf :: [Term] -> Term
funOf [] = Unit
funOf [x] = x
funOf (x : xs) = pair (atom "Function") (pair x (funOf xs))

termToType :: Term -> String
termToType term =
  go (zip (allVars term) ['a' ..]) 0 Unit term
  where
    go :: [(Term, Char)] -> Int -> Term -> Term -> String
    go varMap n parent Unit = ""
    go varMap n parent (Var ('_' : '.' : x) _) = [['a' ..] !! (read x :: Int)]
    go varMap n parent (Atom x _) = x
    -- go varMap n parent (Var x) = [fromJust (lookup (Var x) varMap)]
    go varMap n parent p@(Pair (Atom "Function" _) (Pair a b _) _)
      | isFunction parent && n == 0 = "(" ++ go varMap 0 p a ++ " -> " ++ go varMap 1 p b ++ ")"
      | otherwise = go varMap 0 p a ++ " -> " ++ go varMap 1 p b
    go varMap n parent p@(Pair (Atom "List" _) t _) = "[" ++ go varMap 0 p t ++ "]"
    go varMap n parent p@(Pair (Atom "Tuple" _) t _) =
      -- let listP = toList t
      --     content = intercalate "," (zipWith (\t' n' -> go varMap n' p t') listP [0 ..])
      --  in "(" ++ content ++ ")"
      "(" ++ go varMap 0 p t ++ ")"
    go varMap n parent p@(Pair x y _)
      | isTypeCon parent =
        let listP = toList y
            content = unwords (zipWith (\t' n' -> go varMap n' p t') listP [0 ..])
         in "(" ++ content ++ ")"
      | otherwise =
        let listP = toList y
            content = unwords (zipWith (\t' n' -> go varMap n' p t') listP [0 ..])
         in content
    go _ _ _ _ = error ""

toSig t =
  let varmap = zip (allVars t) (map (: []) ['a' ..])
   in fromTerm varmap t Unit Empty

data TypeForm = TypeFormPart String | TypeForm [TypeForm] deriving (Show, Eq, Generic)

toTypeForm :: Term -> Term -> Flag -> TypeForm
-- fromTerm varMap term parentTerm level index
toTypeForm Unit parent flag = TypeForm []
toTypeForm (Atom x _) parent flag = TypeFormPart x
toTypeForm (Var ('_' : '.' : x) _) parent flag = TypeFormPart [['a' ..] !! (read x :: Int)]
toTypeForm (Var _ _) parent index = error "Variable is not fresh"
toTypeForm p@(Pair (Atom "Function" _) (Pair a b _) _) parent flag
  | isFunction parent && flag == FunctionFirst =
    TypeForm
      [ TypeFormPart "(",
        toTypeForm a p FunctionFirst,
        TypeFormPart "->",
        toTypeForm b p Empty,
        TypeFormPart ")"
      ]
  | otherwise =
    TypeForm [toTypeForm a p FunctionFirst, TypeFormPart "->", toTypeForm b p Empty]
toTypeForm p@(Pair (Atom "List" _) t _) parent flag =
  TypeForm [TypeFormPart "[", toTypeForm t p Empty, TypeFormPart "]"]
toTypeForm p@(Pair (Atom "Tuple" _) (Pair a b _) _) parent flag =
  TypeForm
    [ TypeFormPart "(",
      toTypeForm a p TupleFirst,
      TypeFormPart ",",
      toTypeForm b p TupleBody,
      TypeFormPart ")"
    ]
toTypeForm p@(Pair x y _) parent flag
  | isTypeCon parent =
    TypeForm
      [ TypeFormPart "(",
        toTypeForm x parent Empty,
        TypeFormPart " ",
        toTypeForm y parent Empty,
        TypeFormPart ")"
      ]
  | otherwise =
    TypeForm [toTypeForm x p Empty, TypeFormPart " ", toTypeForm y p Empty]

typeForm t = toTypeForm t Unit Empty

fromTerm :: [(Term, String)] -> Term -> Term -> Flag -> String
-- fromTerm varMap term parentTerm level index
fromTerm varmap Unit parent flag = ""
fromTerm varmap (Atom x _) parent flag = x
fromTerm varmap v@(Var x _) parent flag = fromJust (lookup v varmap)
fromTerm varmap p@(Pair (Atom "Function" _) (Pair a b _) _) parent flag
  | isFunction parent && flag == FunctionFirst = mconcat ["(", fromTerm varmap a p FunctionFirst, "->", fromTerm varmap b p Empty, ")"]
  | otherwise = mconcat [fromTerm varmap a p FunctionFirst, "->", fromTerm varmap b p Empty]
fromTerm varmap p@(Pair (Atom "List" _) t _) parent flag = mconcat ["[", fromTerm varmap t p Empty, "]"]
fromTerm varmap p@(Pair (Atom "Tuple" _) (Pair a b _) _) parent flag = mconcat ["(", fromTerm varmap a p TupleFirst, ",", fromTerm varmap b p TupleBody, ")"]
fromTerm varmap p@(Pair x y _) parent flag
  | isTypeCon parent = mconcat ["(", fromTerm varmap x parent Empty, " ", fromTerm varmap y parent Empty, ")"]
  | otherwise = mconcat [fromTerm varmap x p Empty, " ", fromTerm varmap y p Empty]

data Flag = TupleRoot | TupleFirst | TupleBody | FunctionFirst | Empty deriving (Eq)

isFunction :: Term -> Bool
isFunction (Pair (Atom "Function" _) _ _) = True
isFunction _ = False

funHead :: Term -> Term
funHead (Pair (Atom "Function" _) (Pair a b _) _) = a
funHead _ = error "Function head applied to non functional term"

funBody :: Term -> Term
funBody (Pair (Atom "Function" _) (Pair a b _) _) = b
funBody _ = error "Function body applied to non functional term"

isTuple :: Term -> Bool
isTuple (Pair (Atom "Tuple" _) _ _) = True
isTuple _ = False

isTypeCon :: Term -> Bool
isTypeCon (Pair (Atom "Function" _) _ _) = False
isTypeCon (Pair (Atom "List" _) _ _) = False
isTypeCon (Pair (Atom "Tuple" _) _ _) = False
isTypeCon Pair {} = True
isTypeCon _ = False

moreConcreteThan :: Term -> Term -> Bool
moreConcreteThan (Pair a1 a2 _) (Pair b1 b2 _) = a1 `moreConcreteThan` b1 && a2 `moreConcreteThan` b2
moreConcreteThan Pair {} _ = True
moreConcreteThan (Atom _ _) (Var _ _) = True
moreConcreteThan _ _ = False