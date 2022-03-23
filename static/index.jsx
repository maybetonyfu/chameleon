import React, {  useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  initializeEditor,
  highlight,
  drawAnnotations,
  clearDecorations,
} from './editor';
import { Provider ,  useSelector, useDispatch} from 'react-redux'
import store from './store'
import {BASIC_MODE, typeCheckThunk} from './store' 

// editorData.editor.on('focus', function (c) {
//   editorData.disableHighlight();
// });

store.dispatch(typeCheckThunk(3))

document.getElementById('save').addEventListener('click', _ => {
  // let text = editorData.editor.getValue();
  // runInAction(() => {
  //   editorData.updateText(text);
  // });
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

// autorun(() => {
//   let nohighligt = { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } };
//   let editor = editorData.editor;
//   let currentStep = editorData.currentStep;
//   clearDecorations(editor);
//   if (!editorData.showHighlights) return;
//   if (editorData.currentStep === null) return;
//   if (editorData.mode[editorData.currentTaskNum] === BASIC_MODE) {
//     highlight(
//       nohighligt,
//       nohighligt,
//       [currentStep.locA, ...editorData.prevLocs],
//       [currentStep.locB, ...editorData.nextLocs],
//       editor,
//     );
//   } else {
//     highlight(
//       currentStep.locA,
//       currentStep.locB,
//       editorData.prevLocs,
//       editorData.nextLocs,
//       editor,
//     );
//     drawAnnotations(
//       currentStep.locA,
//       currentStep.locB,
//       currentStep.text,
//       editor,
//     );
//   }
// });

const Debuger = () => {
  let mode = useSelector(state => state.mode)
  return (
    <div className='p-2 flex flex-col' style={{ fontFamily: 'IBM Plex Sans' }}>
      <div className='mb-2 bg-gray-200 px-2'>
        Current Mode: 
        {mode === BASIC_MODE
          ? 'Basic mode'
          : 'Interactive mode'}
      </div>
      {/* <Message></Message>
      {data.mode[data.currentTaskNum] === BASIC_MODE ? null : (
        <TypingTable></TypingTable>
      )} */}
    </div>
  );
};

const Message = () => {
  let data = useContext(DataContext);
  return data.currentContextItem === null ? null : (
    <div className='mb-5'>
      <div className='text-md italic my-2'>
        Chameleon cannot infer a type for the expression below:
      </div>

      <div className='my-1 text-sm'>
        Expression:
        <span className='code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block'>
          {data.currentContextItem['contextExp']}
        </span>
      </div>
      <div className='my-1 text-sm'>
        <span className='w-14 inline-block'>Type 1: </span>
        <span className='code groupMarkerB rounded-sm px-0.5 cursor-pointer'>
          {unAlias(data.currentContextItem['contextType1'])}
        </span>
      </div>
      <div className='my-1 text-sm'>
        <span className='w-14 inline-block'>Type 2: </span>
        <span className='code groupMarkerA rounded-sm px-0.5 cursor-pointer'>
          {unAlias(data.currentContextItem['contextType2'])}
        </span>
      </div>
    </div>
  );
}

const TypingTable = () => {
  let data = useContext(DataContext);
  return (
    <div
      className={'grid gap-1 context-grid text-xs'}
      style={{ fontFamily: 'JetBrains Mono' }}
    >
      <div className='text-center'>
        <ion-icon
          onClick={action(_ => data.prevStep())}
          style={{ fontSize: 20, cursor: 'pointer' }}
          name='arrow-up-circle'
        ></ion-icon>
      </div>
      <div className='text-center'>TYPE 1</div>
      <div className='text-center'>EXPRESSION</div>
      <div className='text-center'>TYPE 2</div>
      {data.context.map((row, i) => (
        <ContextRow row={row} key={i}></ContextRow>
      ))}
      <div className='text-center'>
        <ion-icon
          onClick={action(_ => data.nextStep())}
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
  let data = useContext(DataContext);
  let { contextExp, contextType1, contextType2, contextSteps } = row;
  let [a, b] = data.currentTraverseId;
  let affinity = contextSteps.find(([[x, y], u, v]) => x === a && y === b)[1];
  let affinityClass =
    affinity === 'R' ? 'sideA' : affinity === 'L' ? 'sideB' : 'sideAB';
  let firstReleventStepTId = contextSteps.find(i => i[2])[0];
  let lastReleventStepTId = contextSteps
    .slice()
    .reverse()
    .find(i => i[2])[0];
  let firstReleventStep = data.steps.findIndex(step =>
    arrEq(step['stepId'], firstReleventStepTId),
  );
  let lastReleventStep = data.steps.findIndex(step =>
    arrEq(step['stepId'], lastReleventStepTId),
  );
  return (
    <>
      <Stepper rowInfo={contextSteps}></Stepper>
      <div
        onClick={action(_ => {
          data.setStep(firstReleventStep);
        })}
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
        onClick={action(_ => {
          data.setStep(lastReleventStep);
        })}
        className='rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer'
      >
        {unAlias(contextType2)}
      </div>
    </>
  );
}

const Stepper = ({ rowInfo }) => {
  let data = useContext(DataContext);
  let [a, b] = data.currentTraverseId;
  let steps = rowInfo.filter(ri => ri[2]);
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        {steps.map(([[x, y], _z1, _z2]) => {
          let stepId = data.steps.findIndex(step =>
            arrEq(step['stepId'], [x, y]),
          );
          return (
            <div
              key={x.toString() + y.toString()}
              onClick={action(_ => {
                data.setStep(stepId);
              })}
              className={
                'rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center ' +
                (a === x && b === y ? 'bg-green-400' : 'bg-gray-400')
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
