module Task where

-- import Kanren
-- import Kanren (succeeds)

-- class Eq a => X a where
--   x :: a -> b -> Int

-- instance Eq a => X (Maybe a) where
--   x Nothing b = 3
--   x (Just a) b = 4

-- instance X Int where
--   x n b = n

-- data W = W

-- data V = V

-- instance Eq W where
--   (==) = undefined

-- instance Eq V where
--   (==) = undefined

-- instance X W where
--     x = undefined

-- u = x W True

-- -- This looks ok
-- constraint :: [Char] -> Term -> Goal
-- constraint "Eq" y =
--   callFresh
--     ( \z ->
--         conjN
--           [ z ==< y,
--             conda
--               [ [z === atom "W", succeeds],
--                 [z === atom "V", succeeds],
--                 [succeeds, fails]
--               ]
--           ]
--     )
-- constraint _ _ = fails

--     y <== x, conda [ (y === W, succeeds), (y === V, succeeds), succeeds, fail]
-- ]
--
-- x -> (fresh y -> condu [x === y, Maybe y, Eq y])

-- conjN (
--  (x === (funOf tv a b Int)
--  (tv === a)
--  (conda [
--      (fresh y -> conjN [tv === y, y === Maybe a, ])
--      (fresh y -> conjN [tv === y, y === Int])
-- ])
-- x 3 Bool
-- x -> conjN  [funOf (var a) (var a) (atom Int)
-- fresh (tv -> x ==< funOf tv (var a) (var b) (atom Int))


c :: (Eq a, Ord b) => a -> b
c = undefined