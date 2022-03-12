module Task where 

type Verbosity = Integer 
data ProgramSearchPathEntry = ProgramSearchPathDir String | ProgramSearchPathDefault
type ProgramSearchPath = [ProgramSearchPathEntry]

-- debug :: Verbosity -> String -> IO ()
-- debug = undefined

findProgramOnSearchPath :: Verbosity -> ProgramSearchPath
                        -> String -> IO (Maybe (String, [String]))
findProgramOnSearchPath verbosity searchpath prog = do
    res <- tryPathElems [] searchpath
    return res

tryPathElems :: [[String]] -> [ProgramSearchPathEntry]
              -> IO (Maybe (String, [String]))
tryPathElems _     []       = return Nothing
tryPathElems tried (pe:pes) = do
  res <- tryPathElem pe prog
  case res of
    (Nothing,      notfoundat) -> tryPathElems (notfoundat : tried) pes
    (Just foundat, notfoundat) -> return (Just (foundat, alltried))
      where
        alltried = concat (reverse (notfoundat : tried))

tryPathElem :: ProgramSearchPathEntry -> String -> IO (Maybe String, [String])
tryPathElem (ProgramSearchPathDir dir) prog = do
  findFirstExe [ dir  ++ prog ]

-- On other OSs we can just do the simple thing
tryPathElem ProgramSearchPathDefault prog = do
  findFirstExe [ "./" ++ prog  ]

findFirstExe :: [String] -> IO (Maybe String, [String])
findFirstExe = findFirstExe' []

findFirstExe' fs' []     = return ("", reverse fs')
findFirstExe' fs' (f:fs) = do
  isExe <- doesExecutableExist f
  if isExe
    then return (f, reverse fs')
    else findFirstExe' (f:fs') fs

doesExecutableExist :: String -> IO Bool
doesExecutableExist _ = do
  return True