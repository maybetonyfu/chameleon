import {
  configureStore,
} from '@reduxjs/toolkit';
import debuggerReducer from "./debuggerSlice.js"

const store = configureStore({
  reducer: {
    'debugger': debuggerReducer
  },
  devTools: true,
});

export default store;
