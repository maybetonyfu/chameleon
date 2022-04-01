// import.meta.hot;
import {
  createAction,
  configureStore,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import tasks from './code';
import { arrEq } from './helper';

export const nextRound = createAction('nextRound');

export const nextStep = createAction('nextStep');
export const prevStep = createAction('prevStep');
export const setStep = createAction('setStep');
export const resetStep = createAction('resetStep');

export const nextTask = createAction('nextTask');
export const prevTask = createAction('prevTask');
export const setTask = createAction('setTask');
export const skipTask = createAction('skipTask');

export const enableHighlight = createAction('enableHighlight');
export const disableHighlight = createAction('disableHighlight');

export const BASIC_MODE = 'basic';
export const FULL_MODE = 'full';
const backendUrl = '';
const devTools = false;
const modes =
  Math.random() > 0.5
    ? Array.from({ length: 4 }).flatMap(_ => [BASIC_MODE, FULL_MODE])
    : Array.from({ length: 4 }).flatMap(_ => [FULL_MODE, BASIC_MODE]);

const initialState = {
  currentStepNum: null,
  currentStep: null,
  currentTraverseId: null,
  currentContextItem: null,
  steps: [],
  context: [],
  numOfSteps: 0,
  numOfContextRows: 0,
  prevLocs: [],
  nextLocs: [],
  showHighlights: true,
  wellTyped: false,
  currentTaskNum: null,
  mode: null,
  loadError: null,
  parseError: null,
  pending: [0, 1, 2, 3, 4, 5, 6, 7],
  round: 1,
};

export let typeCheckThunk = createAsyncThunk(
  'typeCheck',
  async (text, { dispatch }) => {
    let response = await fetch(backendUrl + '/typecheck', {
      method: 'POST',
      body: text,
    });
    let data = response.json();
    return data;
  },
);

export let switchTaskThunk = createAsyncThunk(
  'switchTask',
  async (n, { dispatch }) => {
    dispatch(setTask(n));
    let text = tasks[n];
    dispatch(typeCheckThunk(text));
  },
);

export let switchTaskNextRoundThunk = createAsyncThunk(
  'switchTaskNextRound',
  async (n, { dispatch }) => {
    dispatch(nextRound());
    dispatch(setTask(n));
    let text = tasks[n];
    dispatch(typeCheckThunk(text));
  },
);

const appReducer = createReducer(initialState, builder => {
  builder
    .addCase(setTask, (state, action) => {
      if (action.payload < 0 || action.payload > 7) return state;
      let currentTaskNum = action.payload;
      let mode = modes[currentTaskNum];
      let pending = state.pending;
      return Object.assign(
        {},
        {
          ...initialState,
          mode,
          currentTaskNum,
          pending,
          round: state.round,
        },
      );
    })
    .addCase(setStep, (state, action) => {
      if (state.currentStepNum === null) return state;
      if (action.payload > state.numOfSteps - 1 || action.payload < 0)
        return state;
      if (state.mode === BASIC_MODE) return state;

      let currentStepNum = action.payload;
      let currentStep = convertStep(
        state.steps[currentStepNum],
        currentStepNum,
      );
      let currentTraverseId = state.steps[currentStepNum].stepId;
      let currentContextItem = getCurrentActiveContext(
        state.context,
        currentTraverseId,
      );
      let prevLocs = getPrevLocs(state.steps, currentStepNum);
      let nextLocs = getNextLocs(state.steps, currentStepNum);

      return Object.assign(
        {},
        {
          ...state,
          currentStepNum,
          currentStep,
          currentTraverseId,
          currentContextItem,
          prevLocs,
          nextLocs,
        },
      );
    })
    .addCase(nextStep, (state, action) => {
      if (state.currentStepNum === null) return state;
      if (state.currentStepNum >= state.numOfSteps - 1) return state;
      if (state.mode === BASIC_MODE) return state;

      let currentStepNum = state.currentStepNum + 1;
      let currentStep = convertStep(
        state.steps[currentStepNum],
        currentStepNum,
      );
      let currentTraverseId = state.steps[currentStepNum].stepId;
      let currentContextItem = getCurrentActiveContext(
        state.context,
        currentTraverseId,
      );
      let prevLocs = getPrevLocs(state.steps, currentStepNum);
      let nextLocs = getNextLocs(state.steps, currentStepNum);
      return Object.assign(
        {},
        {
          ...state,
          currentStepNum,
          currentStep,
          currentTraverseId,
          currentContextItem,
          prevLocs,
          nextLocs,
        },
      );
    })
    .addCase(prevStep, (state, action) => {
      if (state.currentStepNum === null) return state;
      if (state.currentStepNum <= 0) return state;
      if (state.mode === BASIC_MODE) return state;

      let currentStepNum = state.currentStepNum - 1;
      let currentStep = convertStep(
        state.steps[currentStepNum],
        currentStepNum,
      );
      let currentTraverseId = state.steps[currentStepNum].stepId;
      let currentContextItem = getCurrentActiveContext(
        state.context,
        currentTraverseId,
      );
      let prevLocs = getPrevLocs(state.steps, currentStepNum);
      let nextLocs = getNextLocs(state.steps, currentStepNum);
      return Object.assign(
        {},
        {
          ...state,
          currentStepNum,
          currentStep,
          currentTraverseId,
          currentContextItem,
          prevLocs,
          nextLocs,
        },
      );
    })
    .addCase(enableHighlight, (state, action) => {
      return Object.assign({}, { ...state, showHighlights: true });
    })
    .addCase(disableHighlight, (state, action) => {
      return Object.assign({}, { ...state, showHighlights: false });
    })
    .addCase(typeCheckThunk.fulfilled, (state, action) => {
      if (action.payload.tag === 'ChTypeError') {
        let steps = action.payload.steps;
        let context = action.payload.contextTable;
        let currentStepNum =
          state.mode === BASIC_MODE ? Math.floor(steps.length / 2) : 0;
        let currentStep = convertStep(steps[currentStepNum], currentStepNum);
        let currentTraverseId = steps[currentStepNum].stepId;

        let currentContextItem = getCurrentActiveContext(
          context,
          currentTraverseId,
        );

        let numOfSteps = steps.length;
        let numOfContextRows = context.length;
        let prevLocs = getPrevLocs(steps, currentStepNum);
        let nextLocs = getNextLocs(steps, currentStepNum);
        let showHighlights = true;
        return Object.assign(
          {},
          {
            ...state,
            steps,
            numOfSteps,
            numOfContextRows,
            context,
            currentStepNum,
            currentStep,
            currentTraverseId,
            currentContextItem,
            prevLocs,
            nextLocs,
            showHighlights,
            parseError: null,
            loadError: null,
          },
        );
      } else if (action.payload.tag === 'ChSuccess') {
        let pending = state.pending.filter(n => n !== state.currentTaskNum);
        return Object.assign(
          {},
          {
            ...state,
            wellTyped: true,
            parseError: null,
            loadError: null,
            pending,
          },
        );
      } else if (action.payload.tag === 'ChLoadError') {
        let loadError = action.payload.missing;
        return Object.assign(
          {},
          {
            ...state,
            loadError,
            parseError: null,
          },
        );
      } else if (action.payload.tag === 'ChParseError') {
        let parseError = {
          message: action.payload.message,
          loc: action.payload.loc,
        };
        return Object.assign(
          {},
          {
            ...state,
            parseError,
            loadError: null,
          },
        );
      }
    })
    .addCase(nextRound, (state, action) => {
      return Object.assign(
        {},
        {
          ...state,
          round: 2,
        },
      );
    })
    .addCase(typeCheckThunk.rejected, (state, action) => {
      return state;
    });
});

const store = configureStore({
  reducer: appReducer,
  devTools,
});

export default store;

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
  return (
    loc1.from.line === loc2.from.line &&
    loc1.from.ch === loc2.from.ch &&
    loc1.to.line === loc2.to.line &&
    loc1.to.ch === loc2.to.ch
  );
}

function getCurrentActiveContext(contexts, currentTraverseId) {
  let item = contexts.find(c => {
    return c.contextSteps.find(x => arrEq(x.at(0), currentTraverseId)).at(2);
  });
  return item === undefined ? null : item;
}

function getPrevLocs(steps, currentNum) {
  if (steps.length === 0) return [];
  let { locA, locB } = convertStep(steps[currentNum], currentNum);
  return steps
    .filter((_, i) => i < currentNum)
    .map(step => convertStep(step, 0))
    .flatMap(step => [step.locA, step.locB])
    .filter(l => !(locEq(l, locA) || locEq(l, locB)));
}

function getNextLocs(steps, currentNum) {
  if (steps.length === 0) return [];
  let { locA, locB } = convertStep(steps[currentNum], currentNum);
  return steps
    .filter((_, i) => i > currentNum)
    .map(step => convertStep(step, 0))
    .flatMap(step => [step.locA, step.locB])
    .filter(l => !(locEq(l, locA) || locEq(l, locB)));
}

function convertStep(step, stepNum) {
  let reason = step['explanation'];
  let text;
  let direction = step['order'];
  let locA = convertLocation(step['stepA']);
  let locB = convertLocation(step['stepB']);
  if (direction === 'LR') {
    text = `
          <span class="markerA inline-block w-2 h-2 rounded-sm"></span>
          ${reason}
          <span class="markerB inline-block w-2 h-2 rounded-sm"></span>
          <span class="text-xs text-gray-400">(step</span>
          <span class="bg-green-400 inline-block w-4 h-4 text-xs rounded-full">${stepNum +
            1}</span><span class="font-xs text-gray-400">)</span>
  `;
  } else {
    text = `
          <span class="markerB inline-block w-2 h-2 rounded-sm"></span>
          ${reason}
          <span class="markerA inline-block w-2 h-2 rounded-sm"></span>
          <span class="text-xs text-gray-400">(step</span>
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
