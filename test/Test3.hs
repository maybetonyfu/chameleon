module Task where 
    
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