module Task where

data Maybe a = Just a | Nothing

x :: Int ->  Maybe Int
x _ = Just 3

y :: Maybe Int
y = Just (x 4)