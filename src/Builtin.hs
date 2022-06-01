{-# LANGUAGE QuasiQuotes #-}

module Builtin where

import Data.String.QQ

builtin :: String
builtin =
  [s|

mod :: Int -> Int -> Int
mod = undefined

div :: Int -> Int -> Int
div = undefined

(/=) :: a -> a -> Bool
(/=)  = undefined

data Ordering = LT | EQ | GT

data IO a = IO a

data Maybe a = Nothing | Just a

compare :: a -> a -> Ordering
compare = undefined

(<) :: a -> a -> Bool
(<) = undefined

(<=) :: a -> a -> Bool
(<=) = undefined

(>) :: a -> a -> Bool
(>) = undefined

(>=) :: a -> a -> Bool
(>=) = undefined

max :: a -> a -> a
max = undefined

min :: a -> a -> a
min = undefined

(==) :: a -> a -> Bool
(==) = undefined

(+) :: Int -> Int -> Int
(+) = undefined

(-) :: Int -> Int -> Int
(-) = undefined

(*) :: Int -> Int -> Int
(*) = undefined

negate :: a -> a
negate = undefined

abs :: a -> a
abs = undefined

signum :: a -> a
signum = undefined

fromInteger :: Integer -> a
fromInteger = undefined

id :: a -> a
id = undefined

map :: (a -> b) -> [a] -> [b]
map = undefined

not :: Bool -> Bool
not = undefined

(&&) :: Bool -> Bool -> Bool
(&&) = undefined

(||) :: Bool -> Bool -> Bool
(||) = undefined

otherwise :: Bool
otherwise = undefined

error :: [Char] -> a
error = undefined

length :: [a] -> Int
length = undefined

toUpper :: Char -> Char
toUpper = undefined

toLower :: Char -> Char
toLower = undefined

(++) :: [a] -> [a] -> [a]
(++) = undefined

filter :: (a -> Bool) -> [a] -> [a]
filter = undefined

lines :: [Char] -> [[Char]]
lines = undefined

unlines :: [[Char]] -> [Char]
unlines = undefined

(<>) :: a -> a -> a
(<>) = undefined

mempty :: a
mempty = undefined

mappend :: a -> a -> a
mappend = undefined

mconcat :: [a] -> a
mconcat = undefined

fmap :: (a -> b) -> f a -> f b
fmap = undefined

pure :: a -> f a
pure = undefined

(<*>) :: f (a -> b) -> f a -> f b
(<*>) = undefined

(>>=) :: m a -> (a -> m b) -> m b
(>>=) = undefined

(>>) :: m a -> m b -> m b
(>>) = undefined

return :: a -> m a
return = undefined

putStrLn :: [Char] -> IO ()
putStrLn = undefined

zip :: [a] -> [b] -> [(a, b)]
zip = undefined

readFile :: [Char] -> IO [Char]
readFile = undefined

toEnum :: Int -> a
toEnum = undefined

fromEnum :: a -> Int
fromEnum = undefined

fst :: (a, b) -> a
fst = undefined

snd :: (a, b) -> b
snd = undefined

(^) :: Int -> Int -> Int
(^) = undefined

rem :: Int -> Int -> Int
rem = undefined

getContents :: IO [Char]
getContents = undefined

($) :: (a -> b) -> a -> b
($) = undefined

reverse :: [a] -> [a]
reverse = undefined

foldr :: (a -> b -> b) -> b -> [a] -> b
foldr = undefined

foldl' :: (b -> a -> b) -> b -> [a] -> b
foldl' = undefined

foldl :: (b -> a -> b) -> b -> [a] -> b
foldl = undefined

head :: [a] -> a
head = undefined

last :: [a] -> a
last = undefined

init :: [a] -> [a]
init = undefined

tail :: [a] -> [a]
tail = undefined

elem :: a -> [a] -> Bool
elem = undefined

show :: a -> [Char]
show = undefined

type String = [Char]

permutations :: [a] -> [[a]]
permutations = undefined

(.) :: (b -> c) -> (a -> b) -> a -> c
(.) = undefined

take :: n -> [a] -> [a]
take = undefined

drop :: n -> [a] -> [a]
drop = undefined


and :: [Bool] -> Bool
and = undefined

or :: [Bool] -> Bool
or = undefined

(!!) :: [a] -> Int -> a
(!!) = undefined
|]
