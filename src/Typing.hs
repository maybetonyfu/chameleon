module Typing where

import Constraint
import Control.Lens hiding (List)
import Control.Monad
import Control.Monad.Trans.State.Lazy
import Data.List
import Data.Maybe
import Data.Set (Set)
import qualified Data.Map as Map
import qualified Data.Set as Set
import Debug.Trace
import FieldOrdering hiding (main, processFile)
import Instance hiding (main, processFile)
import Kanren hiding (Var)
import Language.Haskell.Exts.Parser
import Language.Haskell.Exts.Pretty
import Language.Haskell.Exts.SrcLoc
import Language.Haskell.Exts.Syntax
import Nameable
import Scope hiding (main, processFile)
import System.Environment
import qualified Kanren as KR
import Agda.Auto.Syntax (sub)

data LabeledGoal = Label
  { goalNum :: Int,
    terms :: (Term, Term),
    instanciation :: [(Term, Term)],
    reason :: String,
    loc :: SrcSpan,
    goal :: Goal
  }

instance Show LabeledGoal where
  show (Label n terms instan reason _ g) = show n ++ " | " ++ show terms ++ " | Instanciate:" ++ show instan ++ " | " ++ reason

instance Eq LabeledGoal where
  (Label n1 terms1 _ reason1 loc1 g1) == (Label n2 terms2 _ reason2 loc2 g2) =
    n1 == n2 && terms1 == terms2 && reason1 == reason2 && loc1 == loc2

unlabel :: LabeledGoal -> Goal
unlabel (Label _ _ _ _ _ g) = g

type SolveState = State (Int, [Scope], [FieldOrdering], [(String, SrcSpan)])

freshVar :: SolveState Term
freshVar = do
  (n, bindings, fieldOrdering, loadE) <- get
  put (n + 1, bindings, fieldOrdering, loadE)
  return . var $ "fresh." ++ show n

freshVarN :: Int -> SolveState [Term]
freshVarN m = do
  (n, bindings, fieldOrdering, loadE) <- get
  put (n + m, bindings, fieldOrdering, loadE)
  return . map (var . ("fresh." ++) . show) . take m $ [n ..]

varByNameWithScope :: (Nameable a, Annotated a) => Maybe ScopeType -> a SrcSpanInfo -> SolveState (Maybe Term)
varByNameWithScope scpType namable = do
  (n, scopes, fo, loadE) <- get
  let scp = smallestBoundingScope scopes scpType (getName namable) (sp (ann namable))
  case scp of
    Nothing -> do
      put (n, scopes, fo, (getName namable, sp (ann namable)) : loadE)
      return Nothing
    Just scp' -> do
      let uniqueVarName = uniqueName (scopeId scp') (getName namable)
      let requirements = map (view _2) . filter ((== getName namable) . view _1) $ constraints scp'
      return $ Just (KR.Var uniqueVarName (map Need requirements))

varsByNamesWithScope :: (Nameable a, Annotated a) => Maybe ScopeType -> [a SrcSpanInfo] -> SolveState [Maybe Term]
varsByNamesWithScope scpType namables = mapM (varByNameWithScope scpType) namables

varByName :: (Nameable a, Annotated a) => a SrcSpanInfo -> SolveState (Maybe Term)
varByName = varByNameWithScope Nothing

scopeTypeByName :: (Nameable a, Annotated a) => a SrcSpanInfo -> SolveState (Maybe ScopeType)
scopeTypeByName namable = do
  scopes <- view _2 <$> get
  let scp = smallestBoundingScope scopes Nothing (getName namable) (sp (ann namable))
  return (fmap scopeType scp)

varsByNames :: (Nameable a, Annotated a) => [a SrcSpanInfo] -> SolveState [Maybe Term]
varsByNames = varsByNamesWithScope Nothing

getGoalOrder :: SrcSpanInfo -> SolveState Int
getGoalOrder ssi = do
  scopes <- view _2 <$> get
  let scp = smallestDefiningScope scopes ssi
  return (topOrder scp)

class MatchTerm a where
  matchTerm :: Term -> a SrcSpanInfo -> SolveState [LabeledGoal]

instance MatchTerm Module where
  matchTerm _ (Module srcSpan moduleHead pragma impts decls) = concat <$> mapM (matchTerm Unit) decls
  matchTerm _ _ = undefined

instance MatchTerm Decl where
  matchTerm _ node@(TypeDecl l typehead typedef) = do
    v <- freshVar
    g1 <- matchTerm v typehead
    g2 <- matchTerm v typedef
    return (g1 ++ g2)
  matchTerm _ node@(PatBind srcspan pat rhs maybeWheres) = do
    v1 <- freshVar
    g1 <- matchTerm v1 pat
    v2 <- freshVar
    g2 <- matchTerm v2 rhs
    let label = Label 0 (v1, v2) [] "Defined" (sl pat)
    return (g1 ++ g2 ++ [label $ v1 === v2])
  matchTerm _ (TypeSig (SrcSpanInfo sp _) names typeDef) = do
    mbTermVars <- varsByNames names
    if all isJust mbTermVars
      then concat <$> mapM (\t -> matchTerm t typeDef) (catMaybes mbTermVars)
      else return []
  matchTerm _ (DataDecl l dataOrNew maybeContext declHead conDecls derivings) = do
    typeName <- freshVar
    gHead <- matchTerm typeName declHead
    gDataCons <- concat <$> mapM (matchTerm typeName) conDecls
    return $ gDataCons ++ gHead
  matchTerm _ (FunBind _ matches) = concat <$> mapM (matchTerm Unit) matches
  matchTerm _ (ClassDecl (SrcSpanInfo sp _) maybectx dhead _ maybeclassdecls) = do
    -- "class X' a => X a where x :: a -> a"  will generate
    -- 1. var x === funOf [a, a] where
    gClassDecls <- fmap concat . mapM (matchTerm Unit) . concat . maybeToList $ maybeclassdecls
    -- 2. a has X
    let getTypeClassName :: DeclHead a -> String
        getTypeClassName (DHApp _ (DHead _ name) _) = getName name
        getTypeClassName _ = error "Malformed class head"
        getTypeClassVar :: DeclHead a -> Name a
        getTypeClassVar (DHApp _ (DHead _ _) (UnkindedVar _ name)) = name
        getTypeClassVar _ = error "Malformed class head"
        typeClassName = getTypeClassName dhead
        typeClassVarString = getTypeClassVar dhead
    vTypeVar <- varByName typeClassVarString
    -- let gInstance = hasInstance constraints typeClassName vTypeVar
    -- 3. (Optional) a `haso` X'

    return gClassDecls
  matchTerm _ (InstDecl l _ _ maybeInstaDecls) = return []
  matchTerm _ node = error (show node ++ " is not supported")

instance MatchTerm ClassDecl where
  matchTerm term (ClsDecl _ decl) = matchTerm term decl
  matchTerm _ _ = error "Unsupported class methods declaration types"

instance MatchTerm DeclHead where
  matchTerm term node@(DHead l name) = do
    scopeType <- scopeTypeByName name
    case scopeType of
      Just TypeAliasScope -> do
        maybeAliasVar <- varByName name
        case maybeAliasVar of
          Nothing -> return []
          Just aliasVar -> do
            let label = Label 0 (term, aliasVar) [] "Annotated" (sl node)
            return [label (term === aliasVar)]
      _ -> do
        let typeTerm = atom (getName name)
        let label = Label 0 (term, typeTerm) [] "Annotated" (sl node)
        return [label (term === typeTerm)]
  matchTerm term (DHInfix l typeVar name) = matchTerm term (DHApp l (DHead (ann name) name) typeVar)
  matchTerm term (DHParen l declHead) = matchTerm term declHead
  matchTerm term node@(DHApp l declHead typeVar) = do
    vHead <- freshVar
    gHead <- matchTerm vHead declHead
    mbTypeVar <- varByName typeVar
    case mbTypeVar of
      Nothing -> return []
      Just vTypeVar -> do
        let label = Label 0 (term, pair vHead vTypeVar) [] "Annotated" (sl node)
        return (label (term === pair vHead vTypeVar) : gHead)

instance MatchTerm QualConDecl where
  matchTerm term (QualConDecl _ _ _ conDecl) = matchTerm term conDecl

instance MatchTerm ConDecl where
  matchTerm term node@(ConDecl l name types) = do
    mbDataCon <- varByName name
    case mbDataCon of
      Nothing -> return []
      Just dataCon -> do
        args <- freshVarN (length types)
        gArgs <- concat <$> zipWithM matchTerm args types

        let label = Label 0 (dataCon, funOf (args ++ [term])) [] "Defined" (sl node)
        return $ gArgs ++ [label $ dataCon === funOf (args ++ [term])]
  matchTerm term (RecDecl l name fields) = do
    fieldsOrderings <- view _3 <$> get
    let flatFileds = concatMap (\(FieldDecl _ names typeDef) -> map (\n -> (getName n, typeDef)) names) fields
        orderedFields = sortOn (\(n, _) -> fromJust . lookup n $ fieldsOrderings) flatFileds
    g1 <- concat <$> mapM (matchTerm term) fields
    g2 <- matchTerm term (ConDecl l name (map snd orderedFields))
    return $ g1 ++ g2
  matchTerm term InfixConDecl {} = error "Infix con decl not supported"

instance MatchTerm FieldDecl where
  matchTerm term node@(FieldDecl _ names typeDef) = do
    mbFiledVars <- varsByNames names
    if all isJust mbFiledVars
      then do
        let filedVars = catMaybes mbFiledVars
        typeVar <- freshVar
        gTypeVar <- matchTerm typeVar typeDef
        let label = \t -> Label 0 (funOf [term, typeVar], t) [] "Defined" (sl node)
        let gs = map (\v -> label v (funOf [term, typeVar] === v)) filedVars
        return $ gTypeVar ++ gs
      else return []

instance MatchTerm Type where
  matchTerm term node@(TyVar (SrcSpanInfo sp _) name) = do
    mbTypeVar <- varByName name
    case mbTypeVar of
      Nothing -> return []
      Just typeVar -> do
        let label = Label 0 (typeVar, term) [] "Annotated" (sl node)
        return [label $ typeVar === term]
  matchTerm term node@(TyCon _ qname) = do
    scopeType <- scopeTypeByName qname
    case scopeType of
      Just TypeAliasScope -> do
        mbAliasVar <- varByName qname
        case mbAliasVar of
          Nothing -> return []
          Just aliasVar -> do
            let label = Label 0 (term, aliasVar) [] "Annotated" (sl node)
            return [label $ term === aliasVar]
      _ -> do
        let label = Label 0 (term, atom (getName qname)) [] "Annotated" (sl node)
        return [label $ term === atom (getName qname)]
  matchTerm term (TyParen _ t) = matchTerm term t
  matchTerm term node@(TyApp _ t1 t2) = do
    v1 <- freshVar
    v2 <- freshVar
    g1 <- matchTerm v1 t1
    g2 <- matchTerm v2 t2

    let label = Label 0 (term, fromList [v1, v2]) [] "Annotated" (sl node)
    return $ [label $ term === fromList [v1, v2]] ++ g1 ++ g2
  matchTerm term node@(TyList _ t) = do
    v <- freshVar
    g <- matchTerm v t

    let label = Label 0 (term, lstOf v) [] "Annotated" (sl node)
    return $ label (term === lstOf v) : g
  matchTerm term node@(TyTuple _ _ ts) = do
    args <- freshVarN (length ts)
    tArgs <- concat <$> zipWithM matchTerm args ts

    let label = Label 0 (term, tupOf args) [] "Annotated" (sl node)
    return $ label (term === tupOf args) : tArgs
  matchTerm term (TyUnboxedSum l ts) = matchTerm term (TyTuple l Boxed ts)
  matchTerm term node@(TyFun _ t1 t2) = do
    v1 <- freshVar
    v2 <- freshVar
    g1 <- matchTerm v1 t1
    g2 <- matchTerm v2 t2

    let label = Label 0 (term, funOf [v1, v2]) [] "Annotated" (sl node)
    return $ [label $ term === funOf [v1, v2]] ++ g1 ++ g2
  matchTerm term (TyForall _ _ _ t) = matchTerm term t
  matchTerm _ t = error $ "Unsupported type: " ++ show t

instance MatchTerm Rhs where
  matchTerm term (UnGuardedRhs _ exp) = matchTerm term exp
  matchTerm term (GuardedRhss _ guaredRhss) = concat <$> mapM (matchTerm term) guaredRhss

instance MatchTerm GuardedRhs where
  matchTerm term (GuardedRhs (SrcSpanInfo sp _) stmts exp) = do
    g1 <- matchTerm term exp
    g2 <- concat <$> mapM (matchTerm (atom "Bool")) stmts
    return $ g1 ++ g2

instance MatchTerm Match where
  matchTerm term node@(Match (SrcSpanInfo sp _) name pats rhs maybeWheres) = do
    mbFunVar <- varByName name
    case mbFunVar of
      Nothing -> return []
      Just funVar ->  do
        gWheres <- concat <$> mapM (matchTerm Unit) (maybeToList maybeWheres)
        args <- freshVarN (length pats)
        ret <- freshVar
        gArgs <- concat <$> zipWithM matchTerm args pats
        gReturn <- matchTerm ret rhs

        let label = Label 0 (funVar, funOf (args ++ [ret])) [] "Defined" (sl name)
        let gApp = [label (funVar === funOf (args ++ [ret]))]
        return $ gArgs ++ gReturn ++ gApp
  matchTerm term (InfixMatch l pat name pats rhs maybeWheres) = matchTerm term (Match l name (pat : pats) rhs maybeWheres)

instance MatchTerm Stmt where
  matchTerm term node@(Generator (SrcSpanInfo sp _) pat exp) = do
    randomMonad <- freshVar
    vOuter <- freshVar
    vInner <- freshVar
    g1 <- matchTerm vOuter exp
    g2 <- matchTerm vInner pat

    let label = Label 0 (vOuter, fromList [randomMonad, vInner, Unit]) [] "Defined" (sl pat)
    let g = label $ vOuter === fromList [randomMonad, vInner, Unit]
    return (g1 ++ g2 ++ [g])
  matchTerm term (Qualifier (SrcSpanInfo sp _) exp) = matchTerm term exp
  matchTerm term (LetStmt (SrcSpanInfo sp _) binds) = matchTerm Unit binds
  matchTerm _ _ = undefined

instance MatchTerm Binds where
  matchTerm term (BDecls (SrcSpanInfo sp _) decs) = concat <$> mapM (matchTerm term) decs
  matchTerm _ _ = undefined

instance MatchTerm Exp where
  matchTerm term (Lit _ lit) = matchTerm term lit
  matchTerm term node@(Con (SrcSpanInfo sp _) (UnQual _ (Ident _ "True"))) = do
    let label = Label 0 (term, atom "Bool") [] "Literal" (sl node)
    return [label (term === atom "Bool")]
  matchTerm term node@(Con (SrcSpanInfo sp _) (UnQual _ (Ident _ "False"))) = do
    let label = Label 0 (term, atom "Bool") [] "Literal" (sl node)
    return [label (term === atom "Bool")]
  matchTerm term node@(Var _ (UnQual _ (Ident _ "undefined"))) = do
    let label = Label 0 (Unit, Unit) [] "Bottom" (sl node)
    return [label succeeds]
  matchTerm term node@(Var (SrcSpanInfo sp _) name) = do
    -- var is method?
    -- var is type alias?
    mbVarTerm <- varByName name
    case mbVarTerm of
      Nothing -> return []
      Just varTerm -> do
        let label = Label 0 (varTerm, term) [] "Instanciated" (sl node)
        return [label (varTerm === term)]
  matchTerm term node@(Lambda _ pats exp) = do
    v <- freshVar
    g1 <- matchTerm v exp
    args <- freshVarN (length pats)
    g2 <- concat <$> zipWithM matchTerm args pats

    let label = Label 0 (term, funOf (args ++ [v])) [] "Defined" (sl node)
    let g = label (term === funOf (args ++ [v]))
    return (g : g2 ++ g1)
  matchTerm term node@(App _ e1 e2) = do
    let unroll (App _ a b) = unroll a ++ [b]
        unroll x = [x]
    let exps = unroll e1 ++ [e2]
    ts <- freshVarN (length exps)
    gTerms <- concat <$> zipWithM matchTerm ts exps
    f <- freshVar
    instanciation <-
      case head exps of
        (Var _ name) -> do
          varname <- fromJust <$> varByName name
          return [(varname, f)]
        (Con _ qname) -> do
          varname <- fromJust <$> varByName qname
          return [(varname, f)]
        _ -> return []
    let label = Label 0 (head ts, funOf (tail ts ++ [term])) instanciation "Applied" (sl node)
    let g =
          label
            ( conjN
                [ f ==< head ts,
                  f === funOf (tail ts ++ [term])
                ]
            )
    return $ gTerms ++ [g]
  matchTerm term node@(InfixApp l e1 op e2) = do
    v1 <- freshVar
    v2 <- freshVar
    mbOp <-
      if getName op == ":"
        then do
          v <- freshVar
          return $ Just (funOf [v, lstOf v, lstOf v])
        else varByName op
    case mbOp of
      Nothing -> return []
      Just vOp -> do
        g1 <- matchTerm v1 e1
        g2 <- matchTerm v2 e2
        -- let matchedMethd = if isVar vOp then find (\(t, _) -> varToString t == varToString vOp) cons else Nothing
        --     instanceConstraint = case matchedMethd of
        --       Nothing -> const succeeds
        --       Just (_, consFun) -> consFun

        f <- freshVar
        let label = Label 0 (vOp, funOf [v1, v2, term]) [(vOp, f)] ("Applied") (sl node)
        let g =
              label
                ( conjN
                    [ f ==< vOp,
                      f === funOf [v1, v2, term]
                      -- instanceConstraint f
                    ]
                )
        return $ g1 ++ g2 ++ [g]
  matchTerm term node@(Let _ binds exp) = do
    gBinds <- matchTerm Unit binds
    v <- freshVar
    gExp <- matchTerm v exp

    let label = Label 0 (term, v) [] "Let" (sl exp)
    let g = label (term === v)
    return $ gBinds ++ gExp ++ [g]
  matchTerm term node@(If _ eCond e1 e2) = do
    vCon <- freshVar
    v1 <- freshVar
    v2 <- freshVar
    gCon <- matchTerm vCon eCond
    g1 <- matchTerm v1 e1
    g2 <- matchTerm v2 e2

    let label1 = Label 0 (term, v1) [] "If" (sl e1)
        label2 = Label 0 (term, v2) [] "If" (sl e2)
        label3 = Label 0 (vCon, atom "Bool") [] "If Condition" (sl eCond)
    return $ g1 ++ g2 ++ gCon ++ [label1 (v1 === term), label2 (v2 === term), label3 (vCon === atom "Bool")]
  matchTerm term (Case _ exp []) = return []
  matchTerm term (Case l exp (Alt _ pat rhs maybebinds : alts)) = do
    vPat <- freshVar
    gExp <- matchTerm vPat exp
    gPat <- matchTerm vPat pat
    gBinds <- concat <$> mapM (matchTerm Unit) (maybeToList maybebinds)
    gRhs <- matchTerm term rhs
    gRest <- matchTerm term (Case l exp alts)
    return $ gExp ++ gPat ++ gBinds ++ gRhs ++ gRest
  matchTerm term (List _ []) = return []
  matchTerm term node@(List l (exp : exps)) = do
    vExp <- freshVar
    gExp <- matchTerm vExp exp
    gRest <- matchTerm term (List l exps)

    let label = Label 0 (term, lstOf vExp) [] "Literal" (sl node)
    return $ gExp ++ gRest ++ [label (term === lstOf vExp)]
  matchTerm term (ParArray l exps) = matchTerm term (List l exps)
  matchTerm term (Paren l exp) = matchTerm term exp
  matchTerm term node@(LeftSection l exp op) = do
    mbOp <-
      if getName op == ":"
        then do
          v <- freshVar
          return $ Just (funOf [v, lstOf v, lstOf v])
        else varByName op
    case mbOp of
      Nothing -> return []
      Just vOp -> do
        vLeft <- freshVar
        vRight <- freshVar
        vRes <- freshVar
        gLeft <- matchTerm vLeft exp
        f <- freshVar
        let g =
              conjN
                [ f ==< vOp,
                  f === funOf [vLeft, vRight, vRes],
                  term === funOf [vRight, vRes]
                  -- conda (map (\(t, g) -> [t === vOp, g f]) cons)
                ]
        let label = Label 0 (vOp, funOf [vLeft, vRight, vRes]) [(vOp, f)] ("Applied") (sl node)
        return $
          gLeft ++ [label g]
  matchTerm term node@(RightSection l op exp) = do
    mbOp <-
      if getName op == ":"
        then do
          v <- freshVar
          return $ Just (funOf [v, lstOf v, lstOf v])
        else varByName op
    case mbOp of
      Nothing -> return []
      Just vOp -> do
        vLeft <- freshVar
        vRight <- freshVar
        vRes <- freshVar
        gRight <- matchTerm vRight exp
        f <- freshVar
        let g =
              conjN
                [ f ==< vOp,
                  f === funOf [vLeft, vRight, vRes],
                  term === funOf [vLeft, vRes]
                  -- conda (map (\(t, g) -> [t === vOp, g f]) cons)
                ]
        let label = Label 0 (vOp, funOf [vLeft, vRight, vRes]) [(vOp, f)] ("Applied") (sl node)
        return $
          gRight ++ [label g]
  matchTerm term node@(RecConstr _ qname fieldUpdates) = do
    fieldsOrderings <- view _3 <$> get
    let fieldToExps :: FieldUpdate a -> [(String, Exp a)]
        fieldToExps (FieldWildcard _) = []
        fieldToExps (FieldUpdate _ name exp) = [(getName name, exp)]
        fieldToExps (FieldPun l' name) = [(getName name, Var l' name)]
        fields = concatMap fieldToExps fieldUpdates
        orderedFields = map snd . sortOn (\(n, _) -> fromJust . lookup n $ fieldsOrderings) $ fields
    mbFVar <- varByName qname
    case mbFVar of
      Nothing -> return []
      Just fVar -> do
        vArgs <- freshVarN (length orderedFields)
        gArgs <- concat <$> zipWithM matchTerm vArgs orderedFields
        f <- freshVar
        let g = conj2 (f ==< fVar) (f === funOf (vArgs ++ [term]))

        let label = Label 0 (fVar, funOf (vArgs ++ [term])) [(fVar, f)] ("Applied") (sl node)
        return $ label g : gArgs
  matchTerm term (RecUpdate _ exp []) = return []
  matchTerm term node@(RecUpdate _ exp fieldUpdates) = do
    gExp <- matchTerm term exp
    gFields <- concat <$> mapM (matchTerm term) fieldUpdates
    return $ gExp ++ gFields
  matchTerm term node@(Tuple l _ exps) = do
    vars <- freshVarN (length exps)
    gArgs <- concat <$> zipWithM matchTerm vars exps
    let label = Label 0 (term, tupOf vars) [] ("Record") (sl node)
    return $ label (term === tupOf vars) : gArgs
  matchTerm term node@(Con l name) = do
    mbVCon <- varByName name
    case mbVCon of
      Nothing -> return []
      Just vCon -> do
        let label = Label 0 (term, vCon) [] ("Used") (sl node)
        return [label (term === vCon)]
  matchTerm term node@(EnumFromTo l exp1 exp2) = do
    v <- freshVar
    g1 <- matchTerm v exp1
    g2 <- matchTerm v exp2
    let label = Label 0 (term, lstOf v) [] "Srtucture" (sl node)
    return $ label (term === lstOf v) : (g1 ++ g2)
  matchTerm _ t = error $ "Unsupported exp type: " ++ show t

instance MatchTerm FieldUpdate where
  matchTerm term (FieldWildcard _) = return []
  matchTerm term node@(FieldUpdate _ name exp) = do
    mbFName <- varByNameWithScope (Just RecordFieldScope) name
    case mbFName of
      Nothing -> return []
      Just fName -> do
        vExp <- freshVar
        gExp <- matchTerm vExp exp
        f <- freshVar
        let g = conj2 (f ==< fName) (f === funOf [term, vExp])
        let label = Label 0 (fName, funOf [term, vExp]) [(fName, f)] ("Applied") (sl node)
        return $ label g : gExp
  matchTerm term node@(FieldPun l name) = do
    mbFName <- varByNameWithScope (Just RecordFieldScope) name
    case mbFName of
      Nothing -> return []
      Just fName -> do
        vExp <- freshVar
        gExp <- matchTerm vExp (Var l name)
        f <- freshVar
        let g = conj2 (f ==< fName) (f === funOf [term, vExp])
        let label = Label 0 (fName, funOf [term, vExp]) [(fName, f)] ("Applied") (sl node)
        return $ label g : gExp

instance MatchTerm Pat where
  matchTerm term (PApp _ node@(UnQual _ (Ident _ "True")) []) = do
    let label = Label 0 (term, atom "Bool") [] "Matched" (sl node)
    return [label (term === atom "Bool")]
  matchTerm term (PApp _ node@(UnQual _ (Ident _ "False")) []) = do
    let label = Label 0 (term, atom "Bool") [] "Matched" (sl node)
    return [label (term === atom "Bool")]
  matchTerm term (PInfixApp l pat1 name pat2) = matchTerm term (PApp l name [pat1, pat2])
  matchTerm term node@(PVar (SrcSpanInfo sp _) name) = do
    maybeVarTerm <- varByName name
    case maybeVarTerm of
      Nothing -> return []
      Just varTerm -> do
        let label = Label 0 (varTerm, term) [] "Matched" (sl node)
        return [label (varTerm === term)]
  matchTerm term (PLit _ _ literal) = do
    goals <- matchTerm term literal
    return $ map (\g -> g {reason = "Matched"}) goals
  matchTerm term node@(PNPlusK (SrcSpanInfo sp _) name _) = do
    mbV <- varByName name
    case mbV of
      Nothing -> return []
      Just v -> do
        let label = Label 0 (term, v) [] "Matched" (sl node)
        return [label (v === term)]
  matchTerm term node@(PTuple _ _ pats) = do
    args <- freshVarN (length pats)
    tArgs <- concat <$> zipWithM matchTerm args pats
    let label = Label 0 (term, tupOf args) [] "Matched" (sl node)
    return $ label (term === tupOf args) : tArgs
  matchTerm term node@(PList l pats) = do
    elem <- freshVar
    gs <- concat <$> mapM (matchTerm elem) pats
    let label = Label 0 (term, lstOf elem) [] "Matched" (sl node)
    return $ gs ++ [label (term === lstOf elem)]
  matchTerm term (PParen l p) = matchTerm term p
  matchTerm term (PWildCard _) = return []
  matchTerm term node@(PApp _ qname pats) = do
    mbVFun <-
      if getName qname == ":"
        then do
          v <- freshVar
          return $ Just (funOf [v, lstOf v, lstOf v])
        else varByName qname
    case mbVFun of
      Nothing -> return []
      Just vFun -> do
        args <- freshVarN (length pats)
        gArgs <- concat <$> zipWithM matchTerm args pats
        f <- freshVar
        let gApp = conj2 (f ==< vFun) (f === funOf (args ++ [term]))
        let label = Label 0 (vFun, funOf (args ++ [term])) [(vFun, f)] "Matched" (sl node)
        return $ label gApp : gArgs
  matchTerm term (PRec l qname fields) = do
    fieldsOrderings <- view _3 <$> get
    let patternFieldToNamedPatterns :: PatField a -> [(String, Pat a)]
        patternFieldToNamedPatterns (PFieldWildcard _) = []
        patternFieldToNamedPatterns (PFieldPat _ name pat) = [(getName name, pat)]
        patternFieldToNamedPatterns (PFieldPun l' name) =
          let fieldName = getName name
              generatedPat = PVar l' (Ident (ann name) fieldName)
           in [(fieldName, generatedPat)]
        flatFileds = concatMap patternFieldToNamedPatterns fields
        orderedFields = sortOn (\(n, _) -> fromJust . lookup n $ fieldsOrderings) flatFileds
    matchTerm term (PApp l qname (map snd orderedFields))
  matchTerm _ p = error $ "Error unhandled pattern: " ++ show p

instance MatchTerm Literal where
  matchTerm term node@Char {} = do
    let label = Label 0 (term, atom "Char") [] "Literal" (sl node)
    return [label (term === atom "Char")]
  matchTerm term node@String {} = do
    let label = Label 0 (term, pair (atom "List") (atom "Char")) [] "Literal" (sl node)
    return [label (term === pair (atom "List") (atom "Char"))]
  matchTerm term node@Int {} = do
    let label = Label 0 (term, atom "Int") [] "Literal" (sl node)
    return [label (term === atom "Int")]
  matchTerm term node@Frac {} = do
    let label = Label 0 (term, atom "Fraction") [] "Literal" (sl node)
    return [label (term === atom "Fraction")]
  matchTerm _ _ = undefined

processFile :: String -> IO ()
processFile filepath = do
  contents <- readFile filepath
  let pResult = parseModuleWithMode parseMode contents
      parseMode = defaultParseMode {parseFilename = filepath}
  case pResult of
    ParseOk hModule -> do
      let (_, scopes) = evalState (getScopes Global 0 hModule) 1
          filedOrderings = getFieldOrdering hModule
          names = allNames scopes
          goals = sortOn goalNum $ evalState (matchTerm Unit hModule) (0, scopes, filedOrderings, [])
          krenstate = runGoalNWithState emptyS 1 (conjN (map unlabel goals))
          res = run1 names (conjN (map unlabel goals))
      -- mapM_ print scopes
      -- mapM_ print goals
      print names
      putStrLn "\nResult:"
      print res
      putStrLn "\nKanren State:"
      print krenstate
      putStrLn "\n\n"
      let newSubs = deriveRequirement . fst . head $ krenstate
      print newSubs

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
