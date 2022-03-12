module Constraint where

import Binding hiding (main, processFile)
import Debug.Trace
import Instance hiding (main, processFile)
import Kanren
import Language.Haskell.Exts.Parser
import Language.Haskell.Exts.Pretty
import Language.Haskell.Exts.SrcLoc
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
    ParseFailed srcLoc message ->
      putStrLn $
        unlines
          [ prettyPrint srcLoc,
            message
          ]

class HasConstraint f where
  getConstraints :: [(Binding, Int)] -> [Instance] -> f SrcSpanInfo -> [(Term, Term -> Goal)]

instance HasConstraint Module where
  getConstraints bindings instances (Module _ _ _ _ decls) = concatMap (getConstraints bindings instances) decls
  getConstraints bindings instances _ = error "Not a module"

instance HasConstraint Decl where
  getConstraints bindings instances (ClassDecl (SrcSpanInfo sp _) maybeContext (DHApp _ (DHead _ clsName) (UnkindedVar _ varName)) _ (Just decls)) =
    concatMap constraintFromDecl decls
    where
      constraintFromDecl (ClsDecl _ (TypeSig _ names typeDef)) =
        let funType = typeToTerm bindings typeDef
            typeclass = getName clsName
            typeVar = var $ uniqueNameFromBinding bindings Nothing (getName varName) sp
            methodVars = map (\n -> var $ uniqueNameFromBinding bindings Nothing (getName n) sp) names
            superClasses = maybe [] typeClassesFromContext maybeContext
            assetion = \fun ->
              callFresh
                ( \typeVar' ->
                    conjN
                      ( [ fun === replaceTerm typeVar typeVar' funType,
                          hasInstance instances typeclass typeVar'
                        ]
                          ++ map (\sc -> hasInstance instances sc typeVar') superClasses
                      )
                )
         in map (\v -> (v, assetion)) methodVars
      constraintFromDecl _ = []
  getConstraints bindings instances _ = []

typeClassesFromContext :: Context a -> [String]
typeClassesFromContext (CxSingle _ (TypeA _ (TyApp _ (TyCon _ qname) _))) = [getName qname]
typeClassesFromContext (CxSingle l (ParenA _ ta)) = typeClassesFromContext (CxSingle l ta)
typeClassesFromContext (CxSingle _ _) = []
typeClassesFromContext (CxEmpty _) = []
typeClassesFromContext (CxTuple l tas) = concatMap (typeClassesFromContext . CxSingle l) tas

main :: IO ()
main = do
  args <- getArgs
  let path = head args
  processFile path
