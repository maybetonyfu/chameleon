{-# LANGUAGE DeriveGeneric #-}

module Run where

import Agda.Utils.Graph.AdjacencyMap.Unidirectional hiding (lookup, transpose)
import Builtin
import Constraint hiding (main, processFile)
import Control.Lens hiding (use)
import Control.Monad.Trans.State.Lazy
import Data.Aeson
import Data.List
import qualified Data.Map as Map
import Data.Maybe
import Debug.Trace
import FieldOrdering hiding (main, processFile)
import GHC.Generics
import Instance hiding (main, processFile)
import Kanren hiding (fromList, toList)
import Language.Haskell.Exts.Parser
import Language.Haskell.Exts.Pretty
import Language.Haskell.Exts.SrcLoc hiding (loc)
import Reasoning
import Scope hiding (main, processFile)
import System.Environment
import Typing hiding (main, processFile)

data Affinity = L | R | M deriving (Show, Generic, Eq)

data ChContext = ChContext
  { contextExp :: String,
    contextType1 :: TypeForm,
    contextType1Simple :: TypeForm,
    contextType1String :: String,
    contextType1SimpleString :: String,
    contextType2 :: TypeForm,
    contextType2Simple :: TypeForm,
    contextType2String :: String,
    contextType2SimpleString :: String,
    contextSteps :: [((Int, Int), Affinity, Bool)],
    contextGlobals :: [[String]],
    contextDefinedIn :: SrcSpan
  }
  deriving (Show, Generic)

data ChResult
  = ChTypeError
      { contextTable :: [ChContext],
        steps :: [ChStep]
      }
  | ChLoadError
      { missing :: [(String, SrcSpan)]
      }
  | ChParseError
      { message :: String,
        prettyLoc :: String,
        loc :: SrcLoc
      }
  | ChSuccess
  deriving (Show, Generic)

processFile :: String -> ChResult
processFile text =
  let (ks, (n, m, builtInScopes, builtInFO)) = processBuiltIn
      pResult = parseModuleWithMode parseMode text
      parseMode = defaultParseMode {parseFilename = "Main.hs"}
   in case pResult of
        ParseOk hModule ->
          let ((_, scopes), _) = runState (getScopes Global m hModule) (m + 1)
              mergedScope = builtInScopes ++ scopes
              filedOrderings = builtInFO ++ getFieldOrdering hModule
              names = allNames scopes
              (goals, solvestate) = runState (matchTerm Unit hModule) (n, mergedScope, filedOrderings, [])
              goals' = zipWith (\g n -> g {goalNum = n}) goals [0 ..]
              res = runGoalNWithState ks 1 (conjN (map unlabel (goals' ++ goals' ++ goals')))
           in if not . null . view _4 $ solvestate
                then ChLoadError (nub . view _4 $ solvestate)
                else
                  if null res
                    then
                      let mus = getMus ks goals'
                          instanciationTable = concatMap instanciation mus
                          names' = useFunctionNewNames instanciationTable names
                          graphG = fromEdges . graphView $ mus
                          reachables = concatMap (map snd . Map.toList . reachableFrom graphG) [0 .. length goals']
                          longestIndexPairs = snd $ maximumBy (\(n, _) (m, _) -> compare n m) reachables -- [(a,b), (b,c), (c,d)]
                          longestIndexChain = (source . head $ longestIndexPairs) : map target longestIndexPairs -- [a,b,c,d]
                          longestChain' = map (\n -> fromJust $ find ((== n) . goalNum) goals') longestIndexChain
                          -- leftOuts = mus \\ longestChain'
                          -- reinsert :: [LabeledGoal] -> [LabeledGoal] -> [LabeledGoal]
                          -- reinsert oldchain [] = oldchain
                          -- reinsert oldchain gs
                          --   | Just g <- find (head oldchain `adjs`) gs = reinsert (g : oldchain) (gs \\ [g])
                          --   | Just g <- find (last oldchain `adjs`) gs = reinsert (oldchain ++ [g]) (gs \\ [g])
                          --   | otherwise = reinsert oldchain gs
                          -- longestChain = reinsert longestChain' leftOuts
                          longestChain = longestChain'
                          reasonings =
                            -- trace ("\n Alll Constraints:\n" ++ unlines (map show mus)) $
                            --   trace ("\n Constraints:\n" ++ unlines (map show longestChain)) $
                            concatMap (uncurry compareConstraints) (zigzag longestChain)
                          concreteTypes =
                            -- trace ("\nOriginal Names:\n" ++ show names ++ "\nNew Names: \n" ++ show names') $
                            map
                              ( \g ->
                                  let mss = maximalSatisfiableSubset ks (filter ((/= goalNum g) . goalNum) longestChain) (filter ((/= goalNum g) . goalNum) goals')
                                      originalNames =
                                        -- trace
                                        --   ( "\n\nRemoved: " ++ show g ++ "\n\n"
                                        --       -- ++ "\n\nlongestChain : "
                                        --       -- ++ unlines (map show (filter ((/= goalNum g) . goalNum) longestChain))
                                        --       ++ "\n\nmss : "
                                        --       ++ unlines (map show mss)
                                        --       ++ "\n\nnames : "
                                        --       ++ unlines names'
                                        --       ++ "\n\n"
                                        --   ) $
                                        typings ks names mss
                                      newNames = typings ks names' mss
                                      chooseConcrete a b old new =
                                        let result = if a `moreConcreteThan` b then a else b
                                         in result
                                   in zipWith4 chooseConcrete originalNames newNames names names'
                              )
                              longestChain
                          simplifyTypes = map (\g -> typings ks names (filter ((/= goalNum g) . goalNum) longestChain)) longestChain
                          altTable =
                            zip3
                              names
                              (transpose concreteTypes)
                              (transpose simplifyTypes)
                          relevantSimplied = filter ((> 1) . length . nub . view _3) altTable
                          relevantConcrete = filter ((> 1) . length . nub . filter (not . isVar) . view _2) altTable
                          relevent =
                            if null relevantSimplied
                              then relevantConcrete
                              else filter ((> 1) . length . nub . view _2) relevantSimplied
                          contextTable =
                            -- trace ("\nSimplified: \n" ++ unlines (map show relevantConcrete) ++ "\n") $
                            --   trace ("\nMus: \n" ++ unlines (map show mus)) $
                            --     trace ("\nLength of Longest Chain: " ++ show (length longestChain)) $
                            --       trace ("\nLength of Mus: " ++ show (length mus)) $
                            map
                              ( \(name, concrete, simplified) ->
                                  -- trace ("\nSimlifed:" ++ name ++ ":\n" ++ unlines (map toSig simplified)) $
                                  --   trace ("\nConcrete:" ++ name ++ ":\n" ++ unlines (map toSig concrete)) $
                                  let (leftmost, rightmost) = polarEnds concrete
                                      (leftmostSimp, rightmostSimp) = polarEnds simplified
                                      -- globals in the scope
                                      scope = findScopeByName mergedScope name
                                      _used = maybe [] use scope
                                      usedBuiltInScopes =
                                        filter
                                          ( \scp ->
                                              scopeType scp /= TypeScope
                                                && any (`elem` _used) (generate scp)
                                          )
                                          builtInScopes
                                      usedBuilltInNames = concatMap (\scp -> map (++ ('.' : show (scopeId scp))) (generate scp)) usedBuiltInScopes
                                      usedBuilltInNormalNames = map showProperName usedBuilltInNames
                                      usedBuiltInTypes = typings ks usedBuilltInNames []
                                      usedBuiltInTypeSigs = map toSig usedBuiltInTypes
                                      nameTypePairs = transpose [usedBuilltInNormalNames, usedBuiltInTypeSigs]
                                      --
                                      sides =
                                        zipWith
                                          ( \(t1, t2) (g1, g2) ->
                                              let n1 = goalNum g1
                                                  n2 = goalNum g2
                                               in if t1 == leftmost && t2 == leftmost
                                                    then ((n1, n2), L, False)
                                                    else
                                                      if t1 == rightmost && t2 == rightmost
                                                        then ((n1, n2), R, False)
                                                        else ((n1, n2), M, False)
                                          )
                                          (zigzag concrete)
                                          (zigzag longestChain)
                                      normalizedSides = normalize sides
                                   in ChContext
                                        (showProperName name)
                                        (typeForm leftmost)
                                        (typeForm leftmostSimp)
                                        (toSig leftmost)
                                        (toSig leftmostSimp)
                                        (typeForm rightmost)
                                        (typeForm rightmostSimp)
                                        (toSig rightmost)
                                        (toSig rightmostSimp)
                                        normalizedSides
                                        nameTypePairs
                                        (toSrcSpan (maybe Global definedIn scope))
                              )
                              relevent
                          contextTableSorted = sortOn (fromJust . findIndex ((== M) . view _2) . contextSteps) contextTable
                          contextTableactiveness = filter (any (view _3) . contextSteps) $ calculateActiveness contextTableSorted
                          contextFromReasonings =
                            map (\ctx -> ctx {contextSteps = filter ((`elem` map stepId reasonings) . view _1) (contextSteps ctx)}) contextTableactiveness
                       in ChTypeError contextFromReasonings reasonings
                    else ChSuccess
        ParseFailed srcLoc message -> ChParseError message (prettyPrint srcLoc) srcLoc

polarEnds :: [Term] -> (Term, Term)
polarEnds types

  |
    --  trace ("\n Branch 0: " ++ show types) $ 
     length (nub types) == 1 = (head (nub types), last (nub types))
  |
    --  trace ("\n Branch 1: " ++ show types) $ 
     head types == last types = polarEnds (init . tail $ types)
  |
    --  trace ("\n Branch 2: " ++ show types) $ 
      length (nub types) == 2 = (head (nub types), last (nub types))
  |
    --  trace ("\n Branch 3: " ++ show types) $ 
      isVar (head types) = polarEnds (tail types)
  |
    --  trace ("\n Branch 4: " ++ show types) $ 
      isVar (last types) = polarEnds (init types)
  |
    --  trace ("\n Branch 5: " ++ show types) $ 
      otherwise = (head types, last types)

normalize :: [(a, Affinity, b)] -> [(a, Affinity, b)]
normalize sides
  | Just x <- elemIndex (M, R) (zigzag (map (view _2) sides)),
    (any ((/= R) . view _2 . view _1) . filter ((> x) . view _2)) $ zip sides [0 ..] =
    let mIndex = x
     in normalize $ zipWith (\side n -> if n > mIndex then set _2 R side else side) sides [0 ..]
  | Just x <- elemIndex (L, M) (zigzag (map (view _2) sides)),
    (any ((/= L) . view _2 . view _1) . filter ((< x) . view _2)) $ zip sides [0 ..] =
    let mIndex = x + 1
     in normalize $ zipWith (\side n -> if n < mIndex then set _2 L side else side) sides [0 ..]
  | otherwise = sides

-- R R M M R R R R R R R R
-- L L L L L M R R R R R R
-- L L L L L L L L M R R R
removeUniversal :: [Term] -> [Term]
removeUniversal = id

calculateActiveness :: [ChContext] -> [ChContext]
-- calculateActiveness ((ChContext a b c sides):(ChContext a' b' c' sides'):contexts) =
--                      zipWith (\(_, s1, _) (_, s2, _) ->
--                         ) sides sides'
calculateActiveness contexts =
  let affiliations = map (map (view _2) . contextSteps) contexts
      affiliationsT = transpose affiliations
      mapActiveness :: [Affinity] -> [Bool]
      mapActiveness affs
        | Just n <- elemIndex M affs = zipWith (\aff m -> m == n) affs [0 ..]
        | Just n <- elemIndex L affs = zipWith (\aff m -> m == n) affs [0 ..]
        | otherwise = replicate (length affs - 1) False ++ [True]
      activenessT = map mapActiveness affiliationsT
      activeness = transpose activenessT
   in zipWith
        ( \c n ->
            c {contextSteps = zipWith (flip (set _3)) (contextSteps c) (activeness !! n)}
        )
        contexts
        [0 ..]

-- # # #
-- L M M R R R
-- L L M L M R
--       # # #

maximalSatisfiableSubset :: KanrenState -> [LabeledGoal] -> [LabeledGoal] -> [LabeledGoal]
maximalSatisfiableSubset ks mus [] = mus
maximalSatisfiableSubset ks mus (g : gs) =
  let newset = g : mus
      sat = not . null $ runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum newset ++ sortOn goalNum newset)))
   in if sat
        then maximalSatisfiableSubset ks newset gs
        else maximalSatisfiableSubset ks mus gs

typings :: KanrenState -> [String] -> [LabeledGoal] -> [Term]
typings ks names goals =
  -- trace ("\nGoals: " ++ unlines (map show goals) ++ "\n" ++ unlines names ++ "\n") $
  let res = run1WithState ks names (conjN (map unlabel (sortOn goalNum goals ++ sortOn goalNum goals)))
   in if null res
        then error "typing should only accept satisfiable constraints"
        else head res

showTyping :: (String, Term) -> String
showTyping (name, term) =
  showProperName name ++ " : " ++ toSig term

showProperName :: String -> String
showProperName = reverse . drop 1 . dropWhile (/= '.') . reverse

useFunctionNewNames :: [(Term, Term)] -> [String] -> [String]
useFunctionNewNames instanciateTable =
  map (go instanciateTable)
  where
    go :: [(Term, Term)] -> String -> String
    go instTable name =
      maybe name varToString (lookup (var name) instTable)

getMus :: KanrenState -> [LabeledGoal] -> [LabeledGoal]
getMus ks = go []
  where
    go accumulateOuter rest =
      let outerSat =
            not . null $
              runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum accumulateOuter ++ sortOn goalNum accumulateOuter)))
          inner accumulateInner [] =
            let innerSat =
                  not . null $
                    runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum accumulateInner ++ sortOn goalNum accumulateInner)))
             in if innerSat
                  then error "Set is satisfiable"
                  else accumulateInner
          inner accumulateInner (g : gs) =
            let innerSat =
                  not . null $
                    runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum accumulateInner ++ sortOn goalNum accumulateInner)))
             in if innerSat
                  then inner (g : accumulateInner) gs
                  else accumulateInner
       in if outerSat
            then
              let innnerResult = inner accumulateOuter rest
               in go (head innnerResult : accumulateOuter) (tail innnerResult)
            else accumulateOuter

showMus :: [LabeledGoal] -> IO ()
showMus [] = return ()
showMus (l : gs) = do
  print l
  showMus gs

processBuiltIn :: (KanrenState, (Int, Int, [Scope], [FieldOrdering]))
processBuiltIn =
  let pResult = parseModuleWithMode parseMode builtin
      parseMode = defaultParseMode {parseFilename = "Prelude"}
   in case pResult of
        ParseOk hModule ->
          let ((_, scopes), m) = runState (getScopes Global 0 hModule) 1
              filedOrderings = getFieldOrdering hModule
              names = allNames scopes
              (goals, (n, bd, fo, le)) = runState (matchTerm Unit hModule) (0, scopes, filedOrderings, [])
              res = runGoalN 1 (conjN (map unlabel (goals ++ goals)))
           in if null res
                then error "Solving prelude failed"
                else (head res, (n, m, bd, fo))
        ParseFailed srcLoc message ->
          error $
            unlines
              [ prettyPrint srcLoc,
                message
              ]

graphView :: [LabeledGoal] -> [Edge Int Int]
graphView [] = []
graphView (g : gs) =
  map (\n -> Edge (goalNum g) n n) neighbors ++ map (\n -> Edge n (goalNum g) n) neighbors ++ graphView gs
  where
    neighbors = map goalNum . filter (\g' -> g `adjs` g') $ gs

adjs :: LabeledGoal -> LabeledGoal -> Bool
adjs (Label _ (p1, p2) _ _ _ _) (Label _ (p1', p2') _ _ _ _) =
  let source = allVars p1 ++ allVars p2
      target = allVars p1' ++ allVars p2'
   in any (`elem` source) target

zigzag :: [a] -> [(a, a)]
zigzag a = zip a (tail a)

main :: IO ()
main = do
  args <- getArgs
  let filename = head args
  content <- readFile filename
  let res = processFile content
  print res

-- putStrLn "\nContexts: "
-- mapM_
--   ( \(ChContext name typel typer steps) -> do
--       putStrLn name
--       putStrLn typel
--       putStrLn typer
--       putStrLn . unwords . map (\(a, b, c) -> show b) $ steps
--       putStrLn . unwords . map (\(a, b, c) -> show c) $ steps
--   )
--   (contextTable res)
-- putStrLn "\nSteps: "
-- mapM_ print (steps res)
