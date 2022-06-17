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
import Modal from 'react-modal';
import { nanoid } from 'nanoid';
import mixpanel from 'mixpanel-browser';
import { Event, Source, track } from './report';
import { getMode } from './util';
import * as R from 'ramda';
import Tracker from '@openreplay/tracker';

const tracker = new Tracker({
  projectKey: "VzGISOLFpFFv1yHRdHHJ",
  ingestPoint: "https://data.ercu.be/ingest",
});

Modal.setAppElement('#react-root');

let userId, userProgress;
if (localStorage.getItem('userId') === null) {
  userId = nanoid();
  userProgress = -1;
  localStorage.setItem('userId', userId);
  localStorage.setItem('userProgress', -1);
} else {
  userId = localStorage.getItem('userId');
  userProgress = parseInt(localStorage.getItem('userProgress'), 10) || -1;
  if (userProgress === 8) {
    window.location = '/playground'
  }
}

mixpanel.init('6be6077e1d5b8de6978c65490e1666ea', {
  debug: false,
  ignore_dnt: true,
  api_host: 'https://data.chameleon.typecheck.me',
});

mixpanel.identify(userId);
tracker.start();
tracker.setUserID(userId)

store.dispatch(switchTaskThunk(userProgress + 1));

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
  let wellTyped = useSelector(state => state.debugger.wellTyped);
  return (
    <>
      <Modal
        isOpen={wellTyped}
        className='max-w-2xl bg-gray-100 h-80 min-w-max left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute p-6 rounded-md'
      >
        <ModelContent />
        {/* this is for study only  */}
      </Modal>
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

const ModelContent = () => {
  let dispatch = useDispatch();
  let currentTaskNum = useSelector(state => state.debugger.currentTaskNum);
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));
  const deductionSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  const mode = getMode(multipleExps, deductionSteps);
  useEffect(() => {
    track({
      event: Event.succeed,
      source: Source.remote,
      mode,
      task: currentTaskNum,
    });
    localStorage.setItem('userProgress', currentTaskNum);
  }, []);
  return (
    <div className='flex flex-col justify-around items-center h-full'>
      <div>
        <p className='text-center'>
          Congratulations. You fixed the type error!
        </p>
        {currentTaskNum === 8 ? (
          <p className='text-center'>Click next to leave us some feedback.</p>
        ) : (
          <p className='text-center'>
            Click next to head over to the next challenge.
          </p>
        )}
      </div>
      <button
        className='px-5 py-1 bg-green-400 rounded-md'
        onClick={() => {
          if (currentTaskNum === 8) {
            let participant_id = localStorage.getItem('userId');
            console.log(participant_id)
            window.location =
            `https://tally.so/r/nrjAxX?participant_id=${participant_id}`;
            return;
          } else {
            dispatch(switchTaskThunk(currentTaskNum + 1));
            dispatch(toNormalMode());
          }
        }}
      >
        Next
      </button>
    </div>
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
