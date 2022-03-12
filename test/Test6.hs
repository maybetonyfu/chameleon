last' :: [a] -> a
last' [x] = x
last' (x:xs) = xs

take' :: Int -> [Int] -> [Int]
take' n [] = []
take' n (x:xs) = x ++ (take' (n - 1) xs)