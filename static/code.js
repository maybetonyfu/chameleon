const intro = n => `x :: Bool
x = y

y = 2
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


const constAndTuple = n => `module Task${n} where

x :: (Int, Bool)
x = (3, y)

const :: a -> b -> a
const a b = a

y = const 0 True
`

const inc = n => `module Task${n} where

incr n = n + 1
fun True c = incr c
fun a x = a
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

const intandbool = n => `module Task${n} where
t u v = if u then v else 0
f u v = if u then 0 else v
d f g x = f x + g x
b = True
i = 3
w = d (t i) (f i) b
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
const examples = [
  intro,
  ifelse,
  constAndTuple,
  inc,
  intandbool,
  uconandvcon,
  quicksort,
  printXML,
].map((ex, n) => ex(n + 1));

export default examples;
