{-# LANGUAGE TemplateHaskell #-}

module Graph where

import qualified Data.Set as Set
import Data.Maybe
import Control.Lens

data Graph a = Graph {
    _nodes :: Set.Set a,
    _edges :: Set.Set (a, a)
} deriving Show
makeLenses ''Graph

emptyGraph :: Graph a
emptyGraph = Graph {
    _nodes = Set.empty,
    _edges = Set.empty
}

addNode :: Ord a => a -> Graph a -> Graph a
addNode a = over nodes (Set.insert a)

addEdge :: Ord a => a -> a -> Graph a -> Graph a
addEdge a1 a2 graph = over edges (Set.insert (min a1 a2, max a1 a2)) (addNode a2 (addNode a1 graph))

reachable :: Ord a => a -> Graph a -> [a]
reachable a graph = concat . Set.toList  . Set.insert [a] . Set.map (\(x,y) -> if x == a then [y] else [x | y == a]) $ view edges graph