{-# LANGUAGE DeriveGeneric #-}

module Run where

import Agda.Utils.Graph.AdjacencyMap.Unidirectional hiding (lookup, transpose)
import Builtin
import Constraint hiding (main, processFile)
import Control.Lens
import Control.Monad.Trans.State.Lazy
import Data.Aeson
import qualified Data.ByteString.Lazy.Char8 as BS
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

data ChContext = ChContext String String String [((Int, Int), Affinity, Bool)] deriving (Show, Generic)

data ChResult
  = ChTypeError
      { contextTable :: [ChContext],
        steps :: [ChStep]
      }
  | ChLoadErrornn
      {
      }
  | ChParseError
      {
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
              mergedBindings = builtInScopes ++ scopes
              filedOrderings = builtInFO ++ getFieldOrdering hModule
              names = allNames scopes
              goals = evalState (matchTerm Unit hModule) (n, mergedBindings, filedOrderings)
              goals' = zipWith (\g n -> g {goalNum = n}) goals [0 ..]
              res = runGoalNWithState ks 1 (conjN (map unlabel (goals' ++ goals' ++ goals')))
           in if null res
                then
                  let mus = getMus ks goals'
                      instanciationTable = concatMap instanciation mus
                      names' = trace ("\nInsta Table:\n" ++ show instanciationTable) useFunctionNewNames instanciationTable names
                      graphG = fromEdges . graphView $ mus
                      reachables = concatMap (map snd . Map.toList . reachableFrom graphG) [0 .. length goals']
                      longestIndexPairs = snd $ maximumBy (\(n, _) (m, _) -> compare n m) reachables -- [(a,b), (b,c), (c,d)]
                      longestIndexChain = (source . head $ longestIndexPairs) : map target longestIndexPairs -- [a,b,c,d]
                      longestChain = map (\n -> fromJust $ find ((== n) . goalNum) goals') longestIndexChain
                      reasonings =
                        concatMap
                          ( \(Edge a b _) ->
                              let goalA = fromJust $ find ((== a) . goalNum) goals'
                                  goalB = fromJust $ find ((== b) . goalNum) goals'
                               in compareConstraints goalA goalB
                          )
                          longestIndexPairs
                      concreteTypes =
                        trace
                          ("\nOriginal Names:\n" ++ show names ++ "\nNewNames: \n" ++ show names')
                          map
                          ( \g ->
                              let mss = maximalSatisfiableSubset ks (longestChain \\ [g]) (goals' \\ [g])
                               in typings ks names' mss
                          )
                          longestChain

                      simplifyTypes = map (\g -> typings ks names (longestChain \\ [g])) longestChain
                      altTable =
                        zip3 names (transpose concreteTypes) (transpose simplifyTypes)
                      releventSimplied = filter (\(_, concret, simplified) -> length (nub simplified) > 1) altTable
                      releventConcrete = filter (\(_, concret, simplified) -> length (nub concret) > 1) altTable
                      relevent =
                        if null releventSimplied
                          then releventConcrete
                          else filter (\(_, concrets, _) -> length (nub concrets) > 1) releventSimplied
                      contextTable =
                        --trace ("Longest Chain: " ++ unlines (map show longestChain)) $
                        map
                          ( \(name, concrete, simplified) ->
                              trace ("\n" ++ name ++ ":\n" ++ unlines (map termToType simplified)) $
                                trace ("\n" ++ name ++ ":\n" ++ unlines (map show concrete)) $
                                  let (leftmost, rightmost) = polarEnds concrete
                                      sides =
                                        zipWith
                                          ( \(t1, t2) (Edge n1 n2 _) ->
                                              if t1 == leftmost && t2 == leftmost
                                                then ((n1, n2), L, False)
                                                else
                                                  if t1 == rightmost && t2 == rightmost
                                                    then ((n1, n2), R, False)
                                                    else ((n1, n2), M, False)
                                          )
                                          (zigzag concrete)
                                          longestIndexPairs
                                      normalizedSides = normalize sides
                                   in ChContext (showProperName name) (termToType leftmost) (termToType rightmost) normalizedSides
                          )
                          relevent
                      contextTableSorted = sortOn (\(ChContext _ _ _ sides) -> fromJust $ findIndex ((== M) . view _2) sides) contextTable
                   in ChTypeError contextTableSorted reasonings
                else ChSuccess
        ParseFailed srcLoc message ->
          error $
            unlines
              [ prettyPrint srcLoc,
                message
              ]

polarEnds :: [Term] -> (Term, Term)
polarEnds types
  | head types == last types = polarEnds (init . tail $ types)
  | length (nub types) == 2 = (head (nub types), last (nub types))
  | isVar (head types) = polarEnds (tail types)
  | isVar (last types) = polarEnds (init types)
  | otherwise = (head types, last types)

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



calculateActiveness :: [ChContext] -> [ChContext]
calculateActiveness contexts =
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
  let res = run1WithState ks names (conjN (map unlabel (sortOn goalNum goals ++ sortOn goalNum goals)))
   in if null res
        then error "typing should only accept satisfiable constraints"
        else head res

showTyping :: (String, Term) -> String
showTyping (name, term) =
  showProperName name ++ " : " ++ termToType term

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
              (goals, (n, bd, fo)) = runState (matchTerm Unit hModule) (0, scopes, filedOrderings)
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
  putStrLn "\nContexts: "
  mapM_
    ( \(ChContext name typel typer steps) -> do
        putStrLn name
        putStrLn typel
        putStrLn typer
        putStrLn . unwords . map (\(a, b, c) -> show b) $ steps
        putStrLn . unwords . map (\(a, b, c) -> show c) $ steps
    )
    (contextTable res)
  putStrLn "\nSteps: "
  mapM_ print (steps res)
