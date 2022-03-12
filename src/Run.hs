{-# LANGUAGE DeriveGeneric #-}

module Run where

import Agda.Utils.Graph.AdjacencyMap.Unidirectional hiding (lookup, transpose)
import Builtin
import Constraint hiding (main, processFile)
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
import Data.ByteString (takeWhileEnd)

data ChContext = ChContext String String String [(Int, String)] deriving (Show, Generic)

data ChResult
  = ChTypeError
      { contextTable :: [ChContext],
        steps :: [ChStep]
      }
  | ChLoadError
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

                      concreteTypes = map (\g ->
                          let mss = maximalSatisfiableSubset ks (longestChain \\ [g]) (goals' \\ [g])
                          in typings ks names mss
                        ) longestChain

                      simplifyTypes = map (\g -> typings ks names (longestChain \\ [g])) longestChain
                      altTable =
                          -- trace ("\nSimplifed: " ++ unlines (map (show . length . nub) simplifyTypes)) $
                            zip3 names (transpose concreteTypes)  (transpose simplifyTypes)
                      releventSimplied = filter (\(_, concret, simplified) -> length (nub simplified) > 1) altTable
                      releventConcrete = filter (\(_, concret, simplified) -> length (nub concret) > 1) altTable
                      relevent = if null releventSimplied then releventConcrete else releventSimplied
                      contextTable =
                        trace ("Longest Chain: " ++ unlines (map show longestChain)) $
                        map
                          ( \(name, concrete, simplified) ->
                              trace ("\n" ++ name ++ ":" ++ unlines (map termToType concrete)) $
                              let leftmost = head concrete
                                  rightmost = last (dropWhileEnd (== leftmost) concrete)
                                  sides =
                                    zipWith
                                      ( \t (Label n _ _ _ _) ->
                                          if t == leftmost
                                            then (n, "L")
                                            else
                                              if t == rightmost
                                                then (n, "R")
                                                else (n, "M")
                                      )
                                      concrete
                                      longestChain
                               in ChContext (showProperName name) (termToType leftmost) (termToType rightmost) sides
                          )
                          relevent
                   in ChTypeError contextTable reasonings
                else ChSuccess
        ParseFailed srcLoc message ->
          error $
            unlines
              [ prettyPrint srcLoc,
                message
              ]

maximalSatisfiableSubset :: KanrenState -> [LabeledGoal] -> [LabeledGoal] -> [LabeledGoal]
maximalSatisfiableSubset ks mus [] = mus
maximalSatisfiableSubset ks mus (g:gs) =
  let newset = g:mus
      sat = not .null $ runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum newset ++ sortOn goalNum newset)))
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

getMus :: KanrenState -> [LabeledGoal] -> [LabeledGoal]
getMus ks = go []
  where
    go accumulateOuter rest =
      let outerSat = not . null $ runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum accumulateOuter ++ sortOn goalNum accumulateOuter)))
          inner accumulateInner [] =
            let innerSat = not . null $ runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum accumulateInner ++ sortOn goalNum accumulateInner)))
             in if innerSat
                  then error "Set is satisfiable"
                  else accumulateInner
          inner accumulateInner (g : gs) =
            let innerSat = not . null $ runGoalNWithState ks 1 (conjN (map unlabel (sortOn goalNum accumulateInner ++ sortOn goalNum accumulateInner)))
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
graphView (g : gs) = map (\n -> Edge (goalNum g) n n) neighbors ++ map (\n -> Edge n (goalNum g) n) neighbors ++ graphView gs
  where
    neighbors = map goalNum . filter (\g' -> g `adjs` g') $ gs

adjs :: LabeledGoal -> LabeledGoal -> Bool
adjs (Label _ (p1, p2) _ _ _) (Label _ (p1', p2') _ _ _) =
  let source = allVars p1 ++ allVars p2
      target = allVars p1' ++ allVars p2'
   in any (`elem` source) target

main :: IO ()
main = do
  args <- getArgs
  let filename = head args
  content <- readFile filename
  let res = processFile content
  putStrLn "\nContexts: "
  mapM_ print (contextTable res)
  putStrLn "\nSteps: "
  mapM_ print (steps res)




I see what is going on. Because of the use ==< operator, the type restoration
process can never fully restore the original function.
