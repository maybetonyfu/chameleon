import * as __SNOWPACK_ENV__ from './_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

undefined /* [snowpack] import.meta.hot */ ;
import React, {createContext, useContext} from "./_snowpack/pkg/react.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import {observable, computed, action, makeObservable, autorun, runInAction, flow} from "./_snowpack/pkg/mobx.js";
import {observer} from "./_snowpack/pkg/mobx-react-lite.js";
import {initializeEditor, highlight, drawAnnotations, clearDecorations} from "./editor.js";
import {example1, example2, example3} from "./code.js";
function convertLocation({srcSpanEndLine, srcSpanEndColumn, srcSpanStartColumn, srcSpanStartLine}) {
  return {
    from: {line: srcSpanStartLine - 1, ch: srcSpanStartColumn - 1},
    to: {line: srcSpanEndLine - 1, ch: srcSpanEndColumn - 1}
  };
}
function locEq(loc1, loc2) {
  return JSON.stringify(loc1) === JSON.stringify(loc2);
}
function arrEq(array1, array2) {
  return array1.length === array2.length && array1.every((item, index) => item === array2[index]);
}
function convertStep(step) {
  let reason = step[0];
  let text;
  let direction = step[1];
  let locA = convertLocation(step[2]);
  let locB = convertLocation(step[3]);
  if (direction === "LR") {
    text = `
        <span class="markerA inline-block w-3 h-3 rounded-sm"></span>
        ${reason}
        <span class="markerB inline-block w-3 h-3 rounded-sm"></span>`;
  } else {
    text = `
        <span class="markerB inline-block w-3 h-3 rounded-sm"></span>
        ${reason}
        <span class="markerA inline-block w-3 h-3 rounded-sm"></span>`;
  }
  return {
    locA,
    locB,
    text
  };
}
const DataContext = createContext();
class EditorData {
  backendUrl = __SNOWPACK_ENV__.MODE === "development" ? "http://localhost:3000" : "";
  currentStepNum = 0;
  steps = [];
  context = [];
  editor = initializeEditor("");
  constructor() {
    makeObservable(this, {
      currentStepNum: observable.deep,
      steps: observable,
      context: observable,
      editor: false,
      backendUrl: false,
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
      setStep: action
    });
  }
  get currentStep() {
    if (this.numOfSteps === 0)
      return null;
    let step = this.steps[this.currentStepNum];
    return convertStep(step);
  }
  get currentContextItem() {
    if (this.numOfSteps === 0)
      return null;
    return this.context.find((c) => c[3].find((ri) => arrEq(this.currentTraverseId, ri[0]))[2]);
  }
  get currentTraverseId() {
    if (this.numOfSteps === 0)
      return null;
    return this.steps[this.currentStepNum][4];
  }
  get allTraverseIds() {
    return this.steps.map((s) => s[4]);
  }
  get prevLocs() {
    return this.steps.filter((_, i) => i < this.currentStepNum).map(convertStep).flatMap((s) => [s.locA, s.locB]).filter((l) => !(locEq(l, this.currentStep.locA) || locEq(l, this.currentStep.locB)));
  }
  get nextLocs() {
    return this.steps.filter((_, i) => i > this.currentStepNum).map(convertStep).flatMap((s) => [s.locA, s.locB]).filter((l) => !(locEq(l, this.currentStep.locA) || locEq(l, this.currentStep.locB)));
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
  *updateText(text) {
    this.context = [];
    this.steps = [];
    let response = yield fetch(this.backendUrl + "/typecheck", {
      method: "POST",
      body: text
    });
    let data = yield response.json();
    if (data.tag === "ChSuccess") {
      alert("Congratulations! No type errors found in your code.");
    } else if (data.tag === "ChTypeError") {
      this.currentStepNum = 0;
      this.steps = data.steps;
      this.context = data.contextTable;
    }
  }
  nextStep() {
    if (this.isLastStep) {
      return;
    } else {
      this.currentStepNum = this.currentStepNum + 1;
    }
  }
  prevStep() {
    if (this.isFirstStep) {
      return;
    } else {
      this.currentStepNum = this.currentStepNum - 1;
      return;
    }
  }
  setStep(n) {
    if (n < 0 || n > this.numOfSteps - 1) {
      return;
    } else {
      this.currentStepNum = n;
      return;
    }
  }
}
let editorData = new EditorData();
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    console.log("key up");
    runInAction(() => {
      editorData.prevStep();
    });
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    console.log("key down");
    runInAction(() => {
      editorData.nextStep();
    });
  }
});
document.getElementById("save").addEventListener("click", (_) => {
  let text = editorData.editor.getValue();
  runInAction(() => {
    editorData.updateText(text);
  });
});
document.getElementById("example1").addEventListener("click", (_) => {
  runInAction(() => {
    editorData.editor.setValue(example1);
    editorData.updateText(example1);
  });
});
document.getElementById("example2").addEventListener("click", (_) => {
  runInAction(() => {
    editorData.editor.setValue(example2);
    editorData.updateText(example2);
  });
});
document.getElementById("example3").addEventListener("click", (_) => {
  runInAction(() => {
    editorData.editor.setValue(example3);
    editorData.updateText(example3);
  });
});
autorun(() => {
  let editor = editorData.editor;
  let currentStep = editorData.currentStep;
  clearDecorations(editor);
  if (currentStep !== null) {
    highlight(currentStep.locA, currentStep.locB, editorData.prevLocs, editorData.nextLocs, editor);
    drawAnnotations(currentStep.locA, currentStep.locB, currentStep.text, editor);
  }
});
const Debuger = observer(() => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-4 flex flex-col",
    style: {fontFamily: "IBM Plex Sans"}
  }, /* @__PURE__ */ React.createElement(Message, null), /* @__PURE__ */ React.createElement(TypingTable, null));
});
const Message = observer(() => {
  let data = useContext(DataContext);
  return data.currentContextItem === null ? /* @__PURE__ */ React.createElement(React.Fragment, null) : /* @__PURE__ */ React.createElement("div", {
    className: "my-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-lg italic my-2"
  }, "Chameleon cannot infer a type for the expression below:"), /* @__PURE__ */ React.createElement("div", {
    className: "my-1"
  }, "Expression: ", /* @__PURE__ */ React.createElement("span", {
    className: "  ml-2 px-1 rounded-md bg-gray-700 text-white inline-block"
  }, " ", data.currentContextItem[0], " ")), /* @__PURE__ */ React.createElement("div", {
    className: "my-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-14 inline-block"
  }, "Expect:  "), /* @__PURE__ */ React.createElement("span", {
    className: "code groupMarkerB rounded-sm px-0.5 cursor-pointer"
  }, data.currentContextItem[1])), /* @__PURE__ */ React.createElement("div", {
    className: "my-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-14 inline-block"
  }, "Actual:  "), /* @__PURE__ */ React.createElement("span", {
    className: "code groupMarkerA rounded-sm px-0.5 cursor-pointer"
  }, data.currentContextItem[2])));
});
const TypingTable = observer(() => {
  let data = useContext(DataContext);
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid gap-1 context-grid text-xs",
    style: {fontFamily: "JetBrains Mono"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, /* @__PURE__ */ React.createElement("ion-icon", {
    onClick: action((_) => data.prevStep()),
    style: {fontSize: 20, cursor: "pointer"},
    name: "arrow-up-circle"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "TYPE"), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "EXPRESSION"), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "TYPE"), data.context.map((row, i) => /* @__PURE__ */ React.createElement(ContextRow, {
    row,
    key: row[0]
  })), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, /* @__PURE__ */ React.createElement("ion-icon", {
    onClick: action((_) => data.nextStep()),
    style: {fontSize: 20, cursor: "pointer"},
    name: "arrow-down-circle"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }));
});
const ContextRow = observer(({row}) => {
  let data = useContext(DataContext);
  let [exp, typeL, typeR, info] = row;
  let [a, b] = data.currentTraverseId;
  let allTraverseIds = data.allTraverseIds;
  let effectiveRowInfo = info.filter(([[x, y], _z1, _z2]) => allTraverseIds.some(([a2, b2]) => a2 === x && b2 === y));
  let affinity = effectiveRowInfo.find(([[x, y], u, v]) => x === a && y === b)[1];
  let affinityClass = affinity === "R" ? "sideA" : affinity === "L" ? "sideB" : "sideAB";
  let firstReleventStepTId = effectiveRowInfo.find((i) => i[2])[0];
  let lastReleventStepTId = effectiveRowInfo.slice().reverse().find((i) => i[2])[0];
  let firstReleventStep = data.steps.findIndex((step) => arrEq(step[4], firstReleventStepTId));
  let lastReleventStep = data.steps.findIndex((step) => arrEq(step[4], lastReleventStepTId));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stepper, {
    rowInfo: effectiveRowInfo
  }), /* @__PURE__ */ React.createElement("div", {
    onClick: action((_) => {
      data.setStep(firstReleventStep);
    }),
    className: "rounded-sm p-1 groupMarkerB flex justify-center items-center cursor-pointer"
  }, typeL), /* @__PURE__ */ React.createElement("div", {
    className: "rounded-sm p-1 flex justify-center items-center " + affinityClass
  }, exp), /* @__PURE__ */ React.createElement("div", {
    onClick: action((_) => {
      data.setStep(lastReleventStep);
    }),
    className: "rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer"
  }, typeR));
});
const Stepper = observer(({rowInfo}) => {
  let data = useContext(DataContext);
  let [a, b] = data.currentTraverseId;
  let steps = rowInfo.filter((ri) => ri[2]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-center items-center"
  }, steps.map(([[x, y], _z1, _z2]) => {
    let stepId = data.steps.findIndex((step) => arrEq(step[4], [x, y]));
    return /* @__PURE__ */ React.createElement("div", {
      key: x.toString() + y.toString(),
      onClick: action((_) => {
        data.setStep(stepId);
      }),
      className: "rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center " + (a === x && b === y ? "bg-green-400" : "bg-gray-400")
    }, stepId + 1);
  })));
});
ReactDOM.render(/* @__PURE__ */ React.createElement(DataContext.Provider, {
  value: editorData
}, /* @__PURE__ */ React.createElement(Debuger, null)), document.getElementById("debugger"));
