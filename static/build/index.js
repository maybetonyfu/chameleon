import * as __SNOWPACK_ENV__ from './_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

undefined /* [snowpack] import.meta.hot */ ;
import React, {createContext, useContext} from "./_snowpack/pkg/react.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import {
  initializeEditor,
  highlight,
  drawAnnotations,
  clearDecorations
} from "./editor.js";
import tasks from "./code.js";
import {Provider, useSelector, useDispatch} from "./_snowpack/pkg/react-redux.js";
import store from "./store.js";
document.getElementById("save").addEventListener("click", (_) => {
});
document.getElementById("clear").addEventListener("click", (_) => {
});
document.getElementById("skip").addEventListener("click", (_) => {
});
const Debuger = () => {
  let mode = useContext((state) => state.mode);
  return /* @__PURE__ */ React.createElement("div", {
    className: "p-2 flex flex-col",
    style: {fontFamily: "IBM Plex Sans"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 bg-gray-200 px-2"
  }, "Current Mode:", " ", mode === BASIC_MODE ? "Basic mode" : "Interactive mode"));
};
const Message = () => {
  let data = useContext(DataContext);
  return data.currentContextItem === null ? null : /* @__PURE__ */ React.createElement("div", {
    className: "mb-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-md italic my-2"
  }, "Chameleon cannot infer a type for the expression below:"), /* @__PURE__ */ React.createElement("div", {
    className: "my-1 text-sm"
  }, "Expression:", /* @__PURE__ */ React.createElement("span", {
    className: "code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block"
  }, data.currentContextItem["contextExp"])), /* @__PURE__ */ React.createElement("div", {
    className: "my-1 text-sm"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-14 inline-block"
  }, "Type 1: "), /* @__PURE__ */ React.createElement("span", {
    className: "code groupMarkerB rounded-sm px-0.5 cursor-pointer"
  }, unAlias(data.currentContextItem["contextType1"]))), /* @__PURE__ */ React.createElement("div", {
    className: "my-1 text-sm"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-14 inline-block"
  }, "Type 2: "), /* @__PURE__ */ React.createElement("span", {
    className: "code groupMarkerA rounded-sm px-0.5 cursor-pointer"
  }, unAlias(data.currentContextItem["contextType2"]))));
};
const TypingTable = () => {
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
  }, "TYPE 1"), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "EXPRESSION"), /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, "TYPE 2"), data.context.map((row, i) => /* @__PURE__ */ React.createElement(ContextRow, {
    row,
    key: i
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
};
const ContextRow = ({row}) => {
  let data = useContext(DataContext);
  let {contextExp, contextType1, contextType2, contextSteps} = row;
  let [a, b] = data.currentTraverseId;
  let affinity = contextSteps.find(([[x, y], u, v]) => x === a && y === b)[1];
  let affinityClass = affinity === "R" ? "sideA" : affinity === "L" ? "sideB" : "sideAB";
  let firstReleventStepTId = contextSteps.find((i) => i[2])[0];
  let lastReleventStepTId = contextSteps.slice().reverse().find((i) => i[2])[0];
  let firstReleventStep = data.steps.findIndex((step) => arrEq(step["stepId"], firstReleventStepTId));
  let lastReleventStep = data.steps.findIndex((step) => arrEq(step["stepId"], lastReleventStepTId));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stepper, {
    rowInfo: contextSteps
  }), /* @__PURE__ */ React.createElement("div", {
    onClick: action((_) => {
      data.setStep(firstReleventStep);
    }),
    className: "rounded-sm p-1 groupMarkerB flex justify-center items-center cursor-pointer"
  }, unAlias(contextType1)), /* @__PURE__ */ React.createElement("div", {
    className: "rounded-sm p-1 flex justify-center items-center " + affinityClass
  }, contextExp), /* @__PURE__ */ React.createElement("div", {
    onClick: action((_) => {
      data.setStep(lastReleventStep);
    }),
    className: "rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer"
  }, unAlias(contextType2)));
};
const Stepper = ({rowInfo}) => {
  let data = useContext(DataContext);
  let [a, b] = data.currentTraverseId;
  let steps = rowInfo.filter((ri) => ri[2]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-center items-center"
  }, steps.map(([[x, y], _z1, _z2]) => {
    let stepId = data.steps.findIndex((step) => arrEq(step["stepId"], [x, y]));
    return /* @__PURE__ */ React.createElement("div", {
      key: x.toString() + y.toString(),
      onClick: action((_) => {
        data.setStep(stepId);
      }),
      className: "rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center " + (a === x && b === y ? "bg-green-400" : "bg-gray-400")
    }, stepId + 1);
  })));
};
ReactDOM.render(/* @__PURE__ */ React.createElement(Provider, {
  store
}, /* @__PURE__ */ React.createElement(Debuger, null)), document.getElementById("debugger"));
