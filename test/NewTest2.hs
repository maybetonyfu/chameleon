data Hand = Rock | Paper | Scissors
type Score = (Int, Int)

winsOver :: Hand -> Hand -> Bool
Rock     `winsOver` Scissors = True
Paper    `winsOver` Rock     = True
Scissors `winsOver` Paper    = True
_        `winsOver` _        = False

computeScore :: Hand -> Hand -> Score
computeScore h1 h2
  | h1 `winsOver` h2 = (1, 0)
  | h2 `winsOver` h1 = (0, 1)
  | otherwise        = (0, 0)

combine a b = (fst a + fst b, snd a + snd b)

zip' (a:as) (b:bs) = (a,b) : zip' as bs


;; pairScore :: (Hand, Hand) -> Score
pairScore (h1, h2) = computeScore h1 h2

score :: [Hand] -> [Hand] -> Score
score h1 h2 = 
    foldl combine (0, 0) (pairScore (zip' h1 h2))
