export function initializeEditor(code) {
  let editor = CodeMirror(document.getElementById('editor'), {
    lineNumbers: true,
    mode: null,
    value: code,
  });
  editor.setSize('100%', 'calc(100vh - 3rem)');
  return editor;
}

export function clearDecorations(editor) {
  if (editor.getAllMarks().length) {
    editor.getAllMarks().forEach(m => m.clear());
  }
  ['widgetTop', 'widgeBottom', 'widgetInbetween', 'widgetAnnotation'].forEach(
    elemId => {
      let elem = document.getElementById(elemId);
      if (elem) elem.parentNode.removeChild(elem);
    },
  );
}

export function highlight(locA, locB, groupA, groupB, editor) {
  groupA.forEach(hl => {
    if (surroundOrIntersect(hl, locA) || surroundOrIntersect(hl, locB)) return;

    editor.markText(hl.from, hl.to, { className: 'groupMarkerA' });
  });

  groupB.forEach(hl => {
    if (surroundOrIntersect(hl, locA) || surroundOrIntersect(hl, locB)) return;

    editor.markText(hl.from, hl.to, { className: 'groupMarkerB' });
  });
  editor.markText(locA.from, locA.to, { className: 'markerA' });
  editor.markText(locB.from, locB.to, { className: 'markerB' });
  if (doesLocSurround(locA, locB)) {
    editor.markText(locB.from, locB.to, { className: 'markerBSmall' });
  }
  if (doesLocSurround(locB, locA)) {
    editor.markText(locB.from, locB.to, { className: 'markerASmall' });
  }
}

export function drawAnnotations(locA, locB, text, editor) {
  if (
    document.getElementsByClassName('markerB').length === 0 ||
    document.getElementsByClassName('markerA').length === 0
  )
    return;
  if (locB.from.line < locA.from.line) {
    // B
    //   A
    const topElem = document
      .getElementsByClassName('markerB')[0]
      .getBoundingClientRect();
    const bottomElem = document
      .getElementsByClassName('markerA')[0]
      .getBoundingClientRect();
    const [topBox, bottomBox, inbetweenBox, annotationBox] = boxStyles(
      topElem,
      bottomElem,
      text,
    );
    editor.addWidget(locA.from, bottomBox);
    editor.addWidget(locA.from, annotationBox);
    editor.addWidget(locB.from, inbetweenBox);
    editor.addWidget(locB.from, topBox);
  } else {
    // A
    //   B
    const topElem = document
      .getElementsByClassName('markerA')[0]
      .getBoundingClientRect();
    const bottomElem = document
      .getElementsByClassName('markerB')[0]
      .getBoundingClientRect();
    const [topBox, bottomBox, inbetweenBox, annotationBox] = boxStyles(
      topElem,
      bottomElem,
      text,
      false,
    );
    editor.addWidget(locA.from, topBox);
    editor.addWidget(locA.from, inbetweenBox);
    editor.addWidget(locB.from, bottomBox);
    editor.addWidget(locB.from, annotationBox);
  }
}

function boxStyles(topElem, bottomElem, text, color = false) {
  const downwardBarHeight = 5;
  const annotationWidth = 300;
  const annotationHeight = 20;
  const stepAsideDistance = 600;
  const styleTop = [
    color ? `background: aquamarine;` : 'background:transparent;',
    `height: ${downwardBarHeight}px;`,
    `margin-left: ${topElem.width / 2}px;`,
    `margin-top: -${topElem.height + downwardBarHeight}px;`,
    `width: ${stepAsideDistance - topElem.left - topElem.width / 2}px;`,
    `border-left: thin solid #4ade80;`,
    `border-top: thin solid #4ade80;`,
    `border-right: thin solid #4ade80;`,

    `z-index:2;`,
  ].join('');
  const styleBottom = [
    color ? `background: lightpink;` : 'background:transparent;',
    `height: ${downwardBarHeight}px;`,
    `margin-left: ${bottomElem.width / 2}px;`,
    `width:${stepAsideDistance - bottomElem.left - bottomElem.width / 2}px;`,
    `border-left: thin solid #4ade80;`,
    `border-bottom: thin solid #4ade80;`,
    `border-right: thin solid #4ade80;`,
    `z-index:2;`,
  ].join('');
  const styleInbetween = [
    color ? `background: burlywood;` : 'background:transparent;',
    `width:${stepAsideDistance - topElem.left - topElem.width / 2}px;`,
    `height: ${bottomElem.top - topElem.top}px;`,
    `margin-top: -${topElem.height}px;`,
    `margin-left: ${topElem.width / 2}px;`,
    `border-right: thin solid #4ade80;`,
    `z-index:2;`,
  ].join('');
  const styleAnnotation = [
    color ? `background: lightgreen;` : 'background:transparent;',
    // `background: beige;`,
    `width:${annotationWidth}px;`,
    `height: ${annotationHeight}px;`,
    `font-size: 14px;`,
    `text-align: center;`,
    `margin-top: -${annotationHeight}px;`,
    `margin-left: ${stepAsideDistance -
      bottomElem.left -
      annotationWidth / 2}px;`,
    `z-index:2;`,
    // `border: thin solid red;`
  ].join('');
  const topBox = html(`<div id="widgetTop" style="${styleTop}"></div>`);
  const bottomBox = html(`<div id="widgeBottom" style="${styleBottom}"></div>`);
  const inbetweenBox = html(
    `<div id="widgetInbetween" style="${styleInbetween}"></div>`,
  );
  const annotationBox = html(
    `<div id="widgetAnnotation"  style="${styleAnnotation}">${text}</div>`,
  );
  return [topBox, bottomBox, inbetweenBox, annotationBox];
}

function html(str) {
  const placeholder = document.createElement('div');
  placeholder.innerHTML = str;
  return placeholder.firstElementChild;
}

function isPointBefore(point1, point2) {
  if (point1.line < point2.line) return true;
  else if (point1.line === point2.line) return point1.ch <= point2.ch;
  else return false;
}

function isPointAfter(point1, point2) {
  if (point1.line > point2.line) return true;
  else if (point1.line === point2.line) return point1.ch >= point2.ch;
  else return false;
}

function doesLocSurround(locA, locB) {
  return isPointBefore(locA.from, locB.from) && isPointAfter(locA.to, locB.to);
}

function surroundOrIntersect(a, b) {
  return (
    doesLocSurround(a, b) || doesLocSurround(b, a) || doesLocIntersect(a, b)
  );
}

function doesLocIntersect(locA, locB) {
  return (
    (isPointBefore(locA.from, locB.from) &&
      isPointBefore(locB.from, locA.to) &&
      isPointBefore(locA.to, locB.to) &&
      isPointBefore(locB.from, locA.to)) ||
    (isPointBefore(locB.from, locA.from) &&
      isPointBefore(locA.from, locB.to) &&
      isPointBefore(locB.to, locA.to) &&
      isPointBefore(locA.from, locB.to))
  );
}

function getIntersection(locA, locB) {
  if (isPointBefore(locA.from, locB.from)) {
    return { from: locB.from, to: locA.to };
  } else {
    return { from: locA.from, to: locB.to };
  }
}
