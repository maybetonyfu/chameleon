import {
  configureStore,
} from '@reduxjs/toolkit';
import debuggerReducer from "./debuggerSlice.js"
// import editorReducer from "./editorSlice"


const store = configureStore({
  reducer: {
    'debugger': debuggerReducer,
    // 'editor': editorReducer
  },
  // devTools: true,
});

export default store;
