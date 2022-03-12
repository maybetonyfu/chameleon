module Nameable where

import Language.Haskell.Exts.Syntax

newtype StringLike a = StringLike {getString :: String} deriving (Show, Eq)

class Nameable n where
  getName :: n a -> String

instance Nameable Name where
  getName (Ident _ name) = name
  getName (Symbol _ name) = name

instance Nameable QName where
  getName (Qual _ _ name) = getName name
  getName (UnQual _ name) = getName name
  getName (Special _ special) = getName special

instance Nameable SpecialCon where
  getName (UnitCon l) = "()"
  getName (ListCon l) = "List"
  getName (FunCon l) = "Function"
  getName (TupleCon l _ n) = "(" ++ take (n - 1) (repeat ',') ++ ")"
  getName (Cons l) = ":"
  getName (UnboxedSingleCon l) = "(# #)"
  getName (ExprHole l) = "_"

instance Nameable Match where
  getName (Match _ name _ _ _) = getName name
  getName (InfixMatch _ _ name _ _ _) = getName name

instance Nameable TyVarBind where
  getName (KindedVar _ name _) = getName name
  getName (UnkindedVar _ name) = getName name

instance Nameable StringLike where
  getName (StringLike x) = x

instance Nameable QOp where
  getName (QVarOp _ qname) = getName qname
  getName (QConOp _ qname) = getName qname