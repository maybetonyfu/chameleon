module ExampleBasicMode where

ident a = (a, a)

fun a c = ident c

fun a True = ('C', 'D')
  
