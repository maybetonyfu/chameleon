export const unAlias = str => {
  return str.replaceAll('[Char]', 'String');
};

export const within = (point, { from, to }) =>
  pointAfterInclusive(point, from) && pointBeforeExclusive(point, to);

export function convertLocation({
  srcSpanEndLine,
  srcSpanEndColumn,
  srcSpanStartColumn,
  srcSpanStartLine,
}) {
  return {
    from: { line: srcSpanStartLine - 1, ch: srcSpanStartColumn - 1 },
    to: { line: srcSpanEndLine - 1, ch: srcSpanEndColumn - 1 },
  };
}

export const pointBeforeInclusive = (point1, point2) => {
  if (point1.line < point2.line) {
    return true;
  } else if (point1.line === point2.line) {
    return point1.ch <= point2.ch;
  } else {
    return false;
  }
};

export const pointBeforeExclusive = (point1, point2) => {
  if (point1.line < point2.line) {
    return true;
  } else if (point1.line === point2.line) {
    return point1.ch < point2.ch;
  } else {
    return false;
  }
};

export const pointAfterInclusive = (point1, point2) => {
  if (point1.line > point2.line) {
    return true;
  } else if (point1.line === point2.line) {
    return point1.ch >= point2.ch;
  } else {
    return false;
  }
};

export const pointAfterExclusive = (point1, point2) => {
  if (point1.line > point2.line) {
    return true;
  } else if (point1.line === point2.line) {
    return point1.ch > point2.ch;
  } else {
    return false;
  }
};

export const doesRangeSurround = (rangeA, rangeB) => {
  return (
    pointBeforeInclusive(rangeA.from, rangeB.from) &&
    pointAfterInclusive(rangeA.to, rangeB.to)
  );
};

export const doesRangeIntersect = (rangeA, rangeB) => {
  return (
    (pointBeforeInclusive(rangeA.from, rangB.from) &&
      pointBeforeInclusive(rangeB.from, rangeA.to) &&
      pointBeforeInclusive(rangeA.to, rangeB.to) &&
      pointBeforeInclusive(rangeB.from, rangeA.to)) ||
    (pointBeforeInclusive(rangeB.from, rangeA.from) &&
      pointBeforeInclusive(rangeA.from, rangeB.to) &&
      pointBeforeInclusive(rangeB.to, rangeA.to) &&
      pointBeforeInclusive(rangeA.from, rangeB.to))
  );
};

export function drawAnnotations(rangeA, rangeB, reason, step, direction, offset) {
  let color = false;
  if (rangeB.from.line < rangeA.from.line) {
    // B
    //   A
    const [topBox, bottomBox, inbetweenBox, annotationBox] = boxStyles(
      {
        left: rangeB.from.ch,
        top: rangeB.from.line,
        width: rangeB.to.ch - rangeB.from.ch,
        height: 1,
      },
      {
        left: rangeA.from.ch,
        top: rangeA.from.line,
        width: rangeA.to.ch - rangeA.from.ch,
        height: 1,
      },
      color,
      offset,
    );
    return [
      {
        relativeTo: rangeB.from,
        key: 'top-line',
        styles: topBox,
        classes: ['absolute', 'z-40', 'rounded-t-sm', 'border-l', 'border-t', 'border-r'],
        content: { type: 'empty' },
      },
      {
        relativeTo: rangeB.from,
        key: 'inbetween-line',
        styles: inbetweenBox,
        classes: ['absolute', 'z-20', 'border-r'],
        content: { type: 'empty' },
      },
      {
        relativeTo: rangeA.from,
        key: 'bottom-line',
        styles: bottomBox,
        classes: ['absolute', 'z-20', 'rounded-b-sm', 'border-l', 'border-b', 'border-r'],
        content: { type: 'empty' },
      },
      {
        relativeTo: rangeA.from,
        key: 'annotation-box',
        styles: annotationBox,
        classes: ['absolute', 'text-center', 'text-sm', 'z-20'],
        content: { type: 'annotation', direction, reason, step },
      },
    ];
  } else {
    // A
    //   B
    const [topBox, bottomBox, inbetweenBox, annotationBox] = boxStyles(
      {
        left: rangeA.from.ch,
        top: rangeA.from.line,
        width: rangeA.to.ch - rangeA.from.ch,
        height: 1,
      },
      {
        left: rangeB.from.ch,
        top: rangeB.from.line,
        width: rangeB.to.ch - rangeB.from.ch,
        height: 1,
      },
      color,
      offset
    );
    return [
      {
        relativeTo: rangeA.from,
        key: 'top-line',
        styles: topBox,
        classes: ['absolute', 'z-40', 'rounded-t-sm', 'border-l', 'border-t', 'border-r'],
        content: { type: 'empty' },
      },
      {
        relativeTo: rangeA.from,
        key: 'inbetween-line',
        styles: inbetweenBox,
        classes: ['absolute', 'z-20', 'border-r'],
        content: { type: 'empty' },
      },
      {
        relativeTo: rangeB.from,
        key: 'bottom-line',
        styles: bottomBox,
        classes: ['absolute', 'z-20', 'rounded-b-sm', 'border-l', 'border-b', 'border-r'],
        content: { type: 'empty' },
      },
      {
        relativeTo: rangeB.from,
        key: 'annotation-box',
        styles: annotationBox,
        classes: ['absolute', 'text-center', 'text-sm', 'z-20'],
        content: { type: 'annotation', direction, reason, step },
      },
    ];
  }
}

function boxStyles(topElem, bottomElem, color, offset) {
  const downwardBarHeight = 0.28;
  const annotationWidth = 18;
  const annotationHeight = 1.25;
  const chWidth = 0.625;
  const chHeight = 1.5;
  const lineColor = '#666666';
  const stepAsideDistance = offset * chWidth + 10
  const styleTop = {
    background: color ? 'var(--color-azure-3)' : 'transparent',
    opacity: color ? 0.5 : 1,
    height: `${downwardBarHeight}rem`,
    left: `${(topElem.width * chWidth) / 2}rem`,
    top: `${-downwardBarHeight}rem`,
    width:
      `${stepAsideDistance -
      topElem.left * chWidth -
      (topElem.width * chWidth) / 2}rem`,
    borderColor: lineColor
  };

  const styleBottom = {
    background: color ? 'var(--color-sky-3)' : 'transparent',
    opacity: color ? 0.5 : 1,
    height: `${downwardBarHeight}rem`,
    left: `${(bottomElem.width * chWidth) / 2}rem`,
    top: `${bottomElem.height * chHeight}rem`,
    width:
      `${stepAsideDistance -
      bottomElem.left * chWidth -
      (bottomElem.width * chWidth) / 2}rem`,
    borderColor: lineColor
  };

  const styleInbetween = {
    background: color ? 'var(--color-violet-3)' : 'transparent',
    opacity: color ? 0.5 : 1,
    width:
      `${stepAsideDistance -
      topElem.left * chWidth -
      (topElem.width * chWidth) / 2}rem`,
    height: `${(bottomElem.top - topElem.top + 1) * chHeight - annotationHeight}rem`,
    top: `${0}rem`,
    left: `${(topElem.width * chWidth) / 2}rem`,
    borderColor: lineColor
  };

  const styleAnnotation = {
    background: color ? 'var(--color-orange-3)' : 'transparent',
    opacity: color ? 0.5 : 1,
    width: `${annotationWidth}rem`,
    height: `${annotationHeight}rem`,
    top: `${bottomElem.height * chHeight - annotationHeight}rem`,
    left:
      `${stepAsideDistance - bottomElem.left * chWidth - annotationWidth / 2}rem`,
  };
  return [styleTop, styleBottom, styleInbetween, styleAnnotation];
}

export const partitionBy = (array, fun) => {
  let res = {}
  for (let elem of array) {
    let key = fun(elem)
    if (res.hasOwnProperty(key)) {
      res[key] = [...res[key], elem]
    } else {
      res[key] = [elem]
    }
  }
  return Object.values(res)
}

// z-index order: text >  bottom bar >= BorderBoxChild > BorderBoxParent > topBar > normalBoxParent > normalBoxChild
//                 50        40            40                   30           20         10              0
export const makeParentHighlightB = (range, m) => {
  return {
    ...range,
    marker: {
      shared: [
        m,
        '-inset-y-0.5',
        'inset-x-0',
        'border-t',
        'border-b',
        'border-black',
        'z-30'
      ],
      start: ['-left-0.5', 'border-l', 'rounded-l-sm'],
      end: ['-right-0.5', 'border-r', 'rounded-r-sm'],
    },
  };
};

export const makeParentHighlight = (range, m) => {
  return {
    ...range,
    marker: {
      shared: [m, '-inset-y-0.5', 'inset-x-0', 'z-10'],
      start: ['-left-0.5', 'rounded-l-sm'],
      end: ['-right-0.5', 'rounded-r-sm'],
    },
  };
};

export const makeHighlightB = (range, marker) => {
  return {
    ...range,
    marker: {
      shared: [marker, 'inset-0', 'border-t', 'border-b', 'border-black', 'z-40'],
      start: ['border-l', 'rounded-l-sm'],
      end: ['border-r', 'rounded-r-sm'],
    },
  };
};

export const makeHighlight = (range, marker) => {
  return {
    ...range,
    marker: {
      shared: [marker, 'inset-0', 'z-0'],
      start: ['rounded-l-sm'],
      end: ['rounded-r-sm'],
    },
  };
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getMode (mulExp, deduction) {
  return !mulExp ? 'Basic Mode': deduction ? 'Advanced Mode' : 'Balanced Mode'

}