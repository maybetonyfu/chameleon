{-# LANGUAGE DeriveGeneric #-}

module Reasoning where

import Debug.Trace
import GHC.Generics
import Kanren
import Language.Haskell.Exts.SrcLoc (SrcSpan)
import Scope
import Typing

data ChStep = ChStep
  { explanation :: String,
    order :: Order,
    stepA :: SrcSpan,
    stepB :: SrcSpan,
    stepId :: (Int, Int)
  }
  deriving (Show, Eq, Generic)

data Order = LR | RL deriving (Show, Eq, Generic)

compareConstraints :: LabeledGoal -> LabeledGoal -> [ChStep]
compareConstraints (Label n1 (term1, term1') _ reason1 loc1 _) (Label n2 (term2, term2') _ reason2 loc2 _)
  | loc1 == loc2 = []
  | loc1 `within` loc2
      && reason1 == "Annotated"
      && reason2 == "Annotated" =
    [ChStep "is in the context of" LR loc1 loc2 (n1, n2)]
  | loc2 `within` loc1
      && reason1 == "Annotated"
      && reason2 == "Annotated" =
    [ChStep "is in the context of" RL loc1 loc2 (n1, n2)]

  | loc1 `within` loc2
     && reason2 == "Applied"
    =
      -- application expression: x = y z
      case (isFunction term2, isFunction term2') of
        (True, False) -> if term1 == term2' || term1' == term2'
                            then [ChStep "is applied at" LR loc1 loc2 (n1, n2)]
                            else [ChStep "is an argument in" LR loc1 loc2 (n1, n2)]
        (False, True) ->  if term1 == term2 || term1' == term2
                            then [ChStep "is applied at" LR loc1 loc2 (n1, n2)]
                            else [ChStep "is an argument in" LR loc1 loc2 (n1, n2)]
        (_ , _) -> [ChStep "is part of" LR loc1 loc2 (n1, n2)]

  | loc2 `within` loc1
    && reason1 == "Applied"
    =

      case (isFunction term1, isFunction term1') of
          (True, False) -> if term2 == term1' || term2' == term1'
                              then [ChStep "is applied at" RL loc1 loc2 (n1, n2)]
                              else [ChStep "is an argument in" RL loc1 loc2 (n1, n2)]
          (False, True) ->  if term2 == term1 || term2' == term1
                              then [ChStep "is applied at" RL loc1 loc2 (n1, n2)]
                              else [ChStep "is an argument in" RL loc1 loc2 (n1, n2)]
          (_ , _) -> [ChStep "is part of" RL loc1 loc2 (n1, n2)]
  | loc1 `within` loc2
     && reason1 == "Matched"
     && reason2 == "Matched"
    =
      -- application expression in pattern matching:x (Y z) = u
      case (isFunction term2, isFunction term2') of
        (True, False) -> if term1 == term2' || term1' == term2'
                            then [ChStep "is applied at" LR loc1 loc2 (n1, n2)]
                            else [ChStep "is an argument in" LR loc1 loc2 (n1, n2)]
        (False, True) ->  if term1 == term2 || term1' == term2
                            then [ChStep "is applied at" LR loc1 loc2 (n1, n2)]
                            else [ChStep "is an argument in" LR loc1 loc2 (n1, n2)]
        (_ , _) -> [ChStep "is part of" LR loc1 loc2 (n1, n2)]

  | loc2 `within` loc1
     && reason1 == "Matched"
     && reason2 == "Matched"
     =
      -- application expression in pattern matching:x (Y z) = u
      case (isFunction term1, isFunction term1') of
          (True, False) -> if term2 == term1' || term2' == term1'
                              then [ChStep "is applied at" RL loc1 loc2 (n1, n2)]
                              else [ChStep "is an argument in" RL loc1 loc2 (n1, n2)]
          (False, True) ->  if term2 == term1 || term2' == term1
                              then [ChStep "is applied at" RL loc1 loc2 (n1, n2)]
                              else [ChStep "is an argument in" RL loc1 loc2 (n1, n2)]
          (_ , _) -> [ChStep "is part of" RL loc1 loc2 (n1, n2)]

  | loc2 `within` loc1 && reason1 == "Literal" = [ChStep "is defined in" RL loc1 loc2 (n1, n2)]
  | loc1 `within` loc2 && reason2 == "Literal" = [ChStep "is defined in" LR loc1 loc2 (n1, n2)]
  | reason1 == "Annotated" && reason2 == "Annotated" = []
  | reason1 == "Annotated" && reason2 /= "Annotated" = [ChStep "is annotated at" RL loc1 loc2 (n1, n2)]
  | reason1 /= "Annotated" && reason2 == "Annotated" = [ChStep "is annotated at" LR loc1 loc2 (n1, n2)]
  | term1 == term2 && not (isFresh term1) && not (isFresh term2) = [ChStep "is identical to" LR loc1 loc2 (n1, n2)]
  | term1 == term2' && not (isFresh term1) && not (isFresh term2') = [ChStep "is identical to" LR loc1 loc2 (n1, n2)]
  | term1' == term2 && not (isFresh term1') && not (isFresh term2) = [ChStep "is identical to" LR loc1 loc2 (n1, n2)]
  | term1' == term2' && not (isFresh term1') && not (isFresh term2') = [ChStep "is identical to" LR loc1 loc2 (n1, n2)]
  | reason1 == "Defined" && reason2 == "Matched" = [ChStep "takes argument" LR loc1 loc2 (n1, n2)]
  | reason1 == "Matched" && reason2 == "Defined" = [ChStep "takes argument" RL loc1 loc2 (n1, n2)]
  |
      -- trace
      -- ( "\nreason1: "
      --     ++ reason1
      --     ++ " ("
      --     ++ show term1
      --     ++ " === "
      --     ++ show term1'
      --     ++ ")\nreason2: "
      --     ++ reason2
      --     ++ " ("
      --     ++ show term2
      --     ++ " === "
      --     ++ show term2'
      --     ++ ")\n"
      -- ) $
    reason1 /= "Defined" && reason2 == "Defined" = [ChStep "is defined as" RL loc1 loc2 (n1, n2)]
  |
      -- trace
      -- ( "\nreason1: "
      --     ++ reason1
      --     ++ " ("
      --     ++ show term1
      --     ++ " === "
      --     ++ show term1'
      --     ++ ")\nreason2: "
      --     ++ reason2
      --     ++ " ("
      --     ++ show term2
      --     ++ " === "
      --     ++ show term2'
      --     ++ ")\n"
      -- ) $
    reason1 == "Defined" && reason2 /= "Defined" = [ChStep "is defined as" LR loc1 loc2 (n1, n2)]
  |

    reason1 /= "Defined" && reason2 == "Defined" = [ChStep "is defined as" RL loc1 loc2 (n1, n2)]
  | reason1 == "Applied" && reason2 == "Applied" && loc1 <= loc2 = [ChStep "is applied at" LR loc1 loc2 (n1, n2)]
  | reason1 == "Applied" && reason2 == "Applied" && loc1 > loc2 = [ChStep "is applied at" RL loc1 loc2 (n1, n2)]
  | reason1 == "Applied" && reason2 /= "Applied" = [ChStep "is applied at" RL loc1 loc2 (n1, n2)]
  | reason1 /= "Applied" && reason2 == "Applied" = [ChStep "is applied at" LR loc1 loc2 (n1, n2)]
  |  reason2 == "Instanciated"
    || reason1 == "Instanciated" = [ChStep "has same type as" LR loc1 loc2 (n1, n2)]
  | otherwise =
      -- trace
      -- ( "\nreason1: "
      --     ++ reason1
      --     ++ " ("
      --     ++ show term1
      --     ++ " === "
      --     ++ show term1'
      --     ++ ")\nreason2: "
      --     ++ reason2
      --     ++ " ("
      --     ++ show term2
      --     ++ " === "
      --     ++ show term2'
      --     ++ ")\n"
      -- ) $
    [ChStep "has same type as" LR loc1 loc2 (n1, n2)]
