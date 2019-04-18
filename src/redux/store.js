import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import reducer from "./reducers";

const loggerMiddleware = createLogger({
  predicate: (getState, action) => true
});

function configureStorage(initialState) {
  let enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  let store = createStore(reducer, initialState, enhancer);
  return store;
}

let store = configureStorage({});

export default store;
