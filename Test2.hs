module Task where

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

