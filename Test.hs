module Task where


x :: Int ->  Maybe Int
x _ = Just 3

y :: Maybe Int
y = Just (x 4)