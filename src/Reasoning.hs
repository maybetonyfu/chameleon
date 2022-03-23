{-# LANGUAGE DeriveGeneric #-}

module Reasoning where

import GHC.Generics
import Kanren
import Language.Haskell.Exts.SrcLoc (SrcSpan)
import Scope
import Typing

data ChStep = ChStep {
  explanation:: String,
  order::Order,
  stepA :: SrcSpan,
  stepB:: SrcSpan,
  stepId :: (Int, Int)
  }  deriving (Show, Eq, Generic)
data Order = LR | RL deriving (Show, Eq, Generic)

compareConstraints :: LabeledGoal -> LabeledGoal -> [ChStep]
compareConstraints (Label n1 (term1, term1') _ reason1 loc1 _) (Label n2 (term2, term2') _ reason2 loc2 _)
  | loc1 == loc2 = []
  | loc1 `within` loc2 = [ChStep "is part of" LR loc1 loc2 (n1, n2)]
  | loc2 `within` loc1 = [ChStep "is part of" RL loc1 loc2 (n1, n2)]
  | reason1 == "Annotated" && reason2 == "Annotated" = []
  | reason1 == "Annotated" && reason2 /= "Annotated" = [ChStep "is annotated at" RL loc1 loc2  (n1, n2)]
  | reason1 /= "Annotated" && reason2 == "Annotated" = [ChStep "is annotated at" LR loc1 loc2  (n1, n2)]
  | term1 == term2 && not (isFresh term1) && not (isFresh term2) = [ChStep "is identical to" LR loc1 loc2  (n1, n2)]
  | term1 == term2' && not (isFresh term1) && not (isFresh term2') = [ChStep "is identical to" LR loc1 loc2  (n1, n2)]
  | term1' == term2 && not (isFresh term1') && not (isFresh term2) = [ChStep "is identical to" LR loc1 loc2  (n1, n2)]
  | term1' == term2' && not (isFresh term1') && not (isFresh term2') = [ChStep "is identical to" LR loc1 loc2  (n1, n2)]
  | reason1 == "Defined" && reason2 == "Match" = [ChStep "is argument of" RL loc1 loc2  (n1, n2)]
  | reason1 == "Match" && reason2 == "Defined" = [ChStep "is argument of" RL loc1 loc2  (n1, n2)]
  | reason1 /= "Defined" && reason2 == "Defined" = [ChStep "is defined as" RL loc1 loc2  (n1, n2)]
  | reason1 == "Defined" && reason2 /= "Defined" = [ChStep "is defined as" LR loc1 loc2  (n1, n2)]
  | reason1 /= "Defined" && reason2 == "Defined" = [ChStep "is defined as" RL loc1 loc2  (n1, n2)]
  | reason1 == "Applied" && reason2 == "Applied" && loc1 <= loc2 = [ChStep "is applied at" LR loc1 loc2  (n1, n2)]
  | reason1 == "Applied" && reason2 == "Applied" && loc1 > loc2 = [ChStep "is applied at" RL loc1 loc2  (n1, n2)]
  | reason1 == "Applied" && reason2 /= "Applied" = [ChStep "is applied at" RL loc1 loc2  (n1, n2)]
  | reason1 /= "Applied" && reason2 == "Applied" = [ChStep "is applied at" LR loc1 loc2  (n1, n2)]
  | otherwise = [ChStep "is related to" LR loc1 loc2 (n1, n2)]
