divides x y = y `mod` x == 0


dropEvery [] _ = []
dropEvery (x:xs) n = dropEvery' (x:xs) n 1

dropEvery' :: [Int] -> Int -> Int -> [Int]
dropEvery' [] _ _ = []
dropEvery' (x:xs) n i =
    let current =
            if n `divides` i
                then []
                else [x]
    in current : dropEvery' xs n (i+1)