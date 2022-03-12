module FieldOrdering where

import Debug.Trace
import Language.Haskell.Exts.Parser
import Language.Haskell.Exts.Pretty
import Language.Haskell.Exts.Syntax
import Nameable
import System.Environment

processFile :: String -> IO ()
processFile filepath = do
  contents <- readFile filepath
  let pResult = parseModuleWithMode parseMode contents
      parseMode = defaultParseMode {parseFilename = filepath}
  case pResult of
    ParseOk hModule -> do
      print "OK"
      let order = getFieldOrdering hModule
      mapM_ print order
    ParseFailed srcLoc message ->
      putStrLn $
        unlines
          [ prettyPrint srcLoc,
            message
          ]

type FieldOrdering = (String, Int)

class HasFieldOrdering f where
  getFieldOrdering :: f a -> [FieldOrdering]

instance HasFieldOrdering Module where
  getFieldOrdering (Module _ _ _ _ decls) = concatMap getFieldOrdering decls
  getFieldOrdering _ = error "Not a module"

instance HasFieldOrdering Decl where
  getFieldOrdering (DataDecl _ _ _ _ conDecls _) = concatMap getFieldOrdering conDecls
  getFieldOrdering _ = []

instance HasFieldOrdering QualConDecl where
  getFieldOrdering (QualConDecl _ _ _ conDecl) = getFieldOrdering conDecl

instance HasFieldOrdering ConDecl where
  getFieldOrdering (RecDecl _ name fields) =
    let filedsNames = concatMap (\(FieldDecl _ names _) -> map getName names) fields
     in zip filedsNames (take (length filedsNames) [0 ..])
  getFieldOrdering _ = []

main :: IO ()
main = do
  args <- getArgs
  let path = head args
  processFile path
