import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import candidateReducer from "./reducers/candidateReducer";
import employerReducer from "./reducers/employerReducer";

const rootReducer = combineReducers({
  candidate: candidateReducer,
  employer: employerReducer
});

export let store = createStore(rootReducer, applyMiddleware(thunk));
