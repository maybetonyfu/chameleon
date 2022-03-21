module Task where 

standardTrans z =
  case z of
    "shorttitle" -> []
    "sorttitle" -> []
    "indextitle" -> []
    "indexsorttitle" -> []
    _ -> z


-- bookTrans :: String -> [String]
bookTrans z =
  case z of
    "title" -> ["booktitle"]
    "subtitle" -> ["booksubtitle"]
    "titleaddon" -> ["booktitleaddon"]
    "shorttitle" -> []
    "sorttitle" -> []
    "indextitle" -> []
    "indexsorttitle" -> []
    _ -> [z]

-- transformKey source target key
-- derived from Appendix C of bibtex manual
-- transformKey :: String -> String -> String -> [String]
transformKey _ _ "ids" = []
transformKey _ _ "crossref" = []
transformKey _ _ "xref" = []
transformKey _ _ "entryset" = []
transformKey _ _ "entrysubtype" = []
transformKey _ _ "execute" = []
transformKey _ _ "label" = []
transformKey _ _ "options" = []
transformKey _ _ "presort" = []
transformKey _ _ "related" = []
transformKey _ _ "relatedoptions" = []
transformKey _ _ "relatedstring" = []
transformKey _ _ "relatedtype" = []
transformKey _ _ "shorthand" = []
transformKey _ _ "shorthandintro" = []
transformKey _ _ "sortkey" = []
transformKey x y "author"
  | x `elem` ["mvbook", "book"] =
    ["bookauthor", "author"]
-- note: this next clause is not in the biblatex manual, but it makes
-- sense in the context of CSL conversion:
transformKey x y "author"
  | x == "mvbook" = ["bookauthor", "author"]
transformKey "mvbook" y z
  | y `elem` ["book", "inbook", "bookinbook", "suppbook"] = standardTrans z
transformKey x y z
  | x `elem` ["mvcollection", "mvreference"] =
    bookTrans z
transformKey "mvproceedings" y z
  | y `elem` ["proceedings", "inproceedings"] = standardTrans z
transformKey "book" y z
  | y `elem` ["inbook", "bookinbook", "suppbook"] = bookTrans z
transformKey x y z
  | x `elem` ["collection", "reference"] = bookTrans z
transformKey "proceedings" "inproceedings" z = bookTrans z
transformKey "periodical" y z
  | y `elem` ["article", "suppperiodical"] =
    case z of
        "title" -> ["journaltitle"]
        "subtitle" -> ["journalsubtitle"]
        "shorttitle" -> []
        "sorttitle" -> []
        "indextitle" -> []
        "indexsorttitle" -> []
        _ -> [z]
transformKey _ _ x = [x]