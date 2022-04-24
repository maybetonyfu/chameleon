import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import {
  switchTaskThunk,
} from './debuggerSlice';
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import Editor from "./Editor"
import Debugger from "./Debugger"

let currentTask = 1;

store.dispatch(switchTaskThunk(currentTask));

const App = () => {
  return <div className='w-full h-full'>
    <Splitter initialSizes={[60, 40]}>
      <Editor></Editor>
      <Debugger></Debugger>
    </Splitter>
  </div>
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('react-root'),
);
