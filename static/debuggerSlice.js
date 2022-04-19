import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { arrEq } from './helper';
import tasks from './code';


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
    currentTaskNum: null,
    wellTyped: false,
    loadError: null,
    parseError: null,
};

const { actions, reducer } = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setTask(state, action) {
            if (action.payload < 0 || action.payload > 7) return state;
            state.currentTaskNum = action.payload;
        },
        setStep(state, action) {
            if (state.currentStepNum === null) return state;
            if (action.payload > state.numOfSteps - 1 || action.payload < 0)
                return state;

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
            state.currentStepNum = currentStepNum
            state.currentStep = currentStep
            state.prevLocs = prevLocs
            state.nextLocs = nextLocs
            state.currentContextItem = currentContextItem
            state.currentTraverseId = currentTraverseId
        },
        prevStep(state, action) {
            if (state.currentStepNum === null) return state;
            if (state.currentStepNum <= 0) return state;

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
        },
        nextStep(state, action) {
            if (state.currentStepNum === null) return state;
            if (state.currentStepNum >= state.numOfSteps - 1) return state;

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
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            typeCheckThunk.fulfilled, (state, action) => {
                if (action.payload.tag === 'ChTypeError') {
                    let steps = action.payload.steps;
                    let context = action.payload.contextTable;
                    let currentStepNum = 0;
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
            })
    }
})

export const { setStep, setTask, prevStep, nextStep } = actions
export default reducer


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
