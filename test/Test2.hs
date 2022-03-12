module Task where 
type Dimension = Integer

type D = (Dimension, Dimension)

type SizeHints = ((Maybe D), (Maybe D), (Maybe (D, D)))

sh_max_size :: SizeHints -> Maybe D
sh_max_size (a, b, c) = a

sh_resize_inc :: SizeHints -> Maybe D
sh_resize_inc (a, b, c) = b

sh_aspect :: SizeHints -> Maybe (D, D)
sh_aspect (a, b, c) = c

applyAspectHint ((minx, miny), (maxx, maxy)) (w, h)
  | or [minx < 1, miny < 1, maxx < 1, maxy < 1] = (w, h)
  | w * maxy > h * maxx = (h * maxx `div` maxy, h)
  | w * miny < h * minx = (w, w * miny `div` minx)
  | otherwise = (w, h)

applyResizeIncHint (iw, ih) (w, h) =
  if iw > 0 && ih > 0 then (w - w `mod` iw, h - h `mod` ih) else (w, h)

-- | Reduce the dimensions if they exceed the given maximum dimensions.
-- applyMaxSizeHint  :: D -> D -> D
applyMaxSizeHint (mw, mh) (w, h) =
  if mw > 0 && mh > 0 then (min w mw, min h mh) else (w, h)

applySizeHints' sh d = 
  case sh_aspect sh of
    Nothing -> d
    Just asp -> applyAspectHint asp d