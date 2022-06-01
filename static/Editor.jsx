import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editorModes, setText, toEditMode } from './debuggerSlice';
import { within } from './util';
import * as R from 'ramda';

const App = () => {
  return (
    <div
      className='flex flex-col p-3 overflow-auto'
      style={{ height: 'calc(100vh - 2.5rem)' }}
    >
      <Editor></Editor>
    </div>
  );
};

const Editor = () => {
  const mode = useSelector(R.path(['debugger', 'mode']));
  return (
    <div className='code tracking-wider flex-grow p-2 h-full'>
      {(() => {
        if (mode === editorModes.edit) {
          return <EditorEditMode></EditorEditMode>;
        } else if (mode === editorModes.normal) {
          return <EditorNormerMode></EditorNormerMode>;
        }
      })()}
    </div>
  );
};

const EditorEditMode = () => {
  const text = useSelector(R.path(['debugger', 'text']));
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  return (
    <textarea
      ref={inputEl}
      spellCheck={false}
      className='w-full h-full outline-none my-0.5'
      style={{ resize: 'none', lineHeight: '1.62rem', fontVariantLigatures: 'none' }}
      onChange={e => dispatch(setText(e.target.value))}
      value={text}
    ></textarea>
  );
};

const EditorNormerMode = () => {
  const text = useSelector(R.path(['debugger', 'text']));
  const dispatch = useDispatch();
  return (
    <div className='' onClick={_ => dispatch(toEditMode())}>
      {text.split('\n').map((t, line) => (
        <Line text={t} line={line} key={line}></Line>
      ))}
    </div>
  );
};

const Line = ({ text, line }) => {
  return (
    <div className='h-6 my-0.5'>
      {text.split('').map((t, ch) => (
        <Cell text={t} line={line} ch={ch} key={ch}></Cell>
      ))}
    </div>
  );
};

const Cell = ({ text, line, ch }) => {
  const point = { line, ch };
  const highlights = useSelector(R.path(['debugger', 'highlights']));
  const widgets = useSelector(R.path(['debugger', 'widgets']));
  const deductionStpe = useSelector(R.path(['debugger', 'debuggingSteps']));
  const highlighters = highlights
    .filter(R.curry(within)(point))
    .map((hl, k) => (
      <Highlighter
        highlight={hl}
        line={line}
        ch={ch}
        key={'hl' + k}
      ></Highlighter>
    ));
  const appliedWidgets = R.pipe(
    R.filter(R.pipe(R.prop('relativeTo'), R.equals(point))),
    R.map(wgt => (
      <Widget
        styles={wgt.styles}
        classes={wgt.classes}
        content={wgt.content}
        key={wgt.key}
      ></Widget>
    )),
  )(widgets);

  return (
    <div className='inline-block h-6 relative' style={{ width: '0.6rem' }}>
      {highlighters}
      {deductionStpe ? appliedWidgets : null}
      <div className='absolute w-full h-full z-50'>{text}</div>
    </div>
  );
};

const Widget = ({ styles, classes, content }) => {
  const highlightFilter = useSelector(R.path(['debugger', 'highlightFilter']));
  const numOfSteps = useSelector(R.path(['debugger', 'numOfSteps']));
  const pinnedStep = useSelector(R.path(['debugger', 'pinnedStep']));

  const stepLabelFace =
    pinnedStep === content.step
      ? 'bg-green-400 text-black border-green-400 border bg-green-400'
      : 'bg-gray-200 border border-dashed border-black';
  if (
    highlightFilter.includes('marker1') &&
    !highlightFilter.includes('marker2')
  )
    return null;
  if (
    highlightFilter.includes('marker2') &&
    !highlightFilter.includes('marker1')
  )
    return null;
  if (
    highlightFilter.includes('marker2') &&
    highlightFilter.includes('marker1') &&
    !highlightFilter.includes('markerDefinition')
  )
    return null;

  if (content.type === 'annotation') {
    // this is very cluncky
    if (content.direction === 'LR') {
      return (
        <div
          className={
            'flex items-center justify-center text-gray-400 ' +
            classes.join(' ')
          }
          style={styles}
        >
          <span className='marker1 border border-black inline-block w-2 h-2 rounded-sm mr-1'></span>
          {content.reason}
          <span className='marker2 border border-black inline-block w-2 h-2 rounded-sm ml-1'></span>
          <span className='ml-1 text-gray-500'>(step</span>
          <span
            className={
              'text-black inline-block w-4 h-4 text-xs rounded-full ' +
              stepLabelFace
            }
          >
            {numOfSteps - content.step}
          </span>
          <span className='text-gray-500'>)</span>
        </div>
      );
    } else {
      return (
        <div
          className={
            'flex items-center justify-center  text-gray-400 ' +
            classes.join(' ')
          }
          style={styles}
        >
          <span className='marker2 border border-black inline-block w-2 h-2 rounded-sm mr-1'></span>
          {content.reason}
          <span className='marker1 border border-black inline-block w-2 h-2 rounded-sm ml-1'></span>
          <span className='ml-1 text-gray-500'>(step</span>
          <span
            className={
              'text-black inline-block w-4 h-4 text-xs rounded-full ' +
              stepLabelFace
            }
          >
            {numOfSteps - content.step}
          </span>
          <span className='text-gray-500'>)</span>
        </div>
      );
    }
  } else {
    return <div className={classes.join(' ')} style={styles}></div>;
  }
};

const Highlighter = ({ highlight, line, ch }) => {
  const deductionSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  const highlightFilter = useSelector(R.path(['debugger', 'highlightFilter']));

  const borderResetter =
    deductionSteps && R.equals(highlightFilter, ['markerDefination'])
      ? {}
      : { borderWidth: 0 };

  let classes = highlight.marker.shared;
  if (R.equals(highlight.from, { line, ch })) {
    classes = [...classes, ...highlight.marker.start];
  }
  if (R.equals(highlight.to, { line, ch: ch + 1 })) {
    classes = [...classes, ...highlight.marker.end];
  }

  classes = R.any(f => R.includes(f, classes))(highlightFilter) ? [] : classes;
  return (
    <div
      className={'absolute ' + classes.join(' ')}
      style={borderResetter}
    ></div>
  );
};

export default App;
