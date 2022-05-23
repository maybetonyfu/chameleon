module Constraint where

import qualified Data.Map as Map
import Data.Maybe
import Debug.Trace
import Kanren

walkUpdateTags :: Term -> Subst -> Subst
walkUpdateTags Atom {} subs = subs
walkUpdateTags Unit subs = subs
walkUpdateTags (Pair x y _) subs = walkUpdateTags y (walkUpdateTags x subs)
walkUpdateTags (Var x tags) subs =
  case Map.lookup x subs of
    Nothing -> subs
    Just t -> trace ("\nFor " ++ x ++ " -> " ++ show t ++ " with tags " ++ show tags) $
      walkUpdateTags t (Map.insert x (appendTags tags t) subs)

walkSyncTermTags :: Subst -> Subst
walkSyncTermTags subs =
  let addTerm (Var v tags) mapping = Map.insertWith (++) (var v) tags mapping
      addTerm (Atom a tags) mapping = Map.insertWith (++) (atom a) tags mapping
      addTerm (Pair x y tags) mapping = Map.insertWith (++) (pair (setTags [] x) (setTags [] y)) tags (addTerm y . addTerm x $ mapping)
      addTerm _ mapping = mapping
      lookUpAndSetTag (Var v _) mapping = Var v (fromMaybe [] (Map.lookup (var v) mapping))
      lookUpAndSetTag (Atom a _) mapping = Atom a (fromMaybe [] (Map.lookup (atom a) mapping))
      lookUpAndSetTag (Pair x y _) mapping =
        Pair
          (lookUpAndSetTag x mapping)
          (lookUpAndSetTag y mapping)
          (fromMaybe [] (Map.lookup (pair (setTags [] x) (setTags [] y)) mapping))
      lookUpAndSetTag Unit mapping = Unit
      tagmap = foldr addTerm Map.empty (Map.elems subs ++ Map.elems subs)
      reinsertTags (key, term) sub = Map.insert key (lookUpAndSetTag term tagmap) sub
    in trace ("\nTagMap:\n" ++ unlines (map show (Map.toList tagmap)) ++ "\n") $
        foldr reinsertTags subs (Map.toList subs)

deriveRequirement :: Subst -> Subst
deriveRequirement subs =
  let allKeys = Map.keys subs
      unifiedTags = trace ("\nAll keys:\n" ++ show allKeys) foldr (walkUpdateTags . var) (walkSyncTermTags subs) allKeys
   in trace ("\nUnified Tags:\n" ++ unlines (map show (Map.toList unifiedTags)) ++ "\n") $ walkSyncTermTags unifiedTags