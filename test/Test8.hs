module Task where 
    
data Expr = C Int |
            Comb Expr Expr| 
            V [Char] |
            Let [Char] Expr Expr


eval :: Expr -> [([Char], Int)] -> ([([Char], Int)], Int)
eval (Let v e1 e2) env = let (env1, v1) = eval e1 env
                             env2       = extend v v1  
                             ans = eval e2 env2
                         in  ans

extend :: [Char] -> Int -> [([Char], Int)] -> [([Char], Int)]
extend v e env  = [(v,e)] ++ env

answer :: Expr -> ([([Char], Int)], Int)
answer e = eval e []
