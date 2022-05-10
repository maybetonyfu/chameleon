import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasks from './code';
import * as R from 'ramda';
import {
  drawAnnotations,
  makeParentHighlightB,
  makeHighlightB,
  makeHighlight,
  doesRangeSurround,
} from './util';

export const editorModes = {
  edit: 0,
  normal: 1,
};

export let typeCheckThunk = createAsyncThunk(
  'typeCheck',
  async (_, { dispatch, getState }) => {
    dispatch(resetHighlights());
    let state = getState();
    let text = state.debugger.text;
    // console.log(text);
    let response = await fetch('/typecheck', {
      method: 'POST',
      body: text,
    });
    let data = response.json();
    return data;
  },
);

export let toggleMultileExpThunk = createAsyncThunk('multipleExpThunk',
  async (_, { dispatch , getState}) => {
    let state = getState();
    let newStep = Math.floor(state.debugger.steps.length / 2)
    if (state.debugger.multipleExps) {
      dispatch(setStep(newStep))
    }
    dispatch(toggleMultipleExps());
    return null
  })

export let switchTaskThunk = createAsyncThunk(
  'switchTask',
  async (n, { dispatch }) => {
    dispatch(setTask(n));
    dispatch(typeCheckThunk(null));
  },
);

const initialState = {
  currentStepNum: null,
  text: '',
  longestLine: 0,
  currentTraverseId: null,
  currentContextItem: null,
  steps: [],
  context: [],
  numOfSteps: 0,
  numOfContextRows: 0,
  prevLocs: [],
  nextLocs: [],
  currentTaskNum: null,
  wellTyped: false,
  loadError: null,
  parseError: null,
  mode: editorModes.normal,
  widgets: [],
  highlights: [],
  debuggingSteps: true,
  multipleExps: true,
};

const { actions, reducer } = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toEditMode: R.assoc('mode', editorModes.edit),
    toNormalMode: R.assoc('mode', editorModes.normal),
    toggleDebuggerStpes: R.modify('debuggingSteps', R.not),
    toggleMultipleExps: R.modify('multipleExps', R.not),
    setText(state, action) {
      state.text = action.payload;
    },
    setTask(state, action) {
      if (action.payload < 0 || action.payload > tasks.length) return state;
      state.currentTaskNum = action.payload;
      state.text = tasks[action.payload];
      console.log(tasks[action.payload]);
      // state.longestLine = .split('\n').map(line => line.split('').length).sort().reverse()[0]
      state.longestLine = R.pipe(
        R.split('\n'),
        R.map(R.split('')),
        R.map(R.length),
        R.sort(R.subtract),
        R.reverse,
        R.head,
      )(tasks[action.payload]);
    },
    setStep(state, action) {
      if (state.currentStepNum === null) return state;
      if (action.payload > state.numOfSteps - 1 || action.payload < 0)
        return state;

      let currentStepNum = action.payload;
      let { highlights, widgets } = convertStep(
        state.steps[currentStepNum],
        currentStepNum,
        state.longestLine,
      );

      let currentTraverseId = state.steps[currentStepNum].stepId;
      let currentContextItem = getCurrentActiveContext(
        state.context,
        currentTraverseId,
      );

      state.currentStepNum = currentStepNum;
      state.highlights = [
        ...highlights,
        ...getPrevLocs(state.steps, currentStepNum),
        ...getNextLocs(state.steps, currentStepNum),
      ];
      state.widgets = widgets;

      state.currentContextItem = currentContextItem;
      state.currentTraverseId = currentTraverseId;
    },
    resetHighlights(state) {
      state.highlights = [];
      state.widgets = [];
    },
    prevStep(state, action) {
      if (state.currentStepNum === null) return state;
      if (state.currentStepNum <= 0) return state;

      let currentStepNum = state.currentStepNum - 1;
      let { highlights, widgets } = convertStep(
        state.steps[currentStepNum],
        currentStepNum,
        state.longestLine,
      );
      let currentTraverseId = state.steps[currentStepNum].stepId;
      let currentContextItem = getCurrentActiveContext(
        state.context,
        currentTraverseId,
      );

      state.currentStepNum = currentStepNum;
      state.highlights = [
        ...highlights,
        ...getPrevLocs(state.steps, currentStepNum),
        ...getNextLocs(state.steps, currentStepNum),
      ];
      state.widgets = widgets;

      state.currentContextItem = currentContextItem;
      state.currentTraverseId = currentTraverseId;
    },
    nextStep(state, action) {
      if (state.currentStepNum === null) return state;
      if (state.currentStepNum >= state.numOfSteps - 1) return state;

      let currentStepNum = state.currentStepNum + 1;
      let { highlights, widgets } = convertStep(
        state.steps[currentStepNum],
        currentStepNum,
        state.longestLine,
      );
      let currentTraverseId = state.steps[currentStepNum].stepId;
      let currentContextItem = getCurrentActiveContext(
        state.context,
        currentTraverseId,
      );

      state.currentStepNum = currentStepNum;
      state.highlights = [
        ...highlights,
        ...getPrevLocs(state.steps, currentStepNum),
        ...getNextLocs(state.steps, currentStepNum),
      ];
      state.widgets = widgets;

      state.currentContextItem = currentContextItem;
      state.currentTraverseId = currentTraverseId;
    },
  },
  extraReducers: builder => {
    builder.addCase(typeCheckThunk.fulfilled, (state, action) => {
      if (action.payload.tag === 'ChTypeError') {
        let steps = action.payload.steps;
        let context = action.payload.contextTable;
        let currentStepNum = 0;
        let { highlights, widgets } = convertStep(
          steps[currentStepNum],
          currentStepNum,
          state.longestLine,
        );
        let currentTraverseId = steps[currentStepNum].stepId;
        state.context = context;
        state.steps = steps;
        state.highlights = [
          ...highlights,
          ...getPrevLocs(steps, currentStepNum),
          ...getNextLocs(steps, currentStepNum),
        ];
        state.widgets = widgets;
        state.numOfSteps = steps.length;
        state.numOfContextRows = context.length;
        state.currentStepNum = currentStepNum;
        state.currentTraverseId = currentTraverseId;
        state.currentContextItem = getCurrentActiveContext(
          context,
          currentTraverseId,
        );

        state.parseError = null;
        state.loadError = null;
        state.wellTyped = false;
      } else if (action.payload.tag === 'ChSuccess') {
        return Object.assign(
          {},
          {
            ...state,
            wellTyped: true,
            parseError: null,
            loadError: null,
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
    });
  },
});

export const {
  setStep,
  prevStep,
  nextStep,
  setTask,
  setText,
  toEditMode,
  toNormalMode,
  resetHighlights,
  toggleDebuggerStpes,
  toggleMultipleExps,
} = actions;
export default reducer;

// Step and context related convenient functions
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

function getCurrentActiveContext(contexts, currentTraverseId) {
  let item = contexts.find(c => {
    return R.nth(2)(
      c.contextSteps.find(x => R.equals(R.nth(0, x), currentTraverseId)),
    );
  });
  return item === undefined ? null : item;
}

function getPrevLocs(steps, currentNum) {
  if (steps.length === 0) return [];
  let { rangeA, rangeB } = convertStep(steps[currentNum], currentNum, 0);
  return steps
    .filter((_, i) => i < currentNum)
    .map(step => convertStep(step, 0, 0))
    .flatMap(step => [step.rangeA, step.rangeB])
    .filter(
      l => !(doesRangeSurround(l, rangeA) || doesRangeSurround(l, rangeB)),
    )
    .flatMap(l => makeHighlight(l, 'marker1'));
}

function getNextLocs(steps, currentNum) {
  if (steps.length === 0) return [];
  let { rangeA, rangeB } = convertStep(steps[currentNum], currentNum, 0);
  return steps
    .filter((_, i) => i > currentNum)
    .map(step => convertStep(step, 0, 0))
    .flatMap(step => [step.rangeA, step.rangeB])
    .filter(
      l => !(doesRangeSurround(l, rangeA) || doesRangeSurround(l, rangeB)),
    )
    .flatMap(l => makeHighlight(l, 'marker2'));
}

function convertStep(step, stepNum, offset) {
  let reason = step['explanation']
  let direction = step['order'];
  let rangeA = convertLocation(step['stepA']);
  let rangeB = convertLocation(step['stepB']);
  let highlights;
  if (doesRangeSurround(rangeA, rangeB)) {
    highlights = [
      makeParentHighlightB(rangeA, 'marker1'),
      makeHighlightB(rangeB, 'marker2'),
    ];
  } else if (doesRangeSurround(rangeB, rangeA)) {
    highlights = [
      makeParentHighlightB(rangeB, 'marker2'),
      makeHighlightB(rangeA, 'marker1'),
    ];
  } else {
    highlights = [
      makeHighlightB(rangeB, 'marker2'),
      makeHighlightB(rangeA, 'marker1'),
    ];
  }

  let widgets = drawAnnotations(
    rangeA,
    rangeB,
    reason,
    stepNum,
    direction,
    offset,
  );
  return { highlights, widgets, rangeA, rangeB };
}
