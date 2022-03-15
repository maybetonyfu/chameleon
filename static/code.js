let example1 = `module Example1 where 
    
data Expr = C Int |
            Comb Expr Expr| 
            V [Char] |
            Let [Char] Expr Expr

data Env = Env [([Char], Int)]

eval :: Expr -> Env -> (Env, Int)
eval (Let v e1 e2) env = let (env1, v1) = eval e1 env
                             env2       = extend v v1  
                             ans = eval e2 env2
                         in  ans

extend :: [Char] -> Int -> Env -> Env
extend v e (Env env)  = Env ([(v,e)] ++ env)
`

let example2 = `module Example2 where

data JValue
  =   JObject [([Char], JValue)]
    | JArray  [JValue]

renderJValue :: JValue -> [Char]
renderJValue (JObject o) = renderPairs o
renderJValue (JArray a) =  renderPairs a

renderPair :: ([Char], JValue) -> [Char]
renderPair (k, v) = k ++ ": " ++ renderJValue v

renderPairs :: [([Char], JValue)] -> [Char]
renderPairs [] = ""
renderPairs [p] = renderPair p
renderPairs (p : ps) = renderPair p ++ "," ++ renderPairs ps
`

let example3 = `module Example3 where
take' :: Int -> [Int] -> [Int]
take' n [] = []
take' n (x:xs) = x ++ (take' (n - 1) xs)
`

export {example1, example2, example3}