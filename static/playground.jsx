import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import {
  editorModes,
  nextStep,
  prevStep,
  toggleMultipleExps,
  toggleDebuggerStpes,
  switchTaskThunk,
  showOnlyMark1,
  showOnlyMark2,
  showBoth,
  toNormalMode,
  typeCheckThunk,
} from './debuggerSlice';
import Splitter from '@devbookhq/splitter';
import Editor from './Editor';
import Debugger from './Debugger';
import MenuBar from './MenuBar';
import { Event, Source, track } from './report';
import { getMode } from './util';


store.dispatch(switchTaskThunk(0));

window.addEventListener('keyup', event => {
  const keyName = event.key;
  let state = store.getState();
  if (
    state.debugger.mode === editorModes.normal &&
    (keyName === '1' || keyName === '2')
  ) {
    store.dispatch(showBoth());
  }
});

window.addEventListener('keydown', event => {
  let state = store.getState();
  const keyName = event.key;
  if (keyName === 'Tab') {
    event.preventDefault();
    if (!state.debugger.multipleExps) {
      store.dispatch(toggleMultipleExps());
      track({
        event: Event.balancedMode,
        task: state.debugger.currentTaskNum,
        mode: 'Basic Mode',
        source: Source.keyboard,
      });
    } else if (state.debugger.multipleExps && !state.debugger.debuggingSteps) {
      track({
        event: Event.advancedMode,
        task: state.debugger.currentTaskNum,
        mode: 'Balanced Mode',
        source: Source.keyboard,
      });
      store.dispatch(toggleDebuggerStpes());
    } else if (state.debugger.multipleExps && state.debugger.debuggingSteps) {
      track({
        event: Event.basicMode,
        task: state.debugger.currentTaskNum,
        mode: 'Advanced Mode',
        source: Source.keyboard,
      });
      store.dispatch(toggleMultipleExps());
      store.dispatch(toggleDebuggerStpes());
    }
  }

  if (state.debugger.mode === editorModes.edit && keyName === 'Escape') {
    track({
      event: Event.typeCheck,
      task: state.debugger.currentTaskNum,
      mode: getMode(state.debugger.multipleExps, state.debugger.debuggingSteps),
      source: Source.keyboard,
    });
    store.dispatch(toNormalMode());
    store.dispatch(typeCheckThunk());
  }
  if (state.debugger.mode === editorModes.normal) {
    if (keyName === '1') {
      track({
        event: Event.narrowType1,
        task: state.debugger.currentTaskNum,
        mode: getMode(
          state.debugger.multipleExps,
          state.debugger.debuggingSteps,
        ),
        source: Source.keyboard,
      });
      store.dispatch(showOnlyMark1());
    }

    if (keyName === '2') {
      track({
        event: Event.narrowType2,
        task: state.debugger.currentTaskNum,
        mode: getMode(
          state.debugger.multipleExps,
          state.debugger.debuggingSteps,
        ),
        source: Source.keyboard,
      });
      store.dispatch(showOnlyMark2());
    }

    if (state.debugger.debuggingSteps) {
      if (
        keyName === 'ArrowDown' ||
        keyName === 'ArrowRight' ||
        keyName === 'j' ||
        keyName === 'l'
      ) {
        track({
          event: Event.next,
          task: state.debugger.currentTaskNum,
          mode: getMode(
            state.debugger.multipleExps,
            state.debugger.debuggingSteps,
          ),
          source: Source.keyboard,
        });
        store.dispatch(prevStep());
      }
      if (
        keyName === 'ArrowUp' ||
        keyName === 'ArrowLeft' ||
        keyName === 'k' ||
        keyName === 'h'
      ) {
        track({
          event: Event.prev,
          task: state.debugger.currentTaskNum,
          mode: getMode(
            state.debugger.multipleExps,
            state.debugger.debuggingSteps,
          ),
          source: Source.keyboard,
        });
        store.dispatch(nextStep());
      }
    }
  }
});

const App = () => {
  return (
    <>
      <div className='w-full h-full flex flex-col'>
        <MenuBar></MenuBar>
        <div className='flex-grow'>
          <Splitter initialSizes={[60, 40]}>
            <Editor></Editor>
            <Debugger></Debugger>
          </Splitter>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('react-root'),
);
