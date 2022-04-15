import React from 'react';
import ReactDOM from 'react-dom';
import {
  initializeEditor,
  highlight,
  drawAnnotations,
  clearDecorations,
} from './editor';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { arrEq, unAlias } from './helper';
import {
  modes,
  BASIC_MODE,
  FULL_MODE,
  typeCheckThunk,
  switchTaskThunk,
  disableHighlight,
  prevStep,
  nextStep,
  setStep,
} from './store';
import tasks from './code';
import Modal from 'react-modal';
import Split from 'split-grid';


const events = {
  typecheck: 'typeCheck',
  skip: 'skipTask',
  giveup: 'giveUpTask',
  interact: 'interactTools',
  succeed: 'succeedTask',
  open: 'openTask',
};

Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector('#gutter'),
    },
  ],
});

Modal.setAppElement('#debugger');

let currentTask = 0;
let editor = initializeEditor(tasks[currentTask]);
store.dispatch(switchTaskThunk(currentTask));

editor.on('focus', function () {
  store.dispatch(disableHighlight());
});

store.subscribe(() => {
  let {
    currentStep,
    mode,
    showHighlights,
    prevLocs,
    nextLocs,
  } = store.getState();
  let nohighligt = { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } };

  clearDecorations(editor);
  if (!showHighlights) return;
  if (currentStep === null) return;

  if (mode === BASIC_MODE) {
    highlight(
      nohighligt,
      nohighligt,
      [currentStep.locA, ...prevLocs],
      [currentStep.locB, ...nextLocs],
      editor,
    );
  } else {
    highlight(currentStep.locA, currentStep.locB, prevLocs, nextLocs, editor);
    drawAnnotations(
      currentStep.locA,
      currentStep.locB,
      currentStep.text,
      editor,
    );
  }
});

document.getElementById('save').addEventListener('click', _ => {
  let text = editor.getValue();
  store.dispatch(typeCheckThunk(text));
});

document.querySelectorAll('.example').forEach(elem => {
  elem.addEventListener('click', e => {
    let taskId = parseInt(e.target.dataset['taskId'], 10);
    editor.setValue(tasks.at(taskId));
    store.dispatch(switchTaskThunk(taskId));
  });
});

const TypeSig = ({ type }) => {
  if (
    type.tag === 'TypeForm' &&
    type.contents.length === 3 &&
    type.contents.at(0).contents === '[' &&
    type.contents.at(1).contents === 'Char' &&
    type.contents.at(2).contents === ']'
  ) {
    return <span className='inline-block'>String</span>;
  } else if (type.tag === 'TypeForm') {
    return (
      <span className='inline-block'>
        {type.contents.map((t, i) => (
          <TypeSig type={t} key={i}></TypeSig>
        ))}
      </span>
    );
  } else if (type.tag === 'TypeFormPart' && type.contents === ' ') {
    return <span className='inline-block w-1'></span>;
  } else if (type.tag === 'TypeFormPart') {
    return <span className='inline-block'>{type.contents}</span>;
  }
};

const StringTypeSig = ({ simple, full }) => {
  let unlaliasedFull = unAlias(full);
  if (unlaliasedFull.length > 50) {
    return <span>{unAlias(simple)}</span>;
  } else {
    return <span>{unlaliasedFull}</span>;
  }
};


const Debuger = () => {
  let wellTyped = useSelector(state => state.wellTyped);
  let loadError = useSelector(state => state.loadError);
  let parseError = useSelector(state => state.parseError);
  return (
    <>
      {(() => {
        if (wellTyped) {
          return <div className="p-4 flex items-center">
            <ion-icon size="large" style={{ color: 'rgb(74, 222, 128)' }} name="checkmark-circle"></ion-icon>
            <span class="p-2">Congratulations! Your code is well typed.</span>
          </div>
        } else if (parseError !== null) {
          return <ParseErrorReport />;
        } else if (loadError !== null) {
          return <LoadErrorReport />;
        } else if (!wellTyped) {
          return <TypeErrorReport />;
        }
      })()}
    </>
  );
};

const ParseErrorReport = () => {
  let parseError = useSelector(state => state.parseError);
  return (
    <div class='p-4'>
      <p className='py-2 px-4'>A syntax error was found in the code</p>
      <div className='bg-gray-100 py-2 px-4 rounded-md'>
        <p> {parseError.message} </p>
        <p>
          Location: {parseError.loc.srcLine}:{parseError.loc.srcColumn}
        </p>
      </div>
    </div>
  );
};

const LoadErrorReport = () => {
  let loadError = useSelector(state => state.loadError);
  return (
    <div class='p-4'>
      <p className='py-2 px-4'>A variable is used without being declared.</p>
      {loadError.map(m => {
        return (
          <div className='bg-gray-100 py-2 px-4 rounded-md'>
            <p>Variable: {m.at(0)} </p>
            <p>
              Location: {' ' + m.at(1).srcSpanStartLine}:
              {m.at(1).srcSpanStartColumn} -{' ' + m.at(1).srcSpanEndLine}:
              {m.at(1).srcSpanEndColumn}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const TypeErrorReport = () => {
  let mode = useSelector(state => state.mode);
  return (
    <div
      className='p-2 flex flex-col items-start'
      style={{ fontFamily: 'IBM Plex Sans' }}
    >
      <Message></Message>
      <div className='pt-4 text-xs italic'>
        Below are all the expressions (in the middle column) 
        that can cause the type error. 
      </div>
      <div className='pb-2 italic text-xs'>(Use the up and down buttons to verify each fact)</div>

      {mode === BASIC_MODE ? null : <TypingTable></TypingTable>}
    </div>
  );
};

const Message = () => {
  let contextItem = useSelector(state => state.currentContextItem);
  return contextItem === null ? null : (
    <div className='mb-5'>
      <div className='text-md my-2 w-full'>
        <div>It is possible to infer two conflicting types for the expression
          <span className='code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block not-italic'>
            {contextItem['contextExp']}
          </span>:
           </div>
      </div>

      <div className='my-1 text-sm'>
        <span className='w-14 inline-block'>Type 1: </span>
        <span className='code groupMarkerB rounded-sm px-0.5 cursor-pointer'>
          <StringTypeSig
            simple={contextItem.contextType1SimpleString}
            full={contextItem.contextType1String}
          ></StringTypeSig>
        </span>
      </div>
      <div className='text-xs italic'>Type 1 can be infered from the orange highlights on the left side</div>

      <div className='mb-1 mt-2 text-sm'>
        <span className='w-14 inline-block'>Type 2: </span>
        <span className='code groupMarkerA rounded-sm px-0.5 cursor-pointer'>
          <StringTypeSig
            simple={contextItem.contextType2SimpleString}
            full={contextItem.contextType2String}
          ></StringTypeSig>
        </span>
      </div>
      <div className='text-xs italic'>Type 2 can be infered from the blue highlights on the left side</div>

    </div>
  );
};

const TypingTable = () => {
  let dispatch = useDispatch();
  let context = useSelector(state => state.context);
  let currentTaskNum = useSelector(state => state.currentTaskNum);
  let mode = useSelector(state => state.mode)
  return (
    <div
      className={'grid gap-1 context-grid text-xs w-full'}
      style={{ fontFamily: 'JetBrains Mono' }}
    >
      <div className='text-center'>
        <ion-icon
          onClick={() => {

            dispatch(prevStep());
          }}
          style={{ fontSize: 20, cursor: 'pointer' }}
          name='arrow-up-circle'
        ></ion-icon>
      </div>
      <div className='text-center'>TYPE 1</div>
      <div className='text-center'>EXPRESSION</div>
      <div className='text-center'>TYPE 2</div>

      {(() => {
        if (context.length === 0) {
          return <EmptyContextTable></EmptyContextTable>;
        } else {
          return context.map((row, i) => (
            <ContextRow row={row} key={i}></ContextRow>
          ));
        }
      })()}
      <div className='text-center'>
        <ion-icon
          onClick={() => {
            dispatch(nextStep());
          }}
          style={{ fontSize: 20, cursor: 'pointer' }}
          name='arrow-down-circle'
        ></ion-icon>
      </div>
      <div className='text-center'></div>
      <div className='text-center'></div>
      <div className='text-center'></div>
    </div>
  );
};

const EmptyContextTable = () => {
  let steps = useSelector(state => state.steps);
  let currentTraverseId = useSelector(state => state.currentTraverseId);
  let dispatch = useDispatch();
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        {steps.map(({ stepId }, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                dispatch(setStep(i));
              }}
              className={
                'rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center ' +
                (arrEq(stepId, currentTraverseId)
                  ? 'bg-green-400'
                  : 'bg-gray-400')
              }
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div></div>
      <div></div>
      <div></div>
    </>
  );
};

const ContextRow = ({ row }) => {
  let currentTraverseId = useSelector(state => state.currentTraverseId);
  let currentTaskNum = useSelector(state => state.currentTaskNum);
  let steps = useSelector(state => state.steps);
  let mode = useSelector(state => state.mode)
  let dispatch = useDispatch();
  let {
    contextExp,
    contextType1String,
    contextType1SimpleString,
    contextType2String,
    contextType2SimpleString,
    contextSteps,
  } = row;
  let affinity = contextSteps
    .find(step => arrEq(step.at(0), currentTraverseId))
    .at(1);
  let affinityClass =
    affinity === 'R' ? 'sideA' : affinity === 'L' ? 'sideB' : 'sideAB';
  let firstReleventStepTId = contextSteps.find(i => i.at(2)).at(0);
  let lastReleventStepTId = contextSteps
    .slice()
    .reverse()
    .find(i => i.at(2))
    .at(0);

  let firstReleventStep = steps.findIndex(step =>
    arrEq(step['stepId'], firstReleventStepTId),
  );
  let lastReleventStep = steps.findIndex(step =>
    arrEq(step['stepId'], lastReleventStepTId),
  );
  return (
    <>
      <Stepper rowInfo={contextSteps}></Stepper>
      <div
        onClick={() => {
          dispatch(setStep(firstReleventStep));
        }}
        className='rounded-sm p-1 groupMarkerB flex justify-center items-center cursor-pointer'
      >
        <StringTypeSig
          simple={contextType1SimpleString}
          full={contextType1String}
        ></StringTypeSig>{' '}
      </div>
      <div
        className={
          'rounded-sm p-1 flex justify-center items-center ' + affinityClass
        }
      >
        {contextExp}
      </div>
      <div
        onClick={() => {
          dispatch(setStep(lastReleventStep));
        }}
        className='rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer'
      >
        <StringTypeSig
          simple={contextType2SimpleString}
          full={contextType2String}
        ></StringTypeSig>{' '}
      </div>
    </>
  );
};

const Stepper = ({ rowInfo }) => {
  let steps = useSelector(state => state.steps);
  let currentTaskNum = useSelector(state => state.currentTaskNum);
  let currentTraverseId = useSelector(state => state.currentTraverseId);
  let stepsInRow = rowInfo.filter(ri => ri[2]);
  let mode = useSelector(state => state.mode)
  let dispatch = useDispatch();
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        {stepsInRow.map(([traverseId, _z1, _z2]) => {
          let stepId = steps.findIndex(step =>
            arrEq(step['stepId'], traverseId),
          );
          return (
            <div
              key={stepId}
              onClick={() => {
                dispatch(setStep(stepId));
              }}
              className={
                'rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center ' +
                (arrEq(traverseId, currentTraverseId)
                  ? 'bg-green-400'
                  : 'bg-gray-400')
              }
            >
              {stepId + 1}
            </div>
          );
        })}
      </div>
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Debuger></Debuger>
  </Provider>,
  document.getElementById('debugger'),
);
