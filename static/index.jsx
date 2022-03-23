import.meta.hot;
import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  observable,
  computed,
  action,
  makeObservable,
  autorun,
  runInAction,
  flow,
} from 'mobx';
import { observer } from 'mobx-react-lite';
import {
  initializeEditor,
  highlight,
  drawAnnotations,
  clearDecorations,
} from './editor';
import tasks from './code';

function convertLocation({
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

function locEq(loc1, loc2) {
  return JSON.stringify(loc1) === JSON.stringify(loc2);
}

function arrEq(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((item, index) => item === array2[index])
  );
}

const BASIC_MODE = 'basic';
const FULL_MODE = 'full';

function convertStep(step, stepNum) {
  let reason = step['explanation'];
  let text;
  let direction = step['order'];
  let locA = convertLocation(step['stepA']);
  let locB = convertLocation(step['stepB']);
  if (direction === 'LR') {
    text = `
        <span class="markerA inline-block w-3 h-3 rounded-sm"></span>
        ${reason}
        <span class="markerB inline-block w-3 h-3 rounded-sm"></span>
        <span class="font-xs text-gray-400">(step</span>
        <span class="bg-green-400 inline-block w-4 h-4 text-xs rounded-full">${stepNum +
          1}</span><span class="font-xs text-gray-400">)</span>
`;
  } else {
    text = `
        <span class="markerB inline-block w-3 h-3 rounded-sm"></span>
        ${reason}
        <span class="markerA inline-block w-3 h-3 rounded-sm"></span>
        <span class="font-xs text-gray-400">(step</span>
        <span class="bg-green-400 inline-block w-4 h-4 text-xs rounded-full">${stepNum +
          1}</span><span class="font-xs text-gray-400">)</span>
`;
  }
  return {
    locA,
    locB,
    text,
  };
}

function unAlias(str) {
  return str.replaceAll('[Char]', 'String');
}

const DataContext = createContext();

class EditorData {
  backendUrl =
    __SNOWPACK_ENV__.MODE === 'development' ? 'http://localhost:3000' : '';
  _currentStepNum = 0;
  steps = [];
  context = [];
  showHighlights = true;
  editor = initializeEditor('');
  currentTaskNum = 0;
  mode =
    Math.random() > 0.5
      ? Array.from({ length: 4 }).flatMap(_ => [BASIC_MODE, FULL_MODE])
      : Array.from({ length: 4 }).flatMap(_ => [FULL_MODE, BASIC_MODE]);
  constructor() {
    makeObservable(this, {
      _currentStepNum: observable,
      currentTaskNum: observable,
      mode: observable,
      steps: observable,
      context: observable,
      showHighlights: observable,
      editor: false,
      backendUrl: false,
      // methods
      currentStepNum: computed,
      currentTraverseId: computed,
      currentContextItem: computed,
      allTraverseIds: computed,
      currentStep: computed,
      numOfSteps: computed,
      numOfContextRows: computed,
      prevLocs: computed,
      nextLocs: computed,
      isLastStep: computed,
      isFirstStep: computed,
      updateText: flow,
      updateTask: flow,
      toggleHighlight: action,
      nextStep: action,
      prevStep: action,
      setStep: action,
      disableHighlight: action,
      enableHighlight: action,
    });
    runInAction(() => {
      this.updateTask(0);
    });
  }
  get currentStepNum() {
    if (this.numOfSteps === 0) return null;
    if (this.mode[this.currentTaskNum] === BASIC_MODE) {
      return Math.ceil(this.numOfSteps / 2);
    } else {
      return this._currentStepNum;
    }
  }

  get currentStep() {
    if (this.numOfSteps === 0) return null;
    let step = this.steps[this.currentStepNum];
    return convertStep(step, this.currentStepNum);
  }

  get currentContextItem() {
    if (this.numOfSteps === 0) return null;

    return this.context.find(c => {
      return c['contextSteps'].find(ri =>
        arrEq(this.currentTraverseId, ri[0]),
      )[2];
    });
  }
  get currentTraverseId() {
    if (this.numOfSteps === 0) return null;
    console.log(this.currentStepNum);
    return this.steps[this.currentStepNum]['stepId'];
  }
  get allTraverseIds() {
    return this.steps.map(s => s['stepId']);
  }
  get prevLocs() {
    return this.steps
      .filter((_, i) => i < this.currentStepNum)
      .map(convertStep)
      .flatMap(s => [s.locA, s.locB])
      .filter(
        l =>
          !(locEq(l, this.currentStep.locA) || locEq(l, this.currentStep.locB)),
      );
  }
  get nextLocs() {
    return this.steps
      .filter((_, i) => i > this.currentStepNum)
      .map(convertStep)
      .flatMap(s => [s.locA, s.locB])
      .filter(
        l =>
          !(locEq(l, this.currentStep.locA) || locEq(l, this.currentStep.locB)),
      );
  }

  get isLastStep() {
    return this.currentStepNum === this.numOfSteps - 1;
  }
  get isFirstStep() {
    return this.currentStepNum === 0;
  }
  get numOfSteps() {
    return this.steps.length;
  }
  get numOfContextRows() {
    return this.context.length;
  }
  *updateTask(n) {
    this.currentTaskNum = n;
    let text = tasks[n];
    this.editor.setValue(text);
    this.context = [];
    this.steps = [];
    let response = yield fetch(this.backendUrl + '/typecheck', {
      method: 'POST',
      body: text,
    });
    let data = yield response.json();
    if (data.tag === 'ChSuccess') {
      if (this.currentTaskNum === 8) {
        alert(
          'Congratulations, you solved all the type errors! Leave us some feedback',
        );
      }
      alert(
        'Congratulations, you fixed the error. Head over to the next challenge!',
      );
      this.updateTask(this.currentTaskNum + 1);
    } else if (data.tag === 'ChTypeError') {
      this._currentStepNum = 0;
      this.steps = data.steps;
      this.context = data.contextTable;
      this.showHighlights = true;
    }
  }
  *updateText(text) {
    this.context = [];
    this.steps = [];
    let response = yield fetch(this.backendUrl + '/typecheck', {
      method: 'POST',
      body: text,
    });
    let data = yield response.json();
    if (data.tag === 'ChSuccess') {
      if (this.currentTaskNum === 8) {
        alert(
          'Congratulations, you solved all the type errors! Leave us some feedback',
        );
      }
      alert(
        'Congratulations, you fixed the error. Head over to the next challenge!',
      );
      this.updateTask(this.currentTaskNum + 1);
    } else if (data.tag === 'ChTypeError') {
      this._currentStepNum = 0;
      this.steps = data.steps;
      this.context = data.contextTable;
      this.showHighlights = true;
    }
  }
  toggleHighlight() {
    this.showHighlights = !this.showHighlights;
  }
  disableHighlight() {
    this.showHighlights = false;
  }
  enableHighlight() {
    this.showHighlights = true;
  }
  nextStep() {
    if (this.isLastStep) {
      return;
    } else {
      this._currentStepNum = this.currentStepNum + 1;
    }
  }
  prevStep() {
    if (this.isFirstStep) {
      return;
    } else {
      this._currentStepNum = this.currentStepNum - 1;
      return;
    }
  }
  setStep(n) {
    if (n < 0 || n > this.numOfSteps - 1) {
      return;
    } else {
      this._currentStepNum = n;
      return;
    }
  }
}

let editorData = new EditorData();

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    console.log('key up');
    runInAction(() => {
      editorData.prevStep();
    });
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    console.log('key down');
    runInAction(() => {
      editorData.nextStep();
    });
  }
});

editorData.editor.on('focus', function(c) {
  editorData.disableHighlight();
});

document.getElementById('save').addEventListener('click', _ => {
  let text = editorData.editor.getValue();
  runInAction(() => {
    editorData.updateText(text);
  });
});

document.getElementById('clear').addEventListener('click', _ => {
  runInAction(() => {
    editorData.toggleHighlight();
  });
});

document.getElementById('skip').addEventListener('click', _ => {
  runInAction(() => {
    if (editorData.currentTaskNum === 8) {
      window.location =
        'https://docs.google.com/forms/d/e/1FAIpQLSfmXyASOPW2HIK-Oqp5nELBTltKeqZjqQ0G9JFram8eUCx26A/viewform?usp=sf_link';
    }
    editorData.updateTask(editorData.currentTaskNum + 1);
  });
});

autorun(() => {
  let nohighligt = { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } };
  let editor = editorData.editor;
  let currentStep = editorData.currentStep;
  clearDecorations(editor);
  if (!editorData.showHighlights) return;
  if (editorData.currentStep === null) return;
  if (editorData.mode[editorData.currentTaskNum] === BASIC_MODE) {
    highlight(
      nohighligt,
      nohighligt,
      [currentStep.locA, ...editorData.prevLocs],
      [currentStep.locB, ...editorData.nextLocs],
      editor,
    );
  } else {
    highlight(
      currentStep.locA,
      currentStep.locB,
      editorData.prevLocs,
      editorData.nextLocs,
      editor,
    );
    drawAnnotations(
      currentStep.locA,
      currentStep.locB,
      currentStep.text,
      editor,
    );
  }
});

const Debuger = observer(() => {
  let data = useContext(DataContext);

  return (
    <div className='p-2 flex flex-col' style={{ fontFamily: 'IBM Plex Sans' }}>
      <div className='mb-2 bg-gray-200 px-2'>
        Current Mode:{' '}
        {data.mode[data.currentTaskNum] === BASIC_MODE
          ? 'Basic mode'
          : 'Interactive mode'}
      </div>
      <Message></Message>
      {data.mode[data.currentTaskNum] === BASIC_MODE ? null : (
        <TypingTable></TypingTable>
      )}
    </div>
  );
});

const Message = observer(() => {
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
});

const TypingTable = observer(() => {
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
});

const ContextRow = observer(({ row }) => {
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
});

const Stepper = observer(({ rowInfo }) => {
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
});

ReactDOM.render(
  <DataContext.Provider value={editorData}>
    <Debuger></Debuger>
  </DataContext.Provider>,
  document.getElementById('debugger'),
);
