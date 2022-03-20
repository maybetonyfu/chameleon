
permutation :: [a] -> [[a]]
permutation xs =
  let
    len = length xs
    rotate :: [a] -> [a]
    rotate (x:xs) = xs ++ [x]
    rotations :: Int -> [a] -> [[a]]
    rotations l xs = take l (iterate rotate xs)
    run :: Int -> [a] -> [[a]]
    run _ []      = [[]]
    run _ [x]     = [[x]]
    run n (x:xs)  = run (n-1) xs >>= rotations n . (x:)
  in run len xs


nqueens size =
  filter (evaluateBoard size) (board_permutations size)

--N sized Chess boards are represented as a one-dimension array.
board_permutations size = permutations [0..size - 1]

--Count the number of valid boards for a specified Chess board size.
count_boards size = length . nqueens

--Recursively check that prior rows are valid.
evaluateBoard _ [] = True
evaluateBoard size rows =
  let last_row = last rows
  in (evaluateBoard size (init rows)) &&
     (validate size (init rows) (last_row - 1) (last_row + 1) last_row)


  
--Validate that a Queen on a row doesn't have conflicts with earlier rows.
validate _ [] _ _ _ = True
validate size rows left right position =
  if last rows == left || last rows == right || last rows == position
  then False
  else validate size (init rows) (left - 1) (right + 1) position

