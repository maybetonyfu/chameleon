import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editorModes, toEditMode, toNormalMode, setText } from './debuggerSlice';
import { within } from './util';
import * as R from 'ramda';
import { PencilAltIcon, EyeIcon } from "@heroicons/react/solid"

const App = () => {
  // const dispatch = useDispatch();
  return (
    <div className='flex flex-col p-3 overflow-auto' style={{height: 'calc(100vh - 2.5rem)'}}>
      <Editor></Editor>
    </div>
  );
};

const Editor = () => {
  const mode = useSelector(R.path(['debugger', 'mode']));
  return (
    <div className='code tracking-wider flex-grow p-2'>
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
  return (
    <textarea
      className='w-full h-full'
      style={{ resize: 'none' }}
      onChange={e => dispatch(setText(e.target.value))}
      value={text}
    ></textarea>
  );
};

const EditorNormerMode = () => {
  const text = useSelector(R.path(['debugger', 'text']));
  return (
    <div className="">
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
    <div className='inline-block w-2.5 h-6 relative'>
      {highlighters}
      {appliedWidgets}
      <div className='absolute w-full h-full z-50'>{text}</div>
    </div>
  );
};

const Widget = ({ styles, classes, content }) => {
  if (content.type === 'annotation') {
    if (content.direction === 'LR') {
      return (
        <div className={'flex items-center ' + classes.join(' ')} style={styles}>
          <span className='marker1 border border-black inline-block w-2 h-2 rounded-sm mr-1'></span>
          {content.reason}
          <span className='marker2 border border-black inline-block w-2 h-2 rounded-sm ml-1'></span>
          <span className='ml-1 text-gray-400'>(step</span>
          <span className='bg-green-400 inline-block w-4 h-4 text-xs rounded-full'>
          {content.step + 1}
          </span>
          <span className='text-gray-400'>)</span>
        </div>
      );
    } else {
      return (
        <div className={'flex items-center ' + classes.join(' ')} style={styles}>
          <span className='marker2 border border-black inline-block w-2 h-2 rounded-sm mr-1'></span>
          {content.reason}
          <span className='marker1 border border-black inline-block w-2 h-2 rounded-sm ml-1'></span>
          <span className='ml-1 text-gray-400'>(step</span>
          <span className='bg-green-400 inline-block w-4 h-4 text-xs rounded-full'>
            {content.step + 1}
          </span>
          <span className='text-gray-400'>)</span>
        </div>
      );
    }
  } else {
    return <div className={classes.join(' ')} style={styles}></div>;
  }
};

const Highlighter = ({ highlight, line, ch }) => {
  let classes = highlight.marker.shared;
  if (R.equals(highlight.from, { line, ch })) {
    classes = [...classes, ...highlight.marker.start];
  }
  if (R.equals(highlight.to, { line, ch: ch + 1 })) {
    classes = [...classes, ...highlight.marker.end];
  }
  return <div className={'absolute ' + classes.join(' ')}></div>;
};

export default App