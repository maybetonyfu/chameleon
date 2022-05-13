module Instance where

import Binding hiding (main, processFile)
import Debug.Trace
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
      let bindings = moduleBindings hModule
          cons = getInstances bindings hModule
          res = run1 [] (hasInstance cons "X" (Pair (atom "Maybe") (var "abcd") []))
      print res
    ParseFailed srcLoc message ->
      putStrLn $
        unlines
          [ prettyPrint srcLoc,
            message
          ]

data Instance = Instance {tcName :: String, tcVar :: Term, tcAdditional :: [Instance] -> Term -> Goal}

class HasInstance f where
  getInstances :: [(Binding, Int)] -> f SrcSpanInfo -> [Instance]

instance HasInstance Module where
  getInstances bindings (Module _ _ _ _ decls) = concatMap (getInstances bindings) decls
  getInstances bindings _ = error "Not a module"

instance HasInstance Decl where
  getInstances bindings (InstDecl _ _ instanceRule _) = getInstances bindings instanceRule
  getInstances bindings _ = []

instance HasInstance InstRule where
  getInstances bindings (IParen _ insRule) = getInstances bindings insRule
  getInstances bindings (IRule _ _ maybeContext (IHApp _ (IHCon _ qname) typeDef)) =
    let term = typeToTerm bindings typeDef
     in case maybeContext of
          Nothing -> [Instance (getName qname) term (\_ _ -> succeeds)]
          Just ctx ->
            case ctx of
              (CxSingle _ (TypeA _ t)) ->
                let (Pair x y _) = typeToTerm bindings t
                    tVar = y
                    className = atomToString x
                    fun = \ins t ->
                      callFresh
                        ( \t' ->
                            let newTerm = replaceTerm tVar t' term
                             in conj2 (t === newTerm) (hasInstance ins className t')
                        )
                 in [Instance (getName qname) term fun]
              _ -> []
  getInstances bindings _ = error "Multiple parameter type class is not supported"

typeToTerm :: [(Binding, Int)] -> Type SrcSpanInfo -> Term
typeToTerm bindings (TyVar (SrcSpanInfo sp _) name) = var $ uniqueNameFromBinding bindings Nothing (getName name) sp
typeToTerm bindings (TyCon _ qname) = atom (getName qname)
typeToTerm bindings (TyList _ t) = lstOf (typeToTerm bindings t)
typeToTerm bindings (TyFun _ t1 t2) = funOf [typeToTerm bindings t1, typeToTerm bindings t2]
typeToTerm bindings (TyTuple _ _ ts) = tupOf . map (typeToTerm bindings) $ ts
typeToTerm bindings (TyUnboxedSum _ ts) = tupOf . map (typeToTerm bindings) $ ts
typeToTerm bindings (TyApp _ t1 t2) = Pair (typeToTerm bindings t1) (typeToTerm bindings t2) []
typeToTerm bindings (TyParen _ t) = typeToTerm bindings t
typeToTerm _ _ = error "Unsupported type"

varsFromType :: [(Binding, Int)] -> Type SrcSpanInfo -> [Term]
varsFromType bindings (TyVar (SrcSpanInfo sp _) name) = [var $ uniqueNameFromBinding bindings Nothing (getName name) sp]
varsFromType bindings (TyCon _ qname) = []
varsFromType bindings (TyList _ t) = varsFromType bindings t
varsFromType bindings (TyFun _ t1 t2) = varsFromType bindings t1 ++ varsFromType bindings t2
varsFromType bindings (TyTuple _ _ ts) = concatMap (varsFromType bindings) ts
varsFromType bindings (TyUnboxedSum _ ts) = concatMap (varsFromType bindings) ts
varsFromType bindings (TyApp _ t1 t2) = varsFromType bindings t1 ++ varsFromType bindings t2
varsFromType bindings (TyParen _ t) = varsFromType bindings t
varsFromType _ _ = error "Unsupported type"

hasInstance :: [Instance] -> String -> Term -> Goal
hasInstance ins typeclass t =
  let instances = filter (\(Instance cl _ _) -> cl == typeclass) ins
      generateCondaLine fromClass fromInstance additional =
        [ callFresh
            ( \newVar1 ->
                callFresh
                  ( \newVar2 ->
                      conjN
                        [ newVar1 ==< fromClass,
                          newVar2 ==< fromInstance,
                          newVar2 === newVar1,
                          additional ins newVar2
                        ]
                  )
            ),
          succeeds
        ]
      condaLines = map (\i -> generateCondaLine t (tcVar i) (tcAdditional i)) instances
   in conda $ condaLines ++ [[succeeds, fails]]

main :: IO ()
main = do
  args <- getArgs
  let path = head args
  processFile path
