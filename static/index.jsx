import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, action, makeObservable, autorun, runInAction, flow } from "mobx"
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
                currentStepNum: observable,
                steps: observable,
                context: observable,
                editor: false,
                // methods
                underConsideration : computed,
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
    get underConsideration () {
        if (this.numOfSteps === 0) return []
        let lhs = this.steps[this.currentStepNum][4][0]
        let rhs = this.steps[this.currentStepNum][4][1]

        return this.context.filter(([n, type1, type2, affis]) => {
            let currents = affis.filter(([num, aff], i) => {
                return num===  this.steps[this.currentStepNum][4][0] || num === this.steps[this.currentStepNum][4][1]
            })
            if (currents.some(([num, aff]) => aff === "M")) return true
            if (currents.length > 1 && currents[0] != currents[1]) return true
            return false
        })

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

    return <div className="mb-5 italic">
        Chameleon cannot assign types to the following
        <span className="ml-2 px-1 rounded-md not-italic">expressions</span>
        <div>
            {/* { data.underConsideration.map(u => u[0]) } */}
        </div>
    </div>
})

const TypingTable = observer(() => {
    let data = useContext(DataContext)
    return (
        <div className={'grid gap-1 grid-cols-3 text-xs'} style={{ fontFamily: 'JetBrains Mono' }}>
            <div>Type</div>
            <div>Expression</div>
            <div>Type</div>
            {
                data.context.map((row, i) => {
                    return <ContextRow row={row} key={i}></ContextRow>
                })
            }
        </div>
    )
})



const ContextRow = observer(({ row }) => {
    let data = useContext(DataContext)

    let [exp, typeL, typeR, affinities] = row
    let affinity =
        affinities
            .find(([id, _]) => data.steps[data.currentStepNum][4][1] === id)[1]
    let affinityClass = affinity === "R" ? "sideA" : affinity === "L" ? "sideB" : "sideAB"
    return <>
        <div className="rounded-sm p-1 groupMarkerB">{typeL}</div>
        <div className={"rounded-sm p-1 text-center " + affinityClass}>{exp}</div>
        <div className="rounded-sm p-1 groupMarkerA">{typeR}</div>
    </>
})

ReactDOM.render(
    <DataContext.Provider value={editorData}>
        <Debuger></Debuger>
    </DataContext.Provider>, document.getElementById('debugger'));