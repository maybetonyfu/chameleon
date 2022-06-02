import React from 'react';
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
  toNormalMode
} from './debuggerSlice';
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import Editor from "./Editor"
import Debugger from "./Debugger"
import MenuBar from "./MenuBar"
import Modal from 'react-modal';

Modal.setAppElement('#react-root');


window.addEventListener('keyup', (event) => {
  const keyName = event.key;
  if (keyName === '1' || keyName === '2') {
    store.dispatch(showBoth())
  }
})

window.addEventListener('keydown', (event) => {
  let state = store.getState()
  const keyName = event.key;

  if (state.debugger.mode === editorModes.normal) {
    if (keyName === 'Tab') {
      event.preventDefault()
      if (!state.debugger.multipleExps) {
        store.dispatch(toggleMultipleExps())
      } else if (state.debugger.multipleExps && !state.debugger.debuggingSteps) {
        store.dispatch(toggleDebuggerStpes())
      } else if (state.debugger.multipleExps && state.debugger.debuggingSteps) {
        store.dispatch(toggleMultipleExps())
        store.dispatch(toggleDebuggerStpes())
      }
    }

    if (keyName === '1') {
      store.dispatch(showOnlyMark1())
    }

    if (keyName === '2') {
      store.dispatch(showOnlyMark2())
    }

    if (state.debugger.debuggingSteps) {
      if (keyName === 'ArrowDown' || keyName === "ArrowRight" || keyName === 'j') {
        store.dispatch(prevStep())
      }
      if (keyName === 'ArrowUp' || keyName === "ArrowLeft" || keyName === 'k') {
        store.dispatch(nextStep())
      }
    }
  }
})

const App = () => {
  let wellTyped = useSelector(state => state.debugger.wellTyped);
  let loadError = useSelector(state => state.debugger.loadError);
  let parseError = useSelector(state => state.debugger.parseError);
  return <>
  <Modal
    isOpen={wellTyped}
    className='max-w-2xl bg-gray-100 h-80 min-w-max left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute p-6 rounded-md'
  >
    <ModelContent />
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
}

const ModelContent = () => {
  let dispatch = useDispatch();
  let currentTaskNum = useSelector(state => state.debugger.currentTaskNum);
  let numOfTasks = 9

  // analytics.track(events.succeed, { taskNumber: currentTaskNum, mode });
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
            window.location =
              'https://docs.google.com/forms/d/e/1FAIpQLSfmXyASOPW2HIK-Oqp5nELBTltKeqZjqQ0G9JFram8eUCx26A/viewform?usp=sf_link';
            return;
          } else {
            dispatch(switchTaskThunk(currentTaskNum + 1))
            dispatch(toNormalMode())

            }
          }
        }
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
  </React.StrictMode>
  ,
  document.getElementById('react-root'),
);
