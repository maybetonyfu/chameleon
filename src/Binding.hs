module Binding where

import Data.List
import Data.Maybe
import Data.Set (Set)
import qualified Data.Set as Set
import Debug.Trace
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
  | PatternScope
  | CaseScope
  | LetScope
  | GeneratorScope
  | AdtScope
  | RecordFieldScope
  | TypeScope
  | OperatorScope
  | TypeSigScope
  deriving (Show, Eq, Ord)

data ScopeRange = Normal SrcSpan | Global deriving (Show, Eq, Ord)

data Binding = Binding
  { scopeRange :: ScopeRange,
    scopeType :: ScopeType,
    symbol :: String
  }
  deriving (Show, Eq, Ord)

-- instance Ord Binding where
--   (Binding sp t s) <= (Binding sp' t' s')
--     | sp `isWithin` sp' = True
--     | sp /= sp' = sp <= sp'
--     | s /= s' = s <= s'
--     | otherwise = t <= t'

-- set operation shorthans
setConcatMap :: Ord b => (a -> Set b) -> [a] -> Set b
setConcatMap f = Set.unions . map f

setMapFromList :: Ord b => (a -> b) -> [a] -> Set b
setMapFromList f = Set.fromList . map f

sp :: SrcSpanInfo -> SrcSpan
sp = srcInfoSpan

noSpan = srcInfoSpan noSrcSpan

processFile :: String -> IO ()
processFile filepath = do
  contents <- readFile filepath
  let pResult = parseModuleWithMode parseMode contents
      parseMode = defaultParseMode {parseFilename = filepath}
  case pResult of
    ParseOk hModule -> do
      print "OK"
      let bindings = getBindings Global hModule
      mapM_ print bindings
    ParseFailed srcLoc message ->
      putStrLn $
        unlines
          [ prettyPrint srcLoc,
            message
          ]

class HasBindings f where
  getBindings :: ScopeRange -> f SrcSpanInfo -> Set Binding

instance HasBindings Module where
  getBindings parent (Module srcspan _ _ _ decls) = setConcatMap (getBindings parent) decls
  getBindings _ _ = error "Not a module"

instance HasBindings Decl where
  getBindings parent p@(PatBind srcspan pat rhs maybeWheres) =
    let scope = parent
        names = patternVarNames pat
        bindings = setMapFromList (Binding parent VarScope) names
        rhsBindings = getBindings (Normal . sp $ srcspan) rhs
        wherebinds = case maybeWheres of
          Nothing -> Set.empty
          Just wheres -> getBindings (Normal . sp $ srcspan) wheres
     in Set.unions [bindings, wherebinds, rhsBindings]
  getBindings parent (FunBind srcspan matches) =
    let firstMatch = head matches
        sym = getName firstMatch
        binding = Binding {scopeRange = parent, scopeType = FunScope, symbol = sym}
        matchBindings = setConcatMap (getBindings (Normal . sp $ srcspan)) matches
     in Set.insert binding matchBindings
  getBindings parent (DataDecl (SrcSpanInfo sp _) _ _ declHead conDecls _) =
    Set.union (setConcatMap (getBindings parent) conDecls) (getBindings (Normal sp) declHead)
  getBindings parent (TypeSig (SrcSpanInfo ss _) names typeDef) =
    let typeVars = getBindings (Normal ss) typeDef
     in -- fName = Set.fromList $ map (Binding parent TypeSigScope . getName) names
        typeVars
  getBindings parent (InstDecl (SrcSpanInfo sp _) _ instRule maybeInstDecal) =
    getBindings (Normal sp) instRule
  getBindings parent (ClassDecl (SrcSpanInfo sp _) _ head fundeps maybeclassdecls) =
    let headBindings = getBindings (Normal sp) head
        headBindingSymbols = Set.map symbol headBindings
        declBindings = case maybeclassdecls of
          Nothing -> Set.empty
          Just decls -> setConcatMap (getBindings Global) decls

        -- It is important to exclude the type vars in function declaration here
        filteredDeclBindings =
          Set.filter (\(Binding sc ty sy) -> sy `Set.notMember` headBindingSymbols) declBindings
     in -- For exampel class X a where x :: a -> b
        -- We will want the scope of b to remain  (a -> b) but the scope of a to be the whole decl (class X ... a -> b)
        headBindings `Set.union` filteredDeclBindings
  getBindings parent _ = Set.empty

instance HasBindings InstRule where
  getBindings parent (IRule _ _ _ instHead) = getBindings parent instHead
  getBindings parent (IParen _ iRule) = getBindings parent iRule

instance HasBindings InstHead where
  getBindings parent (IHCon _ _) = Set.empty
  getBindings parent (IHInfix _ t _) = getBindings parent t
  getBindings parent (IHParen _ h) = getBindings parent h
  getBindings parent (IHApp _ h t) =
    getBindings parent h `Set.union` getBindings parent t

instance HasBindings ClassDecl where
  getBindings parent (ClsDecl _ (TypeSig (SrcSpanInfo ss _) names typeDef)) =
    let typeVars = getBindings (Normal ss) typeDef
        fName = Set.fromList $ map (Binding parent TypeSigScope . getName) names
     in fName `Set.union` typeVars
  getBindings _ _ = error "Unsupported types of method declaration"

instance HasBindings DeclHead where
  getBindings parent (DHead _ _) = Set.empty
  getBindings parent (DHParen _ dh) = getBindings parent dh
  getBindings parent (DHApp _ dh varbind) = Set.union (getBindings parent dh) (getBindings parent varbind)
  getBindings parent (DHInfix _ varbind _) = getBindings parent varbind

instance HasBindings TyVarBind where
  getBindings parent (KindedVar _ name _) =
    Set.singleton $ Binding {scopeRange = parent, scopeType = TypeScope, symbol = getName name}
  getBindings parent (UnkindedVar _ name) =
    Set.singleton $ Binding {scopeRange = parent, scopeType = TypeScope, symbol = getName name}

instance HasBindings Type where
  getBindings parent (TyForall _ _ _ t) = getBindings parent t
  getBindings parent (TyVar _ name) = Set.singleton $ Binding parent TypeScope (getName name)
  getBindings parent (TyFun _ t1 t2) = Set.union (getBindings parent t1) (getBindings parent t2)
  getBindings parent (TyTuple _ _ ts) = setConcatMap (getBindings parent) ts
  getBindings parent (TyUnboxedSum _ ts) = setConcatMap (getBindings parent) ts
  getBindings parent (TyList _ t) = getBindings parent t
  getBindings parent (TyParArray _ t) = getBindings parent t
  getBindings parent (TyApp _ t1 t2) = Set.union (getBindings parent t1) (getBindings parent t2)
  getBindings parent (TyParen _ t) = getBindings parent t
  getBindings parent (TyInfix _ t1 _ t2) = Set.union (getBindings parent t1) (getBindings parent t2)
  getBindings _ _ = Set.empty

instance HasBindings QualConDecl where
  getBindings parent (QualConDecl _ _ _ constructor) = getBindings parent constructor

instance HasBindings ConDecl where
  getBindings parent (ConDecl _ name _) = Set.singleton (Binding Global AdtScope (getName name))
  getBindings parent (InfixConDecl _ _ name _) = Set.singleton $ Binding Global AdtScope (getName name)
  getBindings parent (RecDecl _ name fields) = Set.insert (Binding Global AdtScope (getName name)) (setConcatMap (getBindings parent) fields)

instance HasBindings FieldDecl where
  getBindings parent (FieldDecl _ names _) = setMapFromList (Binding Global RecordFieldScope . getName) names

instance HasBindings Match where
  getBindings parent (Match srcspan name pats rhs maybeWheres) =
    let patternNames = concatMap patternVarNames pats
        patBindings = setMapFromList (Binding (Normal . sp $ srcspan) ArgScope) patternNames
        rhsBindings = getBindings (Normal $ sp srcspan) rhs
        whereBindings = case maybeWheres of
          Nothing -> Set.empty
          Just wheres -> getBindings (Normal $ sp srcspan) wheres
     in Set.unions [patBindings, whereBindings, rhsBindings]
  getBindings parent (InfixMatch srcInfo pat name pats rhs maybeWheres) =
    getBindings parent (Match srcInfo name (pat : pats) rhs maybeWheres)

instance HasBindings Binds where
  getBindings parent (BDecls _ decls) = setConcatMap (getBindings parent) decls
  getBindings _ _ = error "Implicit parameter is not supported"

instance HasBindings Rhs where
  getBindings parent (UnGuardedRhs srcInfo exp) = getBindings (Normal $ sp srcInfo) exp
  getBindings parent (GuardedRhss srcInfo guaredRhss) = setConcatMap (getBindings parent) guaredRhss

instance HasBindings GuardedRhs where
  getBindings parent (GuardedRhs srcInfo stmts exp) =
    let expBindings = getBindings (Normal $ sp srcInfo) exp
        patGuardBindinngs = setConcatMap (getBindings parent) stmts
     in Set.union expBindings patGuardBindinngs

instance HasBindings Alt where
  getBindings parent (Alt srcInfo pat rhs maybeWheres) =
    let srcspan = sp srcInfo
        whereBindings = case maybeWheres of
          Nothing -> Set.empty
          Just wheres -> getBindings (Normal srcspan) wheres
        patternNames = patternVarNames pat
        patBindings = setMapFromList (Binding (Normal srcspan) CaseScope) patternNames
        rhsBindings = getBindings (Normal srcspan) rhs
     in Set.unions [whereBindings, patBindings, rhsBindings]

instance HasBindings FieldUpdate where
  getBindings parent (FieldUpdate srcInfo _ e) = getBindings (Normal $ sp srcInfo) e
  getBindings _ _ = Set.empty

instance HasBindings QualStmt where
  getBindings parent (QualStmt srcInfo stmt) = getBindings parent stmt
  getBindings _ _ = error "Unsupported: TransformListComp"

instance HasBindings Stmt where
  getBindings parent (Generator srcInfo pat e) =
    let patternNames = patternVarNames pat
        patBindings = setMapFromList (Binding parent GeneratorScope) patternNames
        expBindings = getBindings (Normal $ sp srcInfo) e
     in Set.union patBindings expBindings
  getBindings parent (LetStmt srcInfo binds) = getBindings parent binds
  getBindings parent (Qualifier srcInfo exp) = getBindings (Normal $ sp srcInfo) exp
  getBindings _ _ = error "Unsupported stmt type"

instance HasBindings Exp where
  getBindings parent (InfixApp srcInfo e1 _ e2) = getBindings (Normal $ sp srcInfo) e1 `Set.union` getBindings (Normal $ sp srcInfo) e2
  getBindings parent (App srcInfo e1 e2) = getBindings (Normal $ sp srcInfo) e1 `Set.union` getBindings (Normal $ sp srcInfo) e2
  getBindings parent (NegApp srcInfo e) = getBindings (Normal $ sp srcInfo) e
  getBindings parent (Lambda srcInfo pats e) =
    let patternNames = concatMap patternVarNames pats
        bindings = setMapFromList (Binding (Normal . sp $ srcInfo) LambdaScope) patternNames
     in bindings `Set.union` getBindings (Normal $ sp srcInfo) e
  getBindings parent (Let srcInfo binds e) =
    let bindings = getBindings (Normal $ sp srcInfo) binds
     in bindings `Set.union` getBindings (Normal $ sp srcInfo) e
  getBindings parent (If srcInfo e1 e2 e3) =
    let srcspan = sp srcInfo
     in getBindings (Normal srcspan) e1 `Set.union` getBindings (Normal srcspan) e2 `Set.union` getBindings (Normal srcspan) e3
  getBindings parent (MultiIf srcInfo guardedRhss) = error "To Implement: MultiIf" -- TODO
  getBindings parent (Case srcInfo exp alts) =
    let srcspan = sp srcInfo
        altBindings = setConcatMap (getBindings (Normal srcspan)) alts
        caseBindings = getBindings (Normal srcspan) exp
     in altBindings `Set.union` caseBindings
  getBindings parent (Do srcInfo stmts) = setConcatMap (getBindings (Normal $ sp srcInfo)) stmts
  getBindings parent (MDo srcInfo stmts) = setConcatMap (getBindings (Normal $ sp srcInfo)) stmts
  getBindings parent (Tuple srcInfo _ exps) = setConcatMap (getBindings (Normal $ sp srcInfo)) exps
  getBindings parent (UnboxedSum srcInfo _ _ exp) = getBindings (Normal $ sp srcInfo) exp
  getBindings parent (TupleSection srcInfo _ maybeExps) =
    let exps = catMaybes maybeExps
     in setConcatMap (getBindings (Normal $ sp srcInfo)) exps
  getBindings parent (List srcInfo exps) = setConcatMap (getBindings (Normal $ sp srcInfo)) exps
  getBindings parent (ParArray srcInfo exps) = setConcatMap (getBindings (Normal $ sp srcInfo)) exps
  getBindings parent (Paren srcInfo e) = getBindings (Normal $ sp srcInfo) e
  getBindings parent (LeftSection srcInfo e _) = getBindings (Normal $ sp srcInfo) e
  getBindings parent (RightSection srcInfo _ e) = getBindings (Normal $ sp srcInfo) e
  getBindings parent (RecConstr srcInfo _ fieldUpdates) = setConcatMap (getBindings (Normal $ sp srcInfo)) fieldUpdates
  getBindings parent (RecUpdate srcInfo e fieldUpdates) =
    let filedBindings = setConcatMap (getBindings (Normal $ sp srcInfo)) fieldUpdates
        recordBindings = getBindings (Normal $ sp srcInfo) e
     in filedBindings `Set.union` recordBindings
  getBindings parent (EnumFrom srcInfo e) = getBindings (Normal $ sp srcInfo) e
  getBindings parent (EnumFromTo srcInfo e1 e2) = setConcatMap (getBindings (Normal $ sp srcInfo)) [e1, e2]
  getBindings parent (EnumFromThen srcInfo e1 e2) = setConcatMap (getBindings (Normal $ sp srcInfo)) [e1, e2]
  getBindings parent (EnumFromThenTo srcInfo e1 e2 e3) = setConcatMap (getBindings (Normal $ sp srcInfo)) [e1, e2, e3]
  getBindings parent (ParArrayFromTo srcInfo e1 e2) = setConcatMap (getBindings (Normal $ sp srcInfo)) [e1, e2]
  getBindings parent (ParArrayFromThenTo srcInfo e1 e2 e3) = setConcatMap (getBindings (Normal $ sp srcInfo)) [e1, e2, e3]
  getBindings parent (ListComp srcInfo e stmts) =
    let expBindings = getBindings (Normal $ sp srcInfo) e
        stmtBindings = setConcatMap (getBindings (Normal $ sp srcInfo)) stmts
     in expBindings `Set.union` stmtBindings
  getBindings parent (ParComp srcInfo e stmts) =
    let expBindings = getBindings (Normal $ sp srcInfo) e
        stmts' = concat stmts
        stmtBindings = setConcatMap (getBindings (Normal $ sp srcInfo)) stmts'
     in expBindings `Set.union` stmtBindings
  getBindings parent (ParArrayComp srcInfo e stmts) =
    let expBindings = getBindings (Normal $ sp srcInfo) e
        stmts' = concat stmts
        stmtBindings = setConcatMap (getBindings (Normal $ sp srcInfo)) stmts'
     in expBindings `Set.union` stmtBindings
  getBindings parent (ExpTypeSig (SrcSpanInfo ss _) e t) = getBindings (Normal ss) e `Set.union` getBindings (Normal . sp . ann $ t) t
  getBindings _ _ = Set.empty

instance HasBindings QOp where
  getBindings parent (QVarOp _ qname) = Set.singleton (Binding parent OperatorScope (getName qname))
  getBindings parent (QConOp _ qname) = Set.singleton (Binding parent OperatorScope (getName qname))

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

uniqueName :: (Binding, Int) -> String
uniqueName (binding, num) = symbol binding ++ "." ++ show num

allNames :: [(Binding, Int)] -> [String]
allNames = map uniqueName

isWithin :: ScopeRange -> ScopeRange -> Bool
isWithin _ Global = True
isWithin Global _ = False
isWithin
  (Normal (SrcSpan f1 startl1 startC1 endL1 endC1))
  (Normal (SrcSpan f2 startl2 startC2 endL2 endC2)) =
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

smallestContainingBinding :: [(Binding, Int)] -> Maybe ScopeType -> String -> SrcSpan -> (Binding, Int)
smallestContainingBinding bindings scope symbol sp =
  let isContaining symbol sp Nothing (Binding sp' _ symbol') = symbol == symbol' && (sp `isWithin` sp')
      isContaining symbol sp (Just scope) (Binding sp' sc' symbol') = symbol == symbol' && (sp `isWithin` sp') && scope == sc'
      bindings' = filter (isContaining symbol (Normal sp) scope . fst) bindings
      binding =
        if null bindings'
          then error $ "Variable in scope: " ++ symbol
          else
            foldr
              ( \(a, n) (b, m) ->
                  if scopeRange a `isWithin` scopeRange b
                    then (a, n)
                    else (b, m)
              )
              (head bindings')
              bindings'
   in binding

uniqueNameFromBinding :: [(Binding, Int)] -> Maybe ScopeType -> String -> SrcSpan -> String
uniqueNameFromBinding bindings scope symbol sp = uniqueName (smallestContainingBinding bindings scope symbol sp)

moduleBindings :: HasBindings a => a SrcSpanInfo -> [(Binding, Int)]
moduleBindings hModule =
  let b = getBindings Global hModule
   in zip (Set.toAscList b) (take (Set.size b) [0 ..])

main :: IO ()
main = do
  args <- getArgs
  let path = head args
  processFile path
