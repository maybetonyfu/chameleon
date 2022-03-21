let example1 = `module Example1 where 
    
data Expr = C Int |
            Comb Expr Expr| 
            V String |
            Let String Expr Expr

data Env = Env [(String, Int)]

eval :: Expr -> Env -> (Env, Int)
eval (Let v e1 e2) env = let (env1, v1) = eval e1 env
                             env2       = extend v v1  
                             ans = eval e2 env2
                         in  ans

extend :: String -> Int -> Env -> Env
extend v e (Env env)  = Env ([(v,e)] ++ env)
`

let example2 = `module Example2 where

data JValue
  =   JObject [(String, JValue)]
    | JArray  [JValue]

renderJValue :: JValue -> String
renderJValue (JObject o) = renderPairs o
renderJValue (JArray a) =  renderPairs a

renderPair :: (String, JValue) -> String
renderPair (k, v) = k ++ ": " ++ renderJValue v

renderPairs :: [(String, JValue)] -> String
renderPairs [] = ""
renderPairs [p] = renderPair p
renderPairs (p : ps) = renderPair p ++ "," ++ renderPairs ps
`

let example3 = `module Example1 where

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
  validate
    (init rows)
    (last (rows - 1)) 
    (last rows + 1) 
    (last rows)

  
--Validate that a Queen on a row doesn't have conflicts with earlier rows.
validate [] _ _ _ = True
validate rows left right position =
  if last rows == left || last rows == right || last rows == position
  then False
  else validate (init rows) (left - 1) (right + 1) position
`

export {example1, example2, example3}
