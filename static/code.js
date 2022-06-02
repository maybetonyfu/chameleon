const intro = n => `module Task${n} where

x y =
  case y of
    3 -> '3'
    False -> '4'
`

const dropEvery = n => `module Task${n} where

divides x y = y \`mod\` x == 0


dropEvery [] _ = []
dropEvery (x:xs) n = dropEvery' (x:xs) n 1

dropEvery' :: [Int] -> Int -> Int -> [Int]
dropEvery' [] _ _ = []
dropEvery' (x:xs) n i =
    let current =
            if n \`divides\` i
                then []
                else [x]
    in current : dropEvery' xs n (i+1)
`

const rotate = n => `module Task${n} where
-- Rotate a list N places to the left.

rotate1 :: [a] -> [a]
rotate1 x = tail x ++ [head x]

rotate1Back :: [a] -> [a]
rotate1Back x = last x : init x


rotate :: [a] -> Int -> [a]
rotate [] _ = []
rotate x 0 = x
rotate x y
  | y > 0 = rotate rotate1 (y-1)
  | otherwise = rotate rotate1Back x (y+1)
`

const exampeExtend = n => `module Task${n} where

data Expr = C Int |
            Comb Expr Expr|
            V String |
            Let String Expr Expr

data Env = Env [(String, Int)]

eval :: Expr -> Env -> (Env, Int)
eval (C x)  env       = (env, x)
eval (Let v e1 e2) env = let (env1, v1) = eval e1 env
                             env2       = extend v v1
                             ans = eval e2 env2
                         in  ans
eval (V v)  env       = (env, find v env)

extend :: String -> Int -> Env -> Env
extend v e (Env env)  = Env ([(v,e)] ++ env)

find v  (Env [])          = error "Unbound variable"
find v1 (Env ((v2,e):es)) = if v1 == v2 then e else find v1 (Env es)

`;

const weekdayRange = n => `module Task${n} where

toWeekday n =
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] !! n

seperateByComma [] = ""
seperateByComma [x] = x
seperateByComma (x : xs) = x ++ "," ++ seperateByComma xs

range xs
  | length xs < 3 = seperateByComma xs
  | otherwise = head xs ++ "-" ++ last xs

-- dayRange :: [Int] -> [String]
dayRange days =
  let grouped = groupBy' (\\a b -> a + 1 == b) days
   in map (\\x -> range (toWeekday x)) grouped

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

`

const exampleJValue = n => `module Task${n} where

data JValue = JString String
  | JNumber Double
  | JBool Bool
  | JNull
  | JObject [(String, JValue)]
  | JArray  [JValue]

renderJValue :: JValue -> String
renderJValue (JString s)   = show s
renderJValue (JNumber n)   = show n
renderJValue (JBool True)  = "true"
renderJValue (JBool False) = "false"
renderJValue JNull         = "null"

renderJValue (JObject o) = "{" ++ renderPairs o ++ "}"
renderJValue (JArray a) = "[" ++ renderPairs a ++ "]"

renderPair :: (String, JValue) -> String
renderPair (k,v)   = show k ++ ": " ++ renderJValue v

renderPairs :: [(String,JValue)] -> String
renderPairs [] = ""
renderPairs [p] = renderPair p
renderPairs (p:ps) = renderPair p ++ "," ++ renderPairs ps

-- renderArrayValues is not used anywhere, I wonder why
renderArrayValues [] = ""
renderArrayValues [v] = renderJValue v
renderArrayValues (v:vs) = renderJValue v ++ "," ++ renderArrayValues vs
`;

const exampleNQueens = n => `module Task${n} where

nqueens size =
  filter evaluateBoard (board_permutations size)

--N sized Chess boards are represented as a one-dimension array.
board_permutations size = permutations [0..size - 1]

--Count the number of valid boards for a specified Chess board size.
count_boards size = length . nqueens

init' [] = error "init' applied at empty list"
init' [a, b] = [a]
init' (a:as) = a : init' as

--Recursively check that prior rows are valid.
evaluateBoard [] = True
evaluateBoard rows =
  evaluateBoard (init' rows) &&
  validate
    (init' rows)
    (last (rows - 1))
    (last rows + 1)
    (last rows)


--Validate that a Queen on a row doesn't have conflicts with earlier rows.
validate [] _ _ _ = True
validate rows left right position =
  if last rows == left || last rows == right || last rows == position
  then False
  else validate (init' rows) (left - 1) (right + 1) position
`;

const exampleRockPaperScissors = n => `module Task${n} where

data Hand = Rock | Paper | Scissors
type Score = (Int, Int)

winsOver :: Hand -> Hand -> Bool
Rock     \`winsOver\` Scissors = True
Paper    \`winsOver\` Rock     = True
Scissors \`winsOver\` Paper    = True
_        \`winsOver\` _        = False

computeScore :: Hand -> Hand -> Score
computeScore h1 h2
  | h1 \`winsOver\` h2 = (1, 0)
  | h2 \`winsOver\` h1 = (0, 1)
  | otherwise        = (0, 0)

combine a b = (fst a + fst b, snd a + snd b)

zip' (a:as) (b:bs) = (a,b) : zip' as bs

foldl1 :: (b -> a -> b) -> b -> [a] -> b
foldl1  _ b [] = b
foldl1  f b (a:as) = foldl1 f (f b a) as

pairScore (h1, h2) = computeScore h1 h2

score :: [Hand] -> [Hand] -> Score
score h1 h2 =
    foldl1 combine (0, 0) (pairScore (zip' h1 h2))

`;

const exampleDateSpan = n => `module Task${n} where
data Period
  = DayPeriod Day
  | WeekPeriod Day
  | MonthPeriod Year Month
  | YearPeriod Year

type Year = Int
type Month = Int -- 1-12
data Day = Day Year Month Int

data DataSpan = DateSpan (Maybe Day) (Maybe Day)

addDays :: Int -> Day -> Day
addDays n day = day

fromGregorian :: Year -> Month -> Int -> Maybe Day
fromGregorian y m d = Just (Day y m d)

periodAsDateSpan :: Period -> DataSpan
periodAsDateSpan (WeekPeriod b) =
  DateSpan (Just b) (Just (addDays 7 b))
periodAsDateSpan (MonthPeriod y m) =
  let
    (y', m')
      | m == 12 = (y + 1, 1)
      | otherwise = (y, m + 1)
    dayStart = Just (fromGregorian y m 1)
    dayEnd = Just (fromGregorian y' m' 1)
  in DateSpan dayStart dayEnd



`;

const exampleBookTrans = n => `module Task${n} where

standardTrans z =
  case z of
    "shorttitle" -> ["short"]
    "sorttitle" -> ["sorted"]
    "indextitle" -> ["index"]
    "indexsorttitle" -> ["index", "sorted"]
    _ -> z


-- bookTrans :: String -> [String]
bookTrans z =
  case z of
    "title" -> ["booktitle"]
    "subtitle" -> ["booksubtitle"]
    "titleaddon" -> ["booktitleaddon"]
    "shorttitle" -> []
    "sorttitle" -> []
    "indextitle" -> []
    "indexsorttitle" -> []
    _ -> [z]

transformKey x y "author"
  | x \`elem\` ["mvbook", "book"] =
    ["bookauthor", "author"]
-- note: this next clause is not in the biblatex manual, but it makes
-- sense in the context of CSL conversion:
transformKey x y "author"
  | x == "mvbook" = ["bookauthor", "author"]
transformKey "mvbook" y z
  | y \`elem\` ["book", "inbook", "bookinbook", "suppbook"] =
    standardTrans z
transformKey _ _ x = [x]

`;

const exampleTake = n => `module Task${n} where

-- Takes the first n elements from a list
take' :: Int -> [Int] -> [Int]
take' n [] = []
take' n (x:xs) = x ++ take' (n - 1) xs
`;

const examplePassword = n => `module Task${n} where

-- A data type to represent password
data Password = P String

-- Validate how good a password is
validate :: Password -> String
validate password =
    if length password > 10
        then "Great password"
        else "Password too short"
`;


const insertAt = n => `module Task${n} where

-- Insert an element at a given position into a list.

insertAt el lst n =
    let accu (i, acc) x =
            if i == n
                then (acc ++ [el,x],i+1)
                else (acc ++ [x],i+1)
    in fst $ foldl accu ([],1) lst


`

const balanceTree = n => `module Task${n} where

data Tree a = Empty | Branch a (Tree a) (Tree a)
leaf x = Branch x Empty Empty

isBalancedTree Empty = True
isBalancedTree (Branch _ l r) =
    (countBranches l - countBranches r) == 1
    || (countBranches r - countBranches l) == 1
    && isBalancedTree l && isBalancedTree r


countBranches Empty = 0
countBranches (Branch _ l r) = 1 + l + r
`

const mostBasic = n => `module Task${n} where

x y =
  case y of
    Nothing -> Just 0
    Just n -> n * 2
`

const ifelse = n => `module Task${n} where
u = 0
v = 0.1
z = True
y = if z then u else v
`
[[1,2,3,4], [4,5,6,7]] [[1,2,3,4], [5,6,7,8]]
const compress = n => `module Task${n} where
--  Eliminate consecutive duplicates of list elements.

compress = foldr skipDups

skipDups x [] = [x]
skipDups x acc
   | x == head acc = acc
   | otherwise = x : acc

expect = [3,4,5,6]

actual = compress [3,3,4,5,6,6]

y :: Bool
y =  expect == actual
`


const uconandvcon = n => `module Task${n} where

data V = VCon String
data U = UCon Bool Int (Int, Int)

u :: U -> V
u (UCon x y j) =
  if x
    then j
    else fst y + snd y

`

const quicksort = n => `module Task${n} where

quick :: [Int] -> [Int]
quick []   = []
quick (x:xs)=
 let littlebigs = split xs
 in
   quick (fst littlebigs)
    ++ [x]
    ++  quick (snd littlebigs)

split [] _ result = result
split (x:xs) n (littles, bigs) =
  if x < n
    then split xs n (x:littles, bigs)
    else split xs n (littles, x:bigs)
`


const printXML = n => `module Task${n} where

data XML = XML Position Part
data Position = Top | Bottom | Left | Right

type Name = String

data Part =
     Element Name [Attribute] [XML]
   | Comment String
   | Text String

getPart :: XML -> Part
getPart (XML pos part) = part


printXML (Element name [attributs] xmls) =
  "<" ++ name ++ ">"
  ++ mconcat (map printXML xmls)
  ++ "</" ++ name ++ ">"
printXML (Text text) = text


`

const euler1 = n => `module Task${n} where

-- Add all the natural numbers below 1000
-- that are multiples of 3 or 5.
sum [] = 0
sum [x] = x
sum (x:xs) = x + sum xs

check (x:xs)
  | x \`mod\` 3 == 0 || x \`mod\` 5 == 0 = x + check xs
  | otherwise = check xs

problem_1 = sum (check [1..999])
`
const examples = [
  euler1,
  dropEvery,
  rotate,
  insertAt,
  balanceTree,
  compress,
  uconandvcon,
  quicksort,
  printXML,
  // weekdayRange,
].map((ex, n) => ex(n + 1));

export default examples;
