module Task where 
data Period
  = DayPeriod Day
  | WeekPeriod Day
  | MonthPeriod Year Month
  | QuarterPeriod Year Quarter
  | YearPeriod Year
  | PeriodBetween Day Day
  | PeriodFrom Day
  | PeriodTo Day
  | PeriodAll

-- synonyms for various date-related scalars
type Year = Integer

type Month = Integer -- 1-12

type Quarter = Integer -- 1-4

type YearWeek = Integer -- 1-52

type MonthWeek = Integer -- 1-5

type YearDay = Integer -- 1-366

type MonthDay = Integer -- 1-31

type WeekDay = Integer -- 1-7

data Day = Day Year Month Integer

type DateSpan  = ((Maybe Day), (Maybe Day))

addDays :: Integer -> Day -> Day
addDays n day = day

quarterAsMonth :: Quarter -> Month
quarterAsMonth q = (q - 1) * 3 + 1

-- fromGregorian :: Year -> Month -> Integer -> Maybe Day
fromGregorian y m d = Just (Day y m d)

periodAsDateSpan :: Period -> DateSpan
periodAsDateSpan (DayPeriod d) = ((Just d), (Just (addDays 1 d)))
periodAsDateSpan (WeekPeriod b) =  ((Just b), (Just (addDays 7 b)))
periodAsDateSpan (MonthPeriod y m) = (Just (fromGregorian y m 1), Just (fromGregorian y' m' 1))
  where
    (y', m')
      | m == 12 = (y + 1, 1)
      | otherwise = (y, m + 1)