import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userInfo: userReducer
});

export let store = createStore(rootReducer, applyMiddleware(thunk));
