{-# LANGUAGE OverloadedStrings #-}
module Server where
import Web.Scotty
    ( json,
      body,
      post,
      scotty,
      ScottyM,
      file,
      get,
      param,
      regex,
      setHeader )
import qualified Data.ByteString.Lazy.Char8 as BS
import JsonInstance
import Run hiding (main)
import Data.Monoid (mconcat)
import qualified Data.Text.Lazy as T

main = scotty 3000 (typecheck >> home >> js >> css)


typecheck :: ScottyM ()
typecheck = post "/typecheck" $ do
    content <- body
    let result = processFile (BS.unpack content)
    json result


home :: ScottyM ()
home = get "/" $ do
    file "static/build/index.html"

js :: ScottyM ()
js = get (regex  "^.*\\.js") $ do
    path <- param "0"
    let filename = "static/build" `T.append` path
    setHeader "Content-Type" "application/javascript"
    file (T.unpack filename)

css :: ScottyM ()
css = get (regex  "^.*\\.css") $ do
    path <- param "0"
    let filename = "static/build" `T.append` path
    setHeader "Content-Type" "text/css"
    file (T.unpack filename)