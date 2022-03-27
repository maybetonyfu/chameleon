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
import {unAlias, arrEq} from "./helper.js";
import {
  BASIC_MODE,
  typeCheckThunk,
  switchTaskThunk,
  disableHighlight,
  prevStep,
  nextStep,
  setStep
} from "./store.js";
import tasks from "./code.js";
import Modal from "./_snowpack/pkg/react-modal.v3.14.4.js";
Modal.setAppElement("#debugger");
let currentTask = 0;
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
    nextLocs
  } = store.getState();
  let nohighligt = {from: {line: 0, ch: 0}, to: {line: 0, ch: 0}};
  clearDecorations(editor);
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
});
document.querySelectorAll(".example").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let taskId = parseInt(e.target.dataset["taskId"], 10);
    editor.setValue(tasks.at(taskId));
    store.dispatch(switchTaskThunk(taskId));
  });
});
const ModelContent = () => {
  let dispatch = useDispatch();
  let currentTaskNum = useSelector((state) => state.currentTaskNum);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-around items-center h-full"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
    className: "text-center"
  }, "Congratulations. You fixed the type error!"), currentTaskNum == 7 ? /* @__PURE__ */ React.createElement("p", {
    className: "text-center"
  }, "Click next to leave us some feedback.") : /* @__PURE__ */ React.createElement("p", {
    className: "text-center"
  }, "Click next to head over to the next challenge.")), /* @__PURE__ */ React.createElement("button", {
    className: "px-5 py-1 bg-green-400 rounded-md",
    onClick: () => {
      if (currentTaskNum == 7) {
        window.location = "https://docs.google.com/forms/d/e/1FAIpQLSfmXyASOPW2HIK-Oqp5nELBTltKeqZjqQ0G9JFram8eUCx26A/viewform?usp=sf_link";
        return;
      }
      let nextTask = currentTaskNum + 1;
      editor.setValue(tasks.at(nextTask));
      dispatch(switchTaskThunk(nextTask));
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
  return /* @__PURE__ */ React.createElement("p", null, "You have parse error");
};
const LoadErrorReport = () => {
  return /* @__PURE__ */ React.createElement("p", null, "You have missing variable");
};
const TypeErrorReport = () => {
  let mode = useSelector((state) => state.mode);
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-2 flex flex-col",
    style: {fontFamily: "IBM Plex Sans"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 bg-gray-200 px-2"
  }, "Current Mode:", mode === BASIC_MODE ? "Basic mode" : "Interactive mode"), /* @__PURE__ */ React.createElement(Message, null), mode === BASIC_MODE ? null : /* @__PURE__ */ React.createElement(TypingTable, null));
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
  }, unAlias(contextItem["contextType1"]))), /* @__PURE__ */ React.createElement("div", {
    className: "my-1 text-sm"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-14 inline-block"
  }, "Type 2: "), /* @__PURE__ */ React.createElement("span", {
    className: "code groupMarkerA rounded-sm px-0.5 cursor-pointer"
  }, unAlias(contextItem["contextType2"]))));
};
const TypingTable = () => {
  let dispatch = useDispatch();
  let context = useSelector((state) => state.context);
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid gap-1 context-grid text-xs",
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
  }, unAlias(contextType1)), /* @__PURE__ */ React.createElement("div", {
    className: "rounded-sm p-1 flex justify-center items-center " + affinityClass
  }, contextExp), /* @__PURE__ */ React.createElement("div", {
    onClick: () => dispatch(setStep(lastReleventStep)),
    className: "rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer"
  }, unAlias(contextType2)));
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
