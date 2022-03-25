import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  initializeEditor,
  highlight,
  drawAnnotations,
  clearDecorations,
} from './editor';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { unAlias, arrEq } from './helper';
import {
  BASIC_MODE,
  typeCheckThunk,
  switchTaskThunk,
  prevStep,
  nextStep,
  setStep,
} from './store';
import tasks from './code';

let currentTask = 0;
let editor = initializeEditor(tasks[currentTask]);
store.dispatch(switchTaskThunk(currentTask));

editor.on('focus', function(c) {
  // editorData.disableHighlight();
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

document.getElementById('clear').addEventListener('click', _ => {
  // runInAction(() => {
  //   editorData.toggleHighlight();
  // });
});

document.getElementById('skip').addEventListener('click', _ => {
  // runInAction(() => {
  //   if (editorData.currentTaskNum === 8) {
  //     window.location =
  //       'https://docs.google.com/forms/d/e/1FAIpQLSfmXyASOPW2HIK-Oqp5nELBTltKeqZjqQ0G9JFram8eUCx26A/viewform?usp=sf_link';
  //   }
  //   editorData.updateTask(editorData.currentTaskNum + 1);
  // });
});

document.querySelectorAll('.example').forEach(elem => {
  elem.addEventListener('click', e => {
    let taskId = parseInt(e.target.dataset['taskId'], 10);
    editor.setValue(tasks[taskId]);
    store.dispatch(switchTaskThunk(taskId));
  });
});

const Debuger = () => {
  let mode = useSelector(state => state.mode);
  return (
    <div className='p-2 flex flex-col' style={{ fontFamily: 'IBM Plex Sans' }}>
      <div className='mb-2 bg-gray-200 px-2'>
        Current Mode:
        {mode === BASIC_MODE ? 'Basic mode' : 'Interactive mode'}
      </div>
      <Message></Message>
      {mode === BASIC_MODE ? null : <TypingTable></TypingTable>}
    </div>
  );
};

const Message = () => {
  let contextItem = useSelector(state => state.currentContextItem);
  return contextItem === null ? null : (
    <div className='mb-5'>
      <div className='text-md italic my-2'>
        Chameleon cannot infer a type for the expression below:
      </div>

      <div className='my-1 text-sm'>
        Expression:
        <span className='code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block'>
          {contextItem['contextExp']}
        </span>
      </div>
      <div className='my-1 text-sm'>
        <span className='w-14 inline-block'>Type 1: </span>
        <span className='code groupMarkerB rounded-sm px-0.5 cursor-pointer'>
          {unAlias(contextItem['contextType1'])}
        </span>
      </div>
      <div className='my-1 text-sm'>
        <span className='w-14 inline-block'>Type 2: </span>
        <span className='code groupMarkerA rounded-sm px-0.5 cursor-pointer'>
          {unAlias(contextItem['contextType2'])}
        </span>
      </div>
    </div>
  );
};

const TypingTable = () => {
  let dispatch = useDispatch();
  let context = useSelector(state => state.context);
  return (
    <div
      className={'grid gap-1 context-grid text-xs'}
      style={{ fontFamily: 'JetBrains Mono' }}
    >
      <div className='text-center'>
        <ion-icon
          onClick={() => dispatch(prevStep())}
          style={{ fontSize: 20, cursor: 'pointer' }}
          name='arrow-up-circle'
        ></ion-icon>
      </div>
      <div className='text-center'>TYPE 1</div>
      <div className='text-center'>EXPRESSION</div>
      <div className='text-center'>TYPE 2</div>
      {context.map((row, i) => (
        <ContextRow row={row} key={i}></ContextRow>
      ))}
      <div className='text-center'>
        <ion-icon
          onClick={() => dispatch(nextStep())}
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

const ContextRow = ({ row }) => {
  let currentTraverseId = useSelector(state => state.currentTraverseId);
  let steps = useSelector(state => state.steps);
  let dispatch = useDispatch();
  let { contextExp, contextType1, contextType2, contextSteps } = row;
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
        onClick={() => dispatch(setStep(firstReleventStep))}
        className='rounded-sm p-1 groupMarkerB flex justify-center items-center cursor-pointer'
      >
        {unAlias(contextType1)}
      </div>
      <div
        className={
          'rounded-sm p-1 flex justify-center items-center ' + affinityClass
        }
      >
        {contextExp}
      </div>
      <div
        onClick={() => dispatch(setStep(lastReleventStep))}
        className='rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer'
      >
        {unAlias(contextType2)}
      </div>
    </>
  );
};

const Stepper = ({ rowInfo }) => {
  let steps = useSelector(state => state.steps);
  let currentTraverseId = useSelector(state => state.currentTraverseId);
  let stepsInRow = rowInfo.filter(ri => ri[2]);
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
              onClick={() => dispatch(setStep(stepId))}
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
