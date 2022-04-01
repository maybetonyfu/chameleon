module JsonInstance where

import Data.Aeson
import Kanren
import Language.Haskell.Exts.SrcLoc
import Reasoning
import Run

instance ToJSON TypeForm

instance ToJSON SrcLoc

instance ToJSON Order

instance ToJSON ChStep

instance ToJSON SrcSpan

instance ToJSON ChContext

instance ToJSON ChResult

instance ToJSON Affinity
