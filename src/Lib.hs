{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE ScopedTypeVariables #-}

module Lib where

import Bag
import Control.Monad.IO.Class (liftIO)
import Data.Aeson hiding (Array)
import Data.Array
import qualified Data.ByteString.Lazy as BS
import Data.List
import qualified Data.Map.Strict as Map
import Data.Maybe
import qualified Data.Set as Set
import ErrUtils
import Exception
import FastString
import GHC
import GHC.Generics
import GHC.Paths
import HieAst
import HieTypes
import HieUtils
import HscTypes
import Name
import Outputable
import Pretty
import SrcLoc
import StringBuffer
import System.Environment
import System.IO

process :: FilePath -> Ghc BkUnit
process path = do
  dflags <- getSessionDynFlags :: Ghc DynFlags
  let dflags' = dflags {hscTarget = HscNothing, ghcLink = NoLink}
  setSessionDynFlags dflags'
  let mn = mkModuleName "Task"
  let hsTarketId = TargetFile path Nothing
  addTarget
    Target
      { targetId = hsTarketId,
        targetAllowObjCode = False,
        targetContents = Nothing
      }

  eitherl <- gtry (load LoadAllTargets) :: Ghc (Either SourceError SuccessFlag)
  case eitherl of
    Left se -> do 
      removeTarget hsTarketId
      return (BkUnit path (BkInternalError "Cannot load internal module"))
    Right sf -> do
      modSum <- getModSummary mn
      eitherp <- gtry (parseModule modSum) :: Ghc (Either SourceError ParsedModule)
      case eitherp of
        Left se -> do
          let errorMessages :: Bag ErrMsg = srcErrorMessages se
          let bkerror :: [([String], BkSpan)] = bagToList $ mapBag (convertError dflags') errorMessages
          removeTarget hsTarketId
          return (BkUnit path (BkParseErrors bkerror))
        Right p -> do
          t <- gtry (typecheckModule p) :: Ghc (Either SourceError TypecheckedModule)
          case t of
            Left se -> do
              let errorMessages :: Bag ErrMsg = srcErrorMessages se
              let bkerror :: [([String], BkSpan)] = bagToList $ mapBag (convertError dflags') errorMessages
              -- mapM_ (liftIO . errorPrint dflags) errorMessages
              removeTarget hsTarketId
              return (BkUnit path (BkTypeErrors bkerror))
            Right tc -> do
              let rnSrouce = tm_renamed_source tc
              let (env, modDetail) = tm_internals_ tc
              hscEnv <- getSession
              (bindings, placeholder, anchor) <- liftIO $ runInteractiveHsc hscEnv (mkHieFile modSum env (fromJust rnSrouce) >>= processHie dflags)
              removeTarget hsTarketId
              return (BkUnit path (BkNoError placeholder anchor))

main :: IO ()
main = do
  args <- getArgs :: IO [String]
  r <- runGhc (Just libdir) (mapM process args)
  BS.putStr (encode r) :: IO ()

processHie :: DynFlags -> HieFile -> Hsc ([Binding], Maybe [String], Maybe [String])
processHie dflags (HieFile hPath hModule hTypes hAsts hExports hSrc) = do
  let maybeAst = Map.lookup (mkFastString hPath) (getAsts hAsts)
  case maybeAst of
    Nothing -> error "No AST"
    Just ast -> do
      -- printAst dflags hTypes ast
      let tlvs = filter isBinding (nodeChildren ast)
      let flattenedAst = flatAst ast
      let placeholderNode = find isPlaceholder flattenedAst
      let anchorNode = find isAnchor flattenedAst
      let placeholderTypes = fmap (nodeSignatures dflags hTypes) placeholderNode
      let anchorType = fmap (nodeSignatures dflags hTypes) anchorNode
      -- liftIO $ mapM_ (print . renderHieType dflags) types
      return (map (astToBinding dflags hTypes) tlvs, placeholderTypes, anchorType)

flatAst :: HieAST TypeIndex -> [HieAST TypeIndex]
flatAst node@(Node _ _ nChildren) = node : concatMap flatAst nChildren

astToBinding :: DynFlags -> Array TypeIndex HieTypeFlat -> HieAST TypeIndex -> Binding
astToBinding dflags hTypes (Node nInfo _ nChildren) =
  let types = map (`recoverFullType` hTypes) (nodeType nInfo)
      typeStrs = map (renderHieType dflags) types
      bindingNameNode = if isMatch (head nChildren) then head . nodeChildren . head $ nChildren else head nChildren
      names = fmap fst . Map.toList . nodeIdentifiers $ nodeInfo bindingNameNode
      nameStrings = map (either moduleNameString getOccString) names
   in Binding (head nameStrings) (head typeStrs)

isBinding :: HieAST a -> Bool
isBinding (Node nInfo _ _) =
  let annos = nodeAnnotations nInfo
      funBindingAnnotation = (mkFastString "FunBind", mkFastString "HsBindLR")
   in Set.member funBindingAnnotation annos

isMatch :: HieAST a -> Bool
isMatch (Node nInfo _ _) =
  let annos = nodeAnnotations nInfo
      funBindingAnnotation = (mkFastString "Match", mkFastString "Match")
   in Set.member funBindingAnnotation annos

isPlaceholder :: HieAST a -> Bool
isPlaceholder (Node nInfo _ _) =
  let names = fmap fst . Map.toList . nodeIdentifiers $ nInfo
      nameStrings = map (either moduleNameString getOccString) names
   in "undefined" `elem` nameStrings

isAnchor :: HieAST a -> Bool
isAnchor (Node nInfo _ _) =
  let names = fmap fst . Map.toList . nodeIdentifiers $ nInfo
      nameStrings = map (either moduleNameString getOccString) names
      hasType = not . null . nodeType $ nInfo
   in "internalAnchor" `elem` nameStrings && hasType

nodeSignatures :: DynFlags -> Array TypeIndex HieTypeFlat -> HieAST TypeIndex -> [String]
nodeSignatures dflags hTypes (Node nInfo nSpan nChildren) =
  let types = map (`recoverFullType` hTypes) (nodeType nInfo)
   in map (renderHieType dflags) types

printAst :: DynFlags -> Array TypeIndex HieTypeFlat -> HieAST TypeIndex -> Hsc ()
printAst dflags hTypes (Node nInfo nSpan nChildren) = do
  liftIO $ putStrLn "------------"
  liftIO $ putStrLn "Node Annotation:"
  liftIO $ print (nodeAnnotations nInfo)
  liftIO $ putStrLn "Node Type:"
  let types = map (`recoverFullType` hTypes) (nodeType nInfo)
  liftIO $ mapM_ (print . renderHieType dflags) types
  liftIO $ putStrLn "Node Indentifiers:"
  let names = fmap fst . Map.toList . nodeIdentifiers $ nInfo
  let nameStrings = map (either moduleNameString getOccString) names
  liftIO $ print nameStrings
  liftIO $ print nSpan
  liftIO $ putStrLn "Node Children:"
  mapM_ (printAst dflags hTypes) nChildren
  liftIO $ putStrLn "------------"

convertError :: DynFlags -> ErrMsg -> ([String], BkSpan)
convertError dflags error = (errorToText dflags error, spanToBkSpan (errMsgSpan error))

spanToBkSpan :: SrcSpan -> BkSpan
spanToBkSpan (UnhelpfulSpan _) = BkEmptySpan
spanToBkSpan (RealSrcSpan realSpan) =
  let start = realSrcSpanStart realSpan
      end = realSrcSpanEnd realSpan
      startLine = srcLocLine start
      startCol = srcLocCol start
      endLine = srcLocLine end
      endCol = srcLocCol end
   in BkSpan (Location startLine startCol) (Location endLine endCol)

errorToText :: DynFlags -> ErrMsg -> [String]
errorToText flag err =
  let pprstyle = setStyleColoured False (defaultUserStyle flag)
      docContext = initSDocContext flag pprstyle
      doc = errMsgDoc err
      important :: [Doc] = map (`runSDoc` docContext) $ errDocImportant doc
      context :: [Doc] = map (`runSDoc` docContext) $ errDocContext doc
      supplymentary :: [Doc] = map (`runSDoc` docContext) $ errDocSupplementary doc
      importantDocs = map (renderStyle style) important
      contextDocs = map (renderStyle style) context
      supplymentaryDOcs = map (renderStyle style) supplymentary
   in importantDocs ++ contextDocs ++ supplymentaryDOcs

data Location = Location Int Int deriving (Show, Generic)

data BkSpan = BkSpan {from :: Location, to :: Location} | BkEmptySpan deriving (Show, Generic)

data Binding = Binding {bindingName :: String, bindingType :: String} deriving (Show, Generic)

data BkResult
  = BkInternalError String
  | BkParseErrors [([String], BkSpan)]
  | BkTypeErrors [([String], BkSpan)]
  | BkNoError {placeholderType :: Maybe [String], anchorType :: Maybe [String]}
  deriving (Show, Generic)

data BkUnit = BkUnit {unitName :: String, unitResult :: BkResult} deriving (Show, Generic)

instance FromJSON Location

instance FromJSON BkSpan

instance FromJSON Binding

instance FromJSON BkResult

instance FromJSON BkUnit

instance ToJSON Location

instance ToJSON BkSpan

instance ToJSON Binding

instance ToJSON BkResult

instance ToJSON BkUnit
