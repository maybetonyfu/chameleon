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

const example4 = `data Hand = Rock | Paper | Scissors
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


pairScore (h1, h2) = computeScore h1 h2

score :: [Hand] -> [Hand] -> Score
score h1 h2 = 
    foldl combine (0, 0) (pairScore (zip' h1 h2))

`

let example5 = `module Task where 
data Period
  = DayPeriod Day
  | WeekPeriod Day
  | MonthPeriod Year Month
  | QuarterPeriod Year Quarter
  | YearPeriod Year

-- synonyms for various date-related scalars
type Year = Int
type Month = Int -- 1-12
type Quarter = Int -- 1-4
data Day = Day Year Month Int

data DataSpan = DateSpan (Maybe Day) (Maybe Day) 

addDays :: Int -> Day -> Day
addDays n day = day

quarterAsMonth :: Quarter -> Month
quarterAsMonth q = (q - 1) * 3 + 1

fromGregorian :: Year -> Month -> Int -> Maybe Day
fromGregorian y m d = Just (Day y m d)

periodAsDateSpan :: Period -> DataSpan
periodAsDateSpan (WeekPeriod b) =  DateSpan (Just b) (Just (addDays 7 b))
periodAsDateSpan (MonthPeriod y m) = 
  let
    (y', m')
      | m == 12 = (y + 1, 1)
      | otherwise = (y, m + 1)
    dayStart = Just (fromGregorian y m 1)
    dayEnd = Just (fromGregorian y' m' 1)
  in DateSpan dayStart dayEnd
  

  
`


let example6 = `module Task where 

standardTrans z =
  case z of
    "shorttitle" -> []
    "sorttitle" -> []
    "indextitle" -> []
    "indexsorttitle" -> []
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

`

let example7 = `module Example where

-- Takes the first n elements from a list
take' :: Int -> [Int] -> [Int]
take' n [] = []
take' n (x:xs) = x ++ take' (n - 1) xs
`

let example8 = `module Task where

-- A data type to represent password
data Password = P String

-- Validate how good a password is
validate :: Password -> String
validate password = 
    if length password > 10 
        then "Great password"
        else "Password too short"
`
export {example1, example2, example3, example4, example5, example6, example7, example8}
