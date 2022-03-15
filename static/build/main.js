import { initializeEditor, highlight, drawAnnotations, clearDecorations } from "./editor.js"

let editor = initializeEditor("")


document.getElementById('save').addEventListener('click', e => {
    console.log('saved')
    let text = editor.getValue()
    console.log(text)
    fetch('/typecheck', {
        method: "POST",
        body: text
    })
        .then(d => d.json())
        .then(convertApiData)


})

function convertApiData(data) {
    let steps = data.map(step => {
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
    })

    if (steps.length === 0)  {
        clearDecorations(editor)
        alert("Type error fixed")
    }
    let currentStep = 0;
    clearDecorations(editor)
    highlight(steps[currentStep].locA, steps[currentStep].locB, [], [], editor)
    drawAnnotations(steps[currentStep].locA, steps[currentStep].locB, steps[currentStep].text, editor)

    window.nextStep = () => {
        clearDecorations(editor)
        currentStep = currentStep === steps.length - 1 ? currentStep : currentStep + 1;
        highlight(steps[currentStep].locA, steps[currentStep].locB, [], [], editor)
        drawAnnotations(steps[currentStep].locA, steps[currentStep].locB, steps[currentStep].text, editor)
    }
    window.prevStep = () => {
        clearDecorations(editor)
        currentStep = currentStep === 0 ? currentStep : currentStep - 1;
        highlight(steps[currentStep].locA, steps[currentStep].locB, [], [], editor)
        drawAnnotations(steps[currentStep].locA, steps[currentStep].locB, steps[currentStep].text, editor)
        
    }
}

function convertLocation({ srcSpanEndLine, srcSpanEndColumn, srcSpanStartColumn, srcSpanStartLine }) {
    return {
        from: { line: srcSpanStartLine - 1, ch: srcSpanStartColumn - 1 },
        to: { line: srcSpanEndLine - 1, ch: srcSpanEndColumn - 1 }
    }
}

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        e.preventDefault()
        console.log('key up')
        nextStep()

    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        console.log('key down')
        prevStep()
    }
})
