module Scope where

import Agda.Utils.Graph.TopSort
import Control.Monad.Trans.State.Lazy
import Data.Bifunctor
import Data.List
import Data.Maybe
import Debug.Trace
import GHC.Read (paren)
import Language.Haskell.Exts.Parser
import Language.Haskell.Exts.Pretty
import Language.Haskell.Exts.SrcLoc
import Language.Haskell.Exts.Syntax
import Nameable
import System.Environment

data ScopeType
  = VarScope
  | FunScope
  | ArgScope
  | LambdaScope
  | CaseScope
  | LetScope
  | GeneratorScope
  | AdtScope
  | RecordFieldScope
  | TypeScope
  | TypeAliasScope
  deriving (Show, Eq, Ord)

data ScopeRange = Normal SrcSpan | Global deriving (Show, Eq, Ord)

data Scope = Scope
  { scopeId :: Int,
    scopeType :: ScopeType,
    effectiveIn :: ScopeRange,
    definedIn :: ScopeRange,
    generate :: [String],
    use :: [String],
    parentScope :: Int,
    topOrder :: Int,
    constraints :: [(String, String)]
  }
  deriving (Show, Ord)

instance Eq Scope where
  a == b = scopeId a == scopeId b

concatUnzip :: [([a1], [a2])] -> ([a1], [a2])
concatUnzip = bimap concat concat . unzip

sl :: Annotated a => a SrcSpanInfo -> SrcSpan
sl = sp . ann

sp :: SrcSpanInfo -> SrcSpan
sp = srcInfoSpan

normal :: SrcSpanInfo -> ScopeRange
normal = Normal . sp

fn :: SrcSpanInfo -> String
fn = srcSpanFilename . sp

noSpan :: SrcSpan
noSpan = sp noSrcSpan

toSrcSpan :: ScopeRange -> SrcSpan
toSrcSpan Global = noSpan
toSrcSpan (Normal x) = x

getId :: State Int Int
getId = do
  n <- get
  put (n + 1)
  return n

scopesIds :: [Scope] -> [Int]
scopesIds = map scopeId

class HasScopes f where
  getScopes :: ScopeRange -> Int -> f SrcSpanInfo -> State Int ([String], [Scope])

instance HasScopes Module where
  getScopes parent parentId (Module _ _ _ _ decls) = do
    (_, scopes) <- concatUnzip <$> mapM (getScopes Global parentId) decls
    -- return ([], sortScopes parentId scopes)
    return ([], scopes)
  getScopes _ _ _ = error "Not a module"

instance HasScopes Decl where
  getScopes parent parentId (TypeDecl l typehead typedef) = do
    newScopeId <- getId
    let getTypeCon :: DeclHead a -> String
        getTypeCon (DHead _ name) = getName name
        getTypeCon (DHInfix _ _ name) = getName name
        getTypeCon (DHParen _ dh) = getTypeCon dh
        getTypeCon (DHApp _ dh _) = getTypeCon dh
        typeCon = getTypeCon typehead
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = TypeAliasScope,
              effectiveIn = parent,
              definedIn = normal l,
              generate = [typeCon],
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    return ([], newScope : [])
  getScopes parent parentId p@(PatBind l pat rhs maybeWheres) = do
    newScopeId <- getId
    (names, scopes) <- getScopes (normal l) newScopeId rhs
    let newNames = nub $ patternVarNames pat
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = VarScope,
              effectiveIn = parent,
              definedIn = normal l,
              generate = newNames,
              use = names \\ newNames,
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    return (names, newScope : scopes)
  getScopes parent parentId (FunBind l matches) = do
    newScopeId <- getId
    (names, scopes) <- concatUnzip <$> mapM (getScopes parent parentId) matches
    let funScopes = filter ((== parentId) . parentScope) scopes
        funName = generate . head $ funScopes
        oldIds = scopesIds funScopes
        childrenScopes = map (\s -> if parentScope s `elem` oldIds then s {parentScope = newScopeId} else s) $ scopes \\ funScopes
        mergedFunScope =
          Scope
            { scopeId = newScopeId,
              scopeType = FunScope,
              effectiveIn = parent,
              definedIn = normal l,
              generate = funName,
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    return (names, mergedFunScope : childrenScopes)
  getScopes parent parentId (DataDecl l _ _ declHead conDecls _) = do
    dataConId <- getId
    typeVarId <- getId
    let datacons = concatMap dataConNames conDecls
        typeVars = getTypeVars declHead
        dataconScope =
          Scope
            { scopeId = dataConId,
              scopeType = AdtScope,
              effectiveIn = Global,
              definedIn = normal l,
              generate = datacons,
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    if null typeVars
      then return (datacons, [dataconScope])
      else do
        typeVarId <- getId
        let typeVarScope =
              Scope
                { scopeId = typeVarId,
                  scopeType = TypeScope,
                  effectiveIn = normal l,
                  definedIn = normal l,
                  generate = typeVars,
                  use = [],
                  parentScope = dataConId,
                  topOrder = 0,
                  constraints = []
                }
        return (datacons ++ typeVars, [dataconScope, typeVarScope])
  getScopes parent parentId (TypeSig l names typeDef) = do
    newScopeId <- getId
    let constraints = getConstraints typeDef
    let names = getTypeVars typeDef
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = TypeScope,
              effectiveIn = normal l,
              definedIn = normal l,
              generate = names,
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = constraints
            }
    return ([], [newScope])
  getScopes parent parentId (InstDecl l _ instRule maybeInstDcls) = do
    newScopeId <- getId
    let instDecls = concat maybeInstDcls
        typeVars = getTypeVars instRule
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = TypeScope,
              effectiveIn = normal l,
              definedIn = normal l,
              generate = typeVars,
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    (names, declScopes) <- concatUnzip <$> mapM (getScopes (normal l) newScopeId) instDecls
    return ([], newScope : declScopes)
  getScopes parent parentId (ClassDecl l _ declHead fundeps maybeclassdecls) = do
    newScopeId <- getId
    let classdecls = concat maybeclassdecls
        typeVars = getTypeVars declHead
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = TypeScope,
              effectiveIn = normal l,
              definedIn = normal l,
              generate = typeVars,
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    (names, methodScopes) <- concatUnzip <$> mapM (getScopes (normal l) newScopeId) classdecls
    let methodScopes' = map (\s -> if scopeType s == TypeScope then s {generate = generate s \\ typeVars} else s) methodScopes
    return (names, newScope : methodScopes')
  getScopes parent parentId _ = undefined

instance HasScopes InstRule where
  getScopes parent parentId (IRule _ _ _ instHead) = undefined
  getScopes parent parentId (IParen _ iRule) = getScopes parent parentId iRule

instance HasScopes InstHead where
  getScopes parent parentId (IHCon _ _) = undefined
  getScopes parent parentId (IHInfix _ t _) = undefined
  getScopes parent parentId (IHParen _ h) = undefined
  getScopes parent parentId (IHApp _ h t) = undefined

instance HasScopes InstDecl where
  getScopes parent parentId (InsDecl _ decl) = getScopes parent parentId decl
  getScopes _ _ _ = error "Unsuppored instance method type"

instance HasScopes ClassDecl where
  getScopes parent parentId (ClsDecl l (TypeSig _ names typeDef)) = do
    methodScopeId <- getId
    typeVarScopeId <- getId
    let methodNames = map getName names
        typeVars = getTypeVars typeDef
        methodScope =
          Scope
            { scopeId = methodScopeId,
              scopeType = FunScope,
              effectiveIn = Global,
              definedIn = normal l,
              generate = methodNames,
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
        typeVarScope =
          Scope
            { scopeId = typeVarScopeId,
              scopeType = TypeScope,
              effectiveIn = normal l,
              definedIn = normal l,
              generate = typeVars,
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }

    return ([], [methodScope, typeVarScope])
  getScopes _ _ _ = error "Unsupported types of method declaration"

instance HasScopes DeclHead where
  getScopes parent parentId (DHead _ _) = undefined
  getScopes parent parentId (DHParen _ dh) = undefined
  getScopes parent parentId (DHApp _ dh varbind) = undefined
  getScopes parent parentId (DHInfix _ varbind _) = undefined

instance HasScopes TyVarBind where
  getScopes parent parentId (KindedVar _ name _) = undefined
  getScopes parent parentId (UnkindedVar _ name) = undefined

instance HasScopes Match where
  getScopes parent parentId (InfixMatch l pat name pats rhs maybeWheres) = getScopes parent parentId (Match l name (pat : pats) rhs maybeWheres)
  getScopes parent parentId (Match l name pats rhs maybeWheres) = do
    funScopeId <- getId
    argScopeId <- getId
    (names, scopes) <- getScopes (normal l) argScopeId rhs
    let argNames = nub $ concatMap patternVarNames pats
        argSpan = normal . foldr1 combSpanInfo . map ann $ pats
        funName = getName name
        use' = names \\ (funName : argNames)
        funScope =
          Scope
            { scopeId = funScopeId,
              scopeType = FunScope,
              effectiveIn = parent,
              definedIn = normal l,
              generate = [funName],
              use = [],
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
        argsScope =
          Scope
            { scopeId = argScopeId,
              scopeType = ArgScope,
              effectiveIn = normal l,
              definedIn = argSpan,
              generate = argNames,
              use = names \\ (funName : argNames),
              parentScope = funScopeId,
              topOrder = 0,
              constraints = []
            }
    return (names, [funScope, argsScope] ++ scopes)

instance HasScopes Binds where
  getScopes parent parentId (BDecls _ []) = return ([], [])
  getScopes parent parentId (BDecls l (decl : decls)) = do
    -- every x = y should generate its own scope
    (names1, scopes1) <- getScopes parent parentId decl
    (names2, scopes2) <- getScopes parent parentId (BDecls l decls)
    return (nub (names1 ++ names2), scopes1 ++ scopes2)
  getScopes _ _ _ = error "Implicit parameter is not supported"

instance HasScopes Rhs where
  getScopes parent parentId (UnGuardedRhs l exp) = getScopes parent parentId exp
  getScopes parent parentId (GuardedRhss srcInfo guaredRhss) = concatUnzip <$> mapM (getScopes parent parentId) guaredRhss

instance HasScopes GuardedRhs where
  getScopes parent parentId (GuardedRhs srcInfo stmts exp) = do
    (names1, guardScope) <- concatUnzip <$> mapM (getScopes parent parentId) stmts
    (names2, expScope) <- getScopes parent parentId exp
    return (nub (names1 ++ names2), guardScope ++ expScope)

instance HasScopes Alt where
  getScopes parent parentId (Alt l pat rhs maybeWheres) = do
    newScopeId <- getId
    (names, scopes) <- getScopes (normal l) newScopeId rhs
    let newNames = nub $ patternVarNames pat
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = CaseScope,
              effectiveIn = normal l,
              definedIn = normal l,
              generate = newNames,
              use = names \\ newNames,
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    return (names, newScope : scopes)

instance HasScopes FieldUpdate where
  getScopes parent parentId (FieldUpdate srcInfo _ e) = undefined
  getScopes _ _ _ = undefined

instance HasScopes QualStmt where
  getScopes parent parentId (QualStmt srcInfo stmt) = getScopes parent parentId stmt
  getScopes _ _ _ = error "Unsupported: TransformListComp"

instance HasScopes Stmt where
  getScopes parent parentId (Generator srcInfo pat e) = undefined
  getScopes parent parentId (LetStmt srcInfo binds) = undefined
  getScopes parent parentId (Qualifier srcInfo exp) = getScopes parent parentId exp
  getScopes _ _ _ = error "Unsupported stmt type"

instance HasScopes Exp where
  getScopes parent parentId (Var _ vname) = return ([getName vname], [])
  getScopes parent parentId (Con _ vname) = return ([getName vname], [])
  getScopes parent parentId (InfixApp l e1 op e2) = do
    (names1, scopes1) <- getScopes (normal l) parentId e1
    (names2, scopes2) <- getScopes (normal l) parentId e2
    let operatorName = getName op
    return (nub (operatorName : names1 ++ names2), scopes1 ++ scopes2)
  getScopes parent parentId (App l e1 e2) = do
    (names1, scopes1) <- getScopes (normal l) parentId e1
    (names2, scopes2) <- getScopes (normal l) parentId e2
    return (nub (names1 ++ names2), scopes1 ++ scopes2)
  getScopes parent parentId (NegApp l e) = getScopes (normal l) parentId e
  getScopes parent parentId (Lambda l pats e) = do
    newScopeId <- getId
    (names, scopes) <- getScopes (normal l) newScopeId e
    let gen' = nub (concatMap patternVarNames pats)
        use' = names \\ gen'
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = LambdaScope,
              effectiveIn = normal l,
              definedIn = normal l,
              generate = gen',
              use = use',
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    return (names, newScope : scopes)
  getScopes parent parentId (Let l binds e) = do
    newScopeId <- getId
    (names1, scopes1) <- getScopes (normal l) newScopeId binds
    (names2, scopes2) <- getScopes (normal l) newScopeId e
    let topLevelDecls = filter ((newScopeId ==) . parentScope) scopes1
        gen' = nub (concatMap generate topLevelDecls)
        use' = (names1 ++ names2) \\ gen'
        newScope =
          Scope
            { scopeId = newScopeId,
              scopeType = LetScope,
              effectiveIn = normal l,
              definedIn = normal l,
              generate = [],
              use = use',
              parentScope = parentId,
              topOrder = 0,
              constraints = []
            }
    return (names1 ++ names2, newScope : scopes1 ++ scopes2)
  getScopes parent parentId (If l e1 e2 e3) = concatUnzip <$> mapM (getScopes (normal l) parentId) [e1, e2, e3]
  getScopes parent parentId (Tuple l _ exps) = concatUnzip <$> mapM (getScopes (normal l) parentId) exps
  getScopes parent parentId (Paren l e) = getScopes (normal l) parentId e
  getScopes parent parentId (List l exps) = concatUnzip <$> mapM (getScopes (normal l) parentId) exps
  getScopes parent parentId (EnumFrom l e) = getScopes (normal l) parentId e
  getScopes parent parentId (EnumFromTo l e1 e2) = concatUnzip <$> mapM (getScopes (normal l) parentId) [e1, e2]
  getScopes parent parentId (EnumFromThen l e1 e2) = concatUnzip <$> mapM (getScopes (normal l) parentId) [e1, e2]
  getScopes parent parentId (EnumFromThenTo l e1 e2 e3) = concatUnzip <$> mapM (getScopes (normal l) parentId) [e1, e2, e3]
  getScopes parent parentId (Case l exp alts) = do
    (names1, scopes1) <- getScopes (normal l) parentId exp
    (names2, scopes2) <- concatUnzip <$> mapM (getScopes (normal l) parentId) alts
    return (nub (names1 ++ names2), scopes1 ++ scopes2)
  --- Support
  getScopes parent parentId (MultiIf srcInfo guardedRhss) = error "To Implement: MultiIf" -- TODO
  getScopes parent parentId (Do srcInfo stmts) = undefined
  getScopes parent parentId (MDo srcInfo stmts) = undefined
  getScopes parent parentId (UnboxedSum srcInfo _ _ exp) = undefined
  getScopes parent parentId (TupleSection srcInfo _ maybeExps) = undefined
  getScopes parent parentId (ParArray srcInfo exps) = undefined
  getScopes parent parentId (LeftSection l e op) = concatUnzip <$> mapM (getScopes (normal l) parentId) [e]
  getScopes parent parentId (RightSection l op e) = concatUnzip <$> mapM (getScopes (normal l) parentId) [e]
  getScopes parent parentId (RecConstr srcInfo _ fieldUpdates) = undefined
  getScopes parent parentId (RecUpdate srcInfo e fieldUpdates) = undefined
  getScopes parent parentId (ParArrayFromTo srcInfo e1 e2) = undefined
  getScopes parent parentId (ParArrayFromThenTo srcInfo e1 e2 e3) = undefined
  getScopes parent parentId (ListComp srcInfo e stmts) = undefined
  getScopes parent parentId (ParComp srcInfo e stmts) = undefined
  getScopes parent parentId (ParArrayComp srcInfo e stmts) = undefined
  getScopes parent parentId (ExpTypeSig (SrcSpanInfo ss _) e t) = undefined
  getScopes _ _ _ = return ([], [])

patternVarNames :: Show a => Pat a -> [String]
patternVarNames (PVar _ name) = [getName name]
patternVarNames (PNPlusK _ name _) = [getName name]
patternVarNames (PInfixApp _ p1 _ p2) = patternVarNames p1 ++ patternVarNames p2
patternVarNames (PApp _ _ ps) = concatMap patternVarNames ps
patternVarNames (PTuple _ _ ps) = concatMap patternVarNames ps
patternVarNames (PUnboxedSum _ _ _ p) = patternVarNames p
patternVarNames (PList _ ps) = concatMap patternVarNames ps
patternVarNames (PParen _ p) = patternVarNames p
patternVarNames (PRec _ _ pfs) = concatMap patternFieldVarNames pfs
patternVarNames (PAsPat _ name p) = getName name : patternVarNames p
patternVarNames (PIrrPat _ p) = patternVarNames p
patternVarNames (PatTypeSig _ p _) = patternVarNames p
patternVarNames PLit {} = []
patternVarNames PWildCard {} = []
patternVarNames p = error $ "Node: " ++ show p

patternFieldVarNames :: Show a => PatField a -> [String]
patternFieldVarNames (PFieldPat _ _ p) = patternVarNames p
patternFieldVarNames (PFieldPun _ qname) = [getName qname]
patternFieldVarNames _ = []

dataConNames :: QualConDecl l -> [String]
dataConNames (QualConDecl _ _ _ (ConDecl _ name _)) = [getName name]
dataConNames (QualConDecl _ _ _ (InfixConDecl _ _ name _)) = [getName name]
dataConNames (QualConDecl _ _ _ (RecDecl _ name fields)) = getName name : concatMap fieldNames fields

fieldNames :: FieldDecl l -> [String]
fieldNames (FieldDecl _ names _) = map getName names

class HasTypeVar f where
  getTypeVars :: f SrcSpanInfo -> [String]

instance HasTypeVar Type where
  getTypeVars (TyForall _ _ _ t) = getTypeVars t
  getTypeVars (TyCon _ _) = []
  getTypeVars (TyVar _ name) = [getName name]
  getTypeVars (TyFun _ t1 t2) = nub (getTypeVars t1 ++ getTypeVars t2)
  getTypeVars (TyTuple _ _ ts) = nub (concatMap getTypeVars ts)
  getTypeVars (TyUnboxedSum _ ts) = nub (concatMap getTypeVars ts)
  getTypeVars (TyList _ t) = getTypeVars t
  getTypeVars (TyParArray _ t) = getTypeVars t
  getTypeVars (TyApp _ t1 t2) = nub (getTypeVars t1 ++ getTypeVars t2)
  getTypeVars (TyParen _ t) = getTypeVars t
  getTypeVars (TyInfix _ t1 _ t2) = nub (getTypeVars t1 ++ getTypeVars t2)
  getTypeVars p = error ("Unsupported node type: " ++ show p)

instance HasTypeVar DeclHead where
  getTypeVars (DHead _ _) = []
  getTypeVars (DHInfix _ v _) = getTypeVars v
  getTypeVars (DHParen _ h) = getTypeVars h
  getTypeVars (DHApp _ h v) = nub (getTypeVars h ++ getTypeVars v)

instance HasTypeVar TyVarBind where
  getTypeVars (KindedVar _ name _) = [getName name]
  getTypeVars (UnkindedVar _ name) = [getName name]

instance HasTypeVar InstRule where
  getTypeVars (IRule l _ _ insthead) = getTypeVars insthead
  getTypeVars (IParen _ irule) = getTypeVars irule

instance HasTypeVar InstHead where
  getTypeVars (IHCon _ _) = []
  getTypeVars (IHInfix _ t _) = getTypeVars t
  getTypeVars (IHParen _ ih) = getTypeVars ih
  getTypeVars (IHApp _ ih t) = nub (getTypeVars ih ++ getTypeVars t)

class RangeLike a where
  within :: a -> a -> Bool

instance RangeLike SrcSpan where
  within
    (SrcSpan f1 startl1 startC1 endL1 endC1)
    (SrcSpan f2 startl2 startC2 endL2 endC2) =
      let sameFile = f1 == f2
          startAfter
            | startl1 > startl2 = True
            | startl1 == startl2 && startC1 >= startC2 = True
            | otherwise = False
          endBefore
            | endL1 < endL2 = True
            | endL1 == endL2 && endC1 <= endC2 = True
            | otherwise = False
       in sameFile && startAfter && endBefore

instance RangeLike ScopeRange where
  within _ Global = True
  within Global _ = False
  within
    (Normal srcSpan1)
    (Normal srcSpan2) = srcSpan1 `within` srcSpan2

uniqueName :: Int -> String -> String
uniqueName scpId v = v ++ "." ++ show scpId

allNames :: [Scope] -> [String]
allNames = concatMap (\scp -> map (uniqueName (scopeId scp)) (generate scp))

smallestDefiningScope :: [Scope] -> SrcSpanInfo -> Scope
smallestDefiningScope allScopes srcspaninfo =
  let scrrange = normal srcspaninfo
      allContainingScopes = filter (\s -> scrrange `within` definedIn s) allScopes
      smallest =
        if null allContainingScopes
          then error $ "No bounding scope for : " ++ show srcspaninfo
          else
            foldr
              ( \scp1 scp2 ->
                  if definedIn scp1 `within` definedIn scp2
                    then scp1
                    else scp2
              )
              (head allContainingScopes)
              allContainingScopes
   in smallest

smallestBoundingScope :: [Scope] -> Maybe ScopeType -> String -> SrcSpan -> Maybe Scope
smallestBoundingScope scopes scpType v sp =
  let isContaining v sp Nothing (Scope scpId _ eff _ gen _ _ _ _) =
        v `elem` gen && sp `within` eff
      isContaining v sp (Just t) (Scope scpId scpTy eff _ gen _ _ _ _) =
        v `elem` gen && t == scpTy && sp `within` eff
      boundingScopes = filter (isContaining v (Normal sp) scpType) scopes
      smallest =
        if null boundingScopes
          then Nothing
          else
            Just $
              foldr
                ( \scp1 scp2 ->
                    if effectiveIn scp1 `within` effectiveIn scp2
                      then scp1
                      else scp2
                )
                (head boundingScopes)
                boundingScopes
   in smallest

uniqueNameFromBinding :: [Scope] -> Maybe ScopeType -> String -> SrcSpan -> String
uniqueNameFromBinding scopes scpType v sp =
  uniqueName (scopeId . fromJust $ smallestBoundingScope scopes scpType v sp) v

findScopeByName :: [Scope] -> String -> Maybe Scope
findScopeByName scopes name =
  let scpId = (read . reverse . takeWhile (/= '.') . reverse $ name) :: Int
  in find ((== scpId) . scopeId) scopes

parentScopesUntil :: Scope -> [Scope] -> Int -> [Scope]
parentScopesUntil scp scopes n =
  let go :: [Scope] -> [Scope] -> Int -> [Scope]
      go allScopes [] _ = error "No initial scope"
      go allScopes (s : ss) m
        | parentScope s <= m = s : ss
        | Just s' <- find ((== parentScope s) . scopeId) allScopes = go allScopes ([s', s] ++ ss) m
        | otherwise = error ("No parent scope: " ++ show s)
   in reverse (go scopes [scp] n)

sortScopes :: Int -> [Scope] -> [Scope]
sortScopes start scopes =
  let top = topSort (scopesToNodes scopes) (scopesToEdges start scopes)
   in case top of
        Nothing -> error "Scope ordering failed"
        Just sorted -> map (\s -> s {topOrder = fromJust (elemIndex (scopeId s) sorted)}) scopes

scopesToNodes :: [Scope] -> [Int]
scopesToNodes = map scopeId

scopesToEdges :: Int -> [Scope] -> [(Int, Int)]
scopesToEdges start scopes =
  let go :: [Scope] -> [Scope] -> [(Int, Int)]
      go allScopes [] = []
      go allScopes (s : ss) =
        let parentEdges = ([(parentScope s, scopeId s) | parentScope s /= start])
            dependencies = use s
            parents = parentScopesUntil s allScopes start
            global = filter ((== Global) . effectiveIn) allScopes \\ parents
            siblings = filter ((== parentScope s) . parentScope) allScopes
            searchables = nub (siblings ++ global)
            dependencyScopes = mapMaybe (\dep -> find ((dep `elem`) . generate) searchables) dependencies
            dependencyEdges = map (\scp -> (scopeId s, scopeId scp)) dependencyScopes
         in -- trace (
            --     "\nFor scope: " ++ show s ++
            --     "\nParents" ++ show (scopesIds parents) ++
            --     "\nSearchables" ++ show (scopesIds searchables) ++
            --     "\nAdd parent edge: " ++ show parentEdges  ++
            --     "\nAdd dependency edges: " ++ show dependencyEdges) $
            -- parentEdges ++
            dependencyEdges ++ go allScopes ss
   in nub (go scopes scopes)

getConstraints :: Type a -> [(String, String)]
getConstraints (TyForall _ _ maybecontext _) =
  case maybecontext of
    Just (CxSingle _ assert) -> go assert
    Just (CxTuple _ asserts) -> concatMap go asserts
    _ -> []
  where
    go :: Asst a -> [(String, String)]
    go (TypeA _ (TyApp _ (TyCon _ con) (TyVar _ v))) = [(getName v, getName con)]
    go (ParenA _ asst) = go asst
    go _ = []
getConstraints _ = []

processFile :: String -> IO ()
processFile filepath = do
  contents <- readFile filepath
  let pResult = parseModuleWithMode parseMode contents
      parseMode = defaultParseMode {parseFilename = filepath}
  case pResult of
    ParseOk hModule -> do
      print "OK"
      let (names, scopes) = evalState (getScopes Global 0 hModule) 1
      -- print names
      mapM_ print scopes
    ParseFailed srcLoc message ->
      putStrLn $
        unlines
          [ prettyPrint srcLoc,
            message
          ]

main :: IO ()
main = do
  args <- getArgs
  let path = head args
  processFile path
