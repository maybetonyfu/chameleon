import React from "./_snowpack/pkg/react.v17.0.2.js";
import ReactDOM from "./_snowpack/pkg/react-dom.v17.0.2.js";
import {
  initializeEditor,
  highlight,
  drawAnnotations,
  clearDecorations
} from "./editor.js";
import {Provider, useSelector, useDispatch} from "./_snowpack/pkg/react-redux.v7.2.5.js";
import store from "./store.js";
import {arrEq} from "./helper.js";
import {
  BASIC_MODE,
  typeCheckThunk,
  switchTaskThunk,
  switchTaskNextRoundThunk,
  disableHighlight,
  prevStep,
  nextStep,
  setStep
} from "./store.js";
import tasks from "./code.js";
import Modal from "./_snowpack/pkg/react-modal.v3.14.4.js";
import Split from "./_snowpack/pkg/split-grid.v1.0.11.js";
Split({
  columnGutters: [{
    track: 1,
    element: document.querySelector("#gutter")
  }]
});
Modal.setAppElement("#debugger");
let currentTask = 0;
let currentRound = 1;
let editor = initializeEditor(tasks[currentTask]);
store.dispatch(switchTaskThunk(currentTask));
editor.on("focus", function() {
  store.dispatch(disableHighlight());
});
store.subscribe(() => {
  let {
    currentStep,
    mode,
    showHighlights,
    prevLocs,
    nextLocs,
    round
  } = store.getState();
  let nohighligt = {from: {line: 0, ch: 0}, to: {line: 0, ch: 0}};
  clearDecorations(editor);
  if (round !== currentRound) {
    currentRound = round;
    document.getElementById("skip").classList.toggle("hidden");
    document.getElementById("giveup").classList.toggle("hidden");
  }
  if (!showHighlights)
    return;
  if (currentStep === null)
    return;
  if (mode === BASIC_MODE) {
    highlight(nohighligt, nohighligt, [currentStep.locA, ...prevLocs], [currentStep.locB, ...nextLocs], editor);
  } else {
    highlight(currentStep.locA, currentStep.locB, prevLocs, nextLocs, editor);
    drawAnnotations(currentStep.locA, currentStep.locB, currentStep.text, editor);
  }
});
document.getElementById("save").addEventListener("click", (_) => {
  let text = editor.getValue();
  store.dispatch(typeCheckThunk(text));
});
document.getElementById("skip").addEventListener("click", (_) => {
  let state = store.getState();
  if (state.round === 2)
    return;
  if (state.currentTaskNum < 7) {
    let nextTask = state.currentTaskNum + 1;
    store.dispatch(switchTaskThunk(nextTask));
    editor.setValue(tasks.at(nextTask));
  } else if (state.currentTaskNum === 7) {
    let nextTask = state.pending.at(0);
    store.dispatch(switchTaskNextRoundThunk(nextTask));
    editor.setValue(tasks.at(nextTask));
  }
});
document.getElementById("giveup").addEventListener("click", (_) => {
  let state = store.getState();
  let currentPendingIndex = state.pending.findIndex((v) => v === state.currentTaskNum);
  if (state.round === 1)
    return;
  if (state.currentTaskNum < 7) {
    let nextTask = state.pending.at(currentPendingIndex + 1);
    store.dispatch(switchTaskThunk(nextTask));
    editor.setValue(tasks.at(nextTask));
  } else if (state.currentTaskNum === 7) {
    window.location = "https://docs.google.com/forms/d/e/1FAIpQLSfmXyASOPW2HIK-Oqp5nELBTltKeqZjqQ0G9JFram8eUCx26A/viewform?usp=sf_link";
  }
});
document.querySelectorAll(".example").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let taskId = parseInt(e.target.dataset["taskId"], 10);
    editor.setValue(tasks.at(taskId));
    store.dispatch(switchTaskThunk(taskId));
  });
});
const TypeSig = ({type}) => {
  if (type.tag === "TypeForm" && type.contents.length === 3 && type.contents.at(0).contents === "[" && type.contents.at(1).contents === "Char" && type.contents.at(2).contents === "]") {
    return /* @__PURE__ */ React.createElement("span", {
      className: "inline-block"
    }, "String");
  } else if (type.tag === "TypeForm") {
    return /* @__PURE__ */ React.createElement("span", {
      className: "inline-block"
    }, type.contents.map((t) => /* @__PURE__ */ React.createElement(TypeSig, {
      type: t
    })));
  } else if (type.tag === "TypeFormPart" && type.contents === " ") {
    return /* @__PURE__ */ React.createElement("span", {
      className: "inline-block w-1"
    });
  } else if (type.tag === "TypeFormPart") {
    return /* @__PURE__ */ React.createElement("span", {
      className: "inline-block"
    }, type.contents);
  }
};
const ModelContent = () => {
  let dispatch = useDispatch();
  let currentTaskNum = useSelector((state) => state.currentTaskNum);
  let pending = useSelector((state) => state.pending);
  let round = useSelector((state) => state.round);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-around items-center h-full"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
    className: "text-center"
  }, "Congratulations. You fixed the type error!"), pending.length === 0 ? /* @__PURE__ */ React.createElement("p", {
    className: "text-center"
  }, "Click next to leave us some feedback.") : /* @__PURE__ */ React.createElement("p", {
    className: "text-center"
  }, "Click next to head over to the next challenge.")), /* @__PURE__ */ React.createElement("button", {
    className: "px-5 py-1 bg-green-400 rounded-md",
    onClick: () => {
      if (pending.length === 0) {
        window.location = "https://docs.google.com/forms/d/e/1FAIpQLSfmXyASOPW2HIK-Oqp5nELBTltKeqZjqQ0G9JFram8eUCx26A/viewform?usp=sf_link";
        return;
      }
      if (round === 1 && currentTaskNum < 7) {
        let nextTask = currentTaskNum + 1;
        dispatch(switchTaskThunk(nextTask));
        editor.setValue(tasks.at(nextTask));
      } else if (round === 1 && currentTaskNum === 7) {
        let nextTask = pending.at(0);
        dispatch(switchTaskNextRoundThunk(nextTask));
        editor.setValue(tasks.at(nextTask));
      } else if (round === 2) {
        let nextPendingIndex = pending.findIndex((n) => n > currentTaskNum);
        if (nextPendingIndex === -1) {
          window.location = "https://docs.google.com/forms/d/e/1FAIpQLSfmXyASOPW2HIK-Oqp5nELBTltKeqZjqQ0G9JFram8eUCx26A/viewform?usp=sf_link";
        } else {
          let nextTask = pending.at(nextPendingIndex);
          dispatch(switchTaskThunk(nextTask));
          editor.setValue(tasks.at(nextTask));
        }
      }
    }
  }, "Next"));
};
const Debuger = () => {
  let mode = useSelector((state) => state.mode);
  let wellTyped = useSelector((state) => state.wellTyped);
  let loadError = useSelector((state) => state.loadError);
  let parseError = useSelector((state) => state.parseError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Modal, {
    isOpen: wellTyped,
    className: "max-w-2xl bg-gray-100 h-80 min-w-max left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute p-6 rounded-md"
  }, /* @__PURE__ */ React.createElement(ModelContent, null)), (() => {
    if (parseError !== null) {
      return /* @__PURE__ */ React.createElement(ParseErrorReport, null);
    } else if (loadError !== null) {
      return /* @__PURE__ */ React.createElement(LoadErrorReport, null);
    } else if (!wellTyped) {
      return /* @__PURE__ */ React.createElement(TypeErrorReport, null);
    }
  })());
};
const ParseErrorReport = () => {
  let parseError = useSelector((state) => state.parseError);
  return /* @__PURE__ */ React.createElement("div", {
    class: "p-4"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "py-2 px-4"
  }, "A syntax error was found in the code"), /* @__PURE__ */ React.createElement("div", {
    className: "bg-gray-100 py-2 px-4 rounded-md"
  }, /* @__PURE__ */ React.createElement("p", null, " ", parseError.message, " "), /* @__PURE__ */ React.createElement("p", null, "Location: ", parseError.loc.srcLine, ":", parseError.loc.srcColumn)));
};
const LoadErrorReport = () => {
  let loadError = useSelector((state) => state.loadError);
  return /* @__PURE__ */ React.createElement("div", {
    class: "p-4"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "py-2 px-4"
  }, "A variable is used without being declared."), loadError.map((m) => {
    return /* @__PURE__ */ React.createElement("div", {
      className: "bg-gray-100 py-2 px-4 rounded-md"
    }, /* @__PURE__ */ React.createElement("p", null, "Variable: ", m.at(0), " "), /* @__PURE__ */ React.createElement("p", null, "Location:", " ", " " + m.at(1).srcSpanStartLine, ":", m.at(1).srcSpanStartColumn, " -", " " + m.at(1).srcSpanEndLine, ":", m.at(1).srcSpanEndColumn));
  }));
};
const TypeErrorReport = () => {
  let mode = useSelector((state) => state.mode);
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-2 flex flex-col items-start",
    style: {fontFamily: "IBM Plex Sans"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 bg-gray-100 px-4 py-2 rounded-md w-auto"
  }, "Current mode:", mode === BASIC_MODE ? " Basic Mode" : " Interactive Mode"), /* @__PURE__ */ React.createElement(Message, null), mode === BASIC_MODE ? null : /* @__PURE__ */ React.createElement(TypingTable, null));
};
const Message = () => {
  let contextItem = useSelector((state) => state.currentContextItem);
  return contextItem === null ? null : /* @__PURE__ */ React.createElement("div", {
    className: "mb-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-md italic my-2"
  }, "Chameleon cannot infer a type for the expression below:"), /* @__PURE__ */ React.createElement("div", {
    className: "my-1 text-sm"
  }, "Expression:", /* @__PURE__ */ React.createElement("span", {
    className: "code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block"
  }, contextItem["contextExp"])), /* @__PURE__ */ React.createElement("div", {
    className: "my-1 text-sm"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-14 inline-block"
  }, "Type 1: "), /* @__PURE__ */ React.createElement("span", {
    className: "code groupMarkerB rounded-sm px-0.5 cursor-pointer"
  }, /* @__PURE__ */ React.createElement(TypeSig, {
    type: contextItem.contextType1
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "my-1 text-sm"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-14 inline-block"
  }, "Type 2: "), /* @__PURE__ */ React.createElement("span", {
    className: "code groupMarkerA rounded-sm px-0.5 cursor-pointer"
  }, /* @__PURE__ */ React.createElement(TypeSig, {
    type: contextItem.contextType2
  }))));
};
const TypingTable = () => {
  let dispatch = useDispatch();
  let context = useSelector((state) => state.context);
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid gap-1 context-grid text-xs w-full",
    style: {fontFamily: "JetBrains Mono"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, /* @__PURE__ */ React.createElement("ion-icon", {
    onClick: () => dispatch(prevStep()),
    style: {fontSize: 20, cursor: "pointer"},
    name: "arrow-up-circle"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "TYPE 1"), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "EXPRESSION"), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "TYPE 2"), context.map((row, i) => /* @__PURE__ */ React.createElement(ContextRow, {
    row,
    key: i
  })), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, /* @__PURE__ */ React.createElement("ion-icon", {
    onClick: () => dispatch(nextStep()),
    style: {fontSize: 20, cursor: "pointer"},
    name: "arrow-down-circle"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }));
};
const ContextRow = ({row}) => {
  let currentTraverseId = useSelector((state) => state.currentTraverseId);
  let steps = useSelector((state) => state.steps);
  let dispatch = useDispatch();
  let {contextExp, contextType1, contextType2, contextSteps} = row;
  let affinity = contextSteps.find((step) => arrEq(step.at(0), currentTraverseId)).at(1);
  let affinityClass = affinity === "R" ? "sideA" : affinity === "L" ? "sideB" : "sideAB";
  let firstReleventStepTId = contextSteps.find((i) => i.at(2)).at(0);
  let lastReleventStepTId = contextSteps.slice().reverse().find((i) => i.at(2)).at(0);
  let firstReleventStep = steps.findIndex((step) => arrEq(step["stepId"], firstReleventStepTId));
  let lastReleventStep = steps.findIndex((step) => arrEq(step["stepId"], lastReleventStepTId));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stepper, {
    rowInfo: contextSteps
  }), /* @__PURE__ */ React.createElement("div", {
    onClick: () => dispatch(setStep(firstReleventStep)),
    className: "rounded-sm p-1 groupMarkerB flex justify-center items-center cursor-pointer"
  }, /* @__PURE__ */ React.createElement(TypeSig, {
    type: contextType1
  })), /* @__PURE__ */ React.createElement("div", {
    className: "rounded-sm p-1 flex justify-center items-center " + affinityClass
  }, contextExp), /* @__PURE__ */ React.createElement("div", {
    onClick: () => dispatch(setStep(lastReleventStep)),
    className: "rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer"
  }, /* @__PURE__ */ React.createElement(TypeSig, {
    type: contextType2
  })));
};
const Stepper = ({rowInfo}) => {
  let steps = useSelector((state) => state.steps);
  let currentTraverseId = useSelector((state) => state.currentTraverseId);
  let stepsInRow = rowInfo.filter((ri) => ri[2]);
  let dispatch = useDispatch();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-center items-center"
  }, stepsInRow.map(([traverseId, _z1, _z2]) => {
    let stepId = steps.findIndex((step) => arrEq(step["stepId"], traverseId));
    return /* @__PURE__ */ React.createElement("div", {
      key: stepId,
      onClick: () => dispatch(setStep(stepId)),
      className: "rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center " + (arrEq(traverseId, currentTraverseId) ? "bg-green-400" : "bg-gray-400")
    }, stepId + 1);
  })));
};
ReactDOM.render(/* @__PURE__ */ React.createElement(Provider, {
  store
}, /* @__PURE__ */ React.createElement(Debuger, null)), document.getElementById("debugger"));
