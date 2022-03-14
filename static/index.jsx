import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, action, makeObservable, autorun, runInAction, flow, toJS } from "mobx"
import { observer } from 'mobx-react-lite'
import { initializeEditor, highlight, drawAnnotations, clearDecorations } from "./editor"

function convertLocation({ srcSpanEndLine, srcSpanEndColumn, srcSpanStartColumn, srcSpanStartLine }) {
    return {
        from: { line: srcSpanStartLine - 1, ch: srcSpanStartColumn - 1 },
        to: { line: srcSpanEndLine - 1, ch: srcSpanEndColumn - 1 }
    }
}

function locEq(loc1, loc2) {
    return JSON.stringify(loc1) === JSON.stringify(loc2)
}

function arrEq (array1, array2) {
    return array1.length === array2.length && array1.every((item,index) => item === array2[index])
}

function convertStep(step) {
    let reason = step[0];
    let text;
    let direction = step[1];
    let locA = convertLocation(step[2])
    let locB = convertLocation(step[3])
    if (direction === "LR") {
        text = `
        <span class="markerA inline-block w-3 h-3 rounded-sm"></span>
        ${reason}
        <span class="markerB inline-block w-3 h-3 rounded-sm"></span>`

    } else {
        text = `
        <span class="markerB inline-block w-3 h-3 rounded-sm"></span>
        ${reason}
        <span class="markerA inline-block w-3 h-3 rounded-sm"></span>`

    }
    return {
        locA,
        locB,
        text
    }
}




let initailText = `
module Task where


u = x 3

v = x 'c'

x y = y
z 3 = '4'
z w = x 2

`
const DataContext = createContext()

class EditorData {
    currentStepNum = 0
    steps = []
    context = []
    editor = initializeEditor(initailText)
    constructor() {
        makeObservable(
            this,
            {
                currentStepNum: observable.deep,
                steps: observable,
                context: observable,
                editor: false,
                // methods
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
                nextStep: action,
                prevStep: action,
                setStep: action,
            })
    }
    get currentStep() {
        if (this.numOfSteps === 0) return null
        let step = this.steps[this.currentStepNum]
        return convertStep(step)
    }
    get currentContextItem () {
        if (this.numOfSteps === 0) return null
        return (
            this.context
                .find(c => c[3].find(ri => arrEq(this.currentTraverseId, ri[0]))[2]  )
        )
    }
    get currentTraverseId() {
        if (this.numOfSteps === 0) return null
        return this.steps[this.currentStepNum][4]
    }
    get allTraverseIds() {
        return this.steps.map(s => s[4])
    }
    get prevLocs() {
        return this.steps
            .filter((_, i) => i < this.currentStepNum)
            .map(convertStep)
            .flatMap(s => [s.locA, s.locB])
            .filter(l => !(locEq(l, this.currentStep.locA) || locEq(l, this.currentStep.locB)))
    }
    get nextLocs() {
        return this.steps
            .filter((_, i) => i > this.currentStepNum)
            .map(convertStep)
            .flatMap(s => [s.locA, s.locB])
            .filter(l => !(locEq(l, this.currentStep.locA) || locEq(l, this.currentStep.locB)))
    }

    get isLastStep() {
        return this.currentStepNum === this.numOfSteps - 1
    }
    get isFirstStep() {
        return this.currentStepNum === 0
    }
    get numOfSteps() {
        return this.steps.length
    }
    get numOfContextRows() {
        return this.context.length
    }
    * updateText(text) {
        this.context = []
        this.steps = []
        let response = yield fetch('http://localhost:3000/typecheck', {
            method: "POST",
            body: text
        })
        let data = yield response.json()
        if (data.tag === "ChSuccess") {
            alert("Congratulations! No type errors found in your code.")
        } else if (data.tag === "ChTypeError") {
            this.currentStepNum = 0;
            this.steps = data.steps;
            this.context = data.contextTable;
        }
    }
    nextStep() {
        if (this.isLastStep) {
            return
        } else {
            this.currentStepNum = this.currentStepNum + 1
        }
    }
    prevStep() {
        if (this.isFirstStep) {
            return
        } else {
            this.currentStepNum = this.currentStepNum - 1
            return
        }
    }
    setStep(n) {
        if (n < 0 || n > this.currentStepNum - 1) {
            return
        } else {
            this.currentStepNum = n
            return
        }
    }
}

let editorData = new EditorData();

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        e.preventDefault()
        console.log('key up')
        runInAction(() => {
            editorData.prevStep()
        })
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        console.log('key down')
        runInAction(() => {
            editorData.nextStep()
        })
    }
})

document.getElementById('save').addEventListener('click', _ => {
    let text = editorData.editor.getValue()
    runInAction(() => {
        editorData.updateText(text)
    })

})


autorun(() => {
    let editor = editorData.editor;
    let currentStep = editorData.currentStep;
    clearDecorations(editor)
    if (currentStep !== null) {
        highlight(
            currentStep.locA,
            currentStep.locB,
            editorData.prevLocs,
            editorData.nextLocs,
            editor);
        drawAnnotations(currentStep.locA, currentStep.locB, currentStep.text, editor);
    }
})


const Debuger = observer(() => {
    return <div className="p-4 flex flex-col" style={{ fontFamily: 'IBM Plex Sans' }}>
        <Message></Message>
        <TypingTable></TypingTable>
    </div>
})

const Message = observer(() => {
    let data = useContext(DataContext)

    return (
        data.currentContextItem === null ? <></> :
        <div className="mb-5 italic">
            Chameleon cannot infer a type for the expression
            <span className="ml-2 px-1 rounded-md not-italic">
                
                {data.currentContextItem[0]}
            </span>
        <div>
                Expect:  {data.currentContextItem[1]}
            </div>
            <div>
                Actual:  {data.currentContextItem[2]}
            </div>
        </div>
)})

const TypingTable = observer(() => {
    let data = useContext(DataContext)
    return (
        <div className={'grid gap-1 context-grid text-xs'} style={{ fontFamily: 'JetBrains Mono' }}>
            <div></div>
            <div className='text-center'>TYPE</div>
            <div className='text-center'>EXPRESSION</div>
            <div className='text-center'>TYPE</div>
            {
                data.context.map((row, i) => <ContextRow row={row} key={row[0]}></ContextRow>)
            }
        </div>
    )
})



const ContextRow = observer(({ row }) => {
    let data = useContext(DataContext)
    let [exp, typeL, typeR, info] = row;
    let [a, b] = data.currentTraverseId
    let affinity = info.find(([[x, y], u, v]) => x === a && y === b)[1]
    let affinityClass = affinity === "R" ? "sideA" : affinity === "L" ? "sideB" : "sideAB"
    return <>
        <Stepper rowInfo={info}></Stepper>
        <div className="rounded-sm p-1 groupMarkerB flex justify-center items-center">{typeL}</div>
        <div className={"rounded-sm p-1 flex justify-center items-center " + affinityClass}>{exp}</div>
        <div className="rounded-sm p-1 groupMarkerA flex justify-center items-center">{typeR}</div>
    </>
})

const Stepper = observer(({ rowInfo }) => {
    let data = useContext(DataContext)
    let allTraverseIds = data.allTraverseIds
    let [a, b] = data.currentTraverseId
    let effectiveRowInfo = rowInfo.filter(([[x, y], _z1, _z2]) => allTraverseIds.some(([a, b]) => a === x && b === y))
    let steps = effectiveRowInfo.filter(ri => ri[2])
    return <>
        <div className="flex flex-col justify-center">
            {steps.map(([[x, y], _z1, _z2]) => (
                <div 
                    key={x.toString() + y.toString()}
                    className={
                    'rounded-md w-3 h-3 my-0.5 ' + (a === x && b === y ? 'bg-red-400' : 'bg-gray-400')
                }></div>))}

        </div>
    </>
})

ReactDOM.render(
    <DataContext.Provider value={editorData}>
        <Debuger></Debuger>
    </DataContext.Provider>, document.getElementById('debugger'));