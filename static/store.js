import.meta.hot;
import {
    createAction,
    configureStore,
    createAsyncThunk,
    createReducer
} from '@reduxjs/toolkit'
import tasks from './code';

const nextStep = createAction("nextStep")
const prevStep = createAction("prevStep")
const setStep = createAction("setStep")
const resetStep = createAction("resetStep")

const nextTask = createAction("nextTask")
const prevTask = createAction("prevTask")
const setTask = createAction("setTask")

const enableHighlight = createAction("enableHighlight")
const disableHighlight = createAction("disableHighlight")



export const BASIC_MODE = 'basic';
export const FULL_MODE = 'full';
const backendUrl =
    __SNOWPACK_ENV__.MODE === 'development' ? 'http://localhost:3000' : '';
const modes =
    Math.random() > 0.5
        ? Array.from({ length: 4 }).flatMap(_ => [BASIC_MODE, FULL_MODE])
        : Array.from({ length: 4 }).flatMap(_ => [FULL_MODE, BASIC_MODE]);

const initialState = {
    test: 42,
    currentStepNum: null,
    currentTaskNum: null,
    currentTraverseId: null,
    currentContextItem: null,
    allTraverseIds: [],
    currentStep: null,
    numOfSteps: 0,
    numOfContextRows: 0,
    prevLocs: [],
    nextLocs: [],
    isLastStep: false,
    isFirstStep: false,
    steps: [],
    context: [],
    mode: null,
    showHighlights: true,
}

export let typeCheckThunk = createAsyncThunk("typeCheck",
    async (n, { dispatch }) => {
        dispatch(setTask(n))
        let task = tasks[n]
        let response = await fetch(backendUrl + '/typecheck', {
            method: 'POST',
            body: task,
        });
        let data = response.json()
        return data
    })

const appReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setTask, (state, action) => {
            if (action.payload < 0 || action.payload > 7) return state
            let currentTaskNum = action.payload
            let mode = modes[currentTaskNum]
            return Object.assign({}, { ...state, mode, currentTaskNum })

        })
        .addCase(setStep, (state, action) => {
            if (state.currentStepNum === null) return state
            if (action.payload > state.numOfSteps - 1 || action.payload < 0) return state
            if (state.mode === BASIC_MODE) return state

            let currentStepNum = action.payload
            let currentStep = convertStep(state.steps[currentStepNum])
            let currentTraverseId = currentStep.stepId
            let currentContextItem = state.context
                .find(ctx => ctx.contextSteps.find(x => arrEq(x.at(0), currentTraverseId)).at(2))
            let prevLocs = state
                .steps
                .filter((_, i) => i < currentStepNum)
                .map(convertStep)
                .flatMap(s => [s.locA, s.locB])
                .filter(l => !(locEq(l, currentStep.locA) || locEq(l, currentStep.locB)))
            let nextLocs = state
                .steps
                .filter((_, i) => i > currentStepNum)
                .map(convertStep)
                .flatMap(s => [s.locA, s.locB])
                .filter(l => !(locEq(l, currentStep.locA) || locEq(l, currentStep.locB)))
            return Object.assign({}, {
                ...state,
                currentStepNum,
                currentStep,
                currentTraverseId,
                currentContextItem,
                prevLocs,
                nextLocs
            })
        })
        .addCase(nextStep, (state, action) => {
            if (state.currentStepNum === null) return state
            if (state.currentStepNum >= state.numOfSteps - 1) return state
            if (state.mode === BASIC_MODE) return state

            let currentStepNum = state.currentStepNum + 1
            let currentStep = convertStep(state.steps[currentStepNum])
            let currentTraverseId = currentStep.stepId
            let currentContextItem = state.context
                .find(ctx => ctx.contextSteps.find(x => arrEq(x.at(0), currentTraverseId)).at(2))
            let prevLocs = state
                .steps
                .filter((_, i) => i < currentStepNum)
                .map(convertStep)
                .flatMap(s => [s.locA, s.locB])
                .filter(l => !(locEq(l, currentStep.locA) || locEq(l, currentStep.locB)))
            let nextLocs = state
                .steps
                .filter((_, i) => i > currentStepNum)
                .map(convertStep)
                .flatMap(s => [s.locA, s.locB])
                .filter(l => !(locEq(l, currentStep.locA) || locEq(l, currentStep.locB)))
            return Object.assign({}, {
                ...state,
                currentStepNum,
                currentStep,
                currentTraverseId,
                currentContextItem,
                prevLocs,
                nextLocs
            })
        })
        .addCase(prevStep, (state, action) => {
            if (state.currentStepNum === null) return state
            if (state.currentStepNum <= 0) return state
            if (state.mode === BASIC_MODE) return state

            let currentStepNum = state.currentStepNum - 1
            let currentStep = convertStep(state.steps[currentStepNum])
            let currentTraverseId = currentStep.stepId
            let currentContextItem = state.context
                .find(ctx => ctx.contextSteps.find(x => arrEq(x.at(0), currentTraverseId)).at(2))
            let prevLocs = state
                .steps
                .filter((_, i) => i < currentStepNum)
                .map(convertStep)
                .flatMap(s => [s.locA, s.locB])
                .filter(l => !(locEq(l, currentStep.locA) || locEq(l, currentStep.locB)))
            let nextLocs = state
                .steps
                .filter((_, i) => i > currentStepNum)
                .map(convertStep)
                .flatMap(s => [s.locA, s.locB])
                .filter(l => !(locEq(l, currentStep.locA) || locEq(l, currentStep.locB)))
            return Object.assign({}, {
                ...state,
                currentStepNum,
                currentStep,
                currentTraverseId,
                currentContextItem,
                prevLocs,
                nextLocs
            })
        })
        .addCase(enableHighlight, (state, action) => {
            return Object.assign({}, { ...state, showHighlights: true })
        })
        .addCase(disableHighlight, (state, action) => {
            return Object.assign({}, { ...state, showHighlights: false })
        })
        .addCase(typeCheckThunk.fulfilled, (state, action) => {
            if (action.payload.tag === "ChTypeError") {
                let steps = action.payload.steps
                let context = action.payload.contextTable;
                return Object.assign({}, { ...state, steps, context })
            }
            return state
        })
        .addCase(typeCheckThunk.rejected, (state, action) => {
            return state
        })

})

const store = configureStore({
    reducer: appReducer,
    devTools: true,
})

export default store



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