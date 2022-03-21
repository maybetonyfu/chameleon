module Example1 where

nqueens size =
  filter evaluateBoard (board_permutations size)

--N sized Chess boards are represented as a one-dimension array.
board_permutations size = permutations [0..size - 1]

--Count the number of valid boards for a specified Chess board size.
count_boards size = length . nqueens

--Recursively check that prior rows are valid.
evaluateBoard [] = True
evaluateBoard rows =
  evaluateBoard (init rows) &&
  validate (init rows) (last (rows - 1)) (last rows + 1) (init rows) (last rows)

  
--Validate that a Queen on a row doesn't have conflicts with earlier rows.
validate [] _ _ _ = True
validate rows left right position =
  if last rows == left || last rows == right || last rows == position
  then False
  else validate (init rows) (left - 1) (right + 1) position
