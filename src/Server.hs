{-# LANGUAGE OverloadedStrings #-}
module Server where
import Web.Scotty
import qualified Data.ByteString.Lazy.Char8 as BS
import JsonInstance
import Run hiding (main)
import Data.Monoid (mconcat)

main = scotty 3000 typecheck


typecheck :: ScottyM ()
typecheck = post "/typecheck" $ do
    content <- body
    let result = processFile (BS.unpack content)
    json result
