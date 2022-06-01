toWeekday n = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] !! n

seperateByComma :: [String] -> String
seperateByComma [] = ""
seperateByComma [x] = x
seperateByComma (x : xs) = x ++ "," ++ seperateByComma xs

range xs
  | length xs < 3 = seperateByComma xs
  | otherwise = head xs ++ "-" ++ last xs

dayRange :: [Int] -> [String]
dayRange days =
  let grouped = groupBy' (\a b -> a + 1 == b) days
   in map (range . toWeekday) grouped

-- unlike groupBy which compares any element
-- to the first,
-- groupBy' compares any element to the last
-- element
groupBy' :: (a -> a -> Bool) -> [a] -> [[a]]
groupBy' f (x : xs) =
  let go f (x : xs) ((a : as) : bs) =
        if f a x
          then go f xs ((x : a : as) : bs)
          else go f xs ([x] : (a : as) : bs)
      go _ [] as = reverse (map reverse as)
   in go f xs [[x]]