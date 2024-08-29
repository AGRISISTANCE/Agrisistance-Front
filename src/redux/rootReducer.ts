// src/redux/rootReducer.ts

import { combineReducers } from "redux";
import someReducer from "./reducers/someReducer"; // Import your individual reducers

const rootReducer = combineReducers({
  someState: someReducer, // Combine your reducers here
  // Add other reducers as needed
});

export default rootReducer;
