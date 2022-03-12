module Task where 
data List a = Nil | Cons a (List a)

instance Semigroup (List a) where
    Nil <> l = l
    l <> Nil = l
    (Cons x xs) <> y = Cons x (xs <> y)

instance Monoid (List a) where
    mempty = Nil
    mappend = (<>)

    
instance (Show a) => Show (List a) where
    show Nil = ""
    show (Cons x xs) = show x ++ ", " ++ show xs

instance Functor List where
    fmap f Nil = Nil
    fmap f (Cons x xs) = Cons (f x) (fmap f xs)

instance Applicative List where
  pure  = return
  Nil <*> m = Nil
  (Cons f fs) <*> m  = Cons (fmap f m) (fs <*> m)

instance Monad List where
    return x = Cons x Nil
    xs >>= k = join $ fmap k xs

join :: List (List a) -> List a
join Nil = Nil
join (Cons xs xss) =  cat xs (join xss)

cat :: List a -> List a -> List a
cat Nil ys = ys
cat (Cons x xs) ys = Cons x (cat xs ys)

neighbors :: (Num a) => a -> a -> List a
neighbors x dx = Cons (x - dx) (Cons x (Cons (x + dx) Nil))
