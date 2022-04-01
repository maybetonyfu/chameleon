{-# LANGUAGE OverloadedStrings #-}
module Main where
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

main = scotty 5000 (typecheck >> home >> js >> css >> intro >> consent >> explanatory >> svg >> favicon)


typecheck :: ScottyM ()
typecheck = post "/typecheck" $ do
    content <- body
    let result = processFile (BS.unpack content)
    json result


home :: ScottyM ()
home = get "/" $ do
    file "static/build/index.html"


intro :: ScottyM ()
intro = get "/intro" $ do
    file "static/build/introduction.html"

consent :: ScottyM ()
consent = get "/consent" $ do
    file "static/build/consent.html"

explanatory :: ScottyM ()
explanatory = get "/explanatory" $ do
    file "static/build/explanatory.html"

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

svg :: ScottyM ()
svg = get (regex  "^.*\\.svg") $ do
    path <- param "0"
    let filename = "static/build" `T.append` path
    setHeader "Content-Type" "image/svg+xml"
    file (T.unpack filename)

favicon :: ScottyM ()
favicon = get "/favicon.ico" $ do
    setHeader "Content-Type" "image/vnd.microsoft.icon"
    file "static/build/favicon.ico"