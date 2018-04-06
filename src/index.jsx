import React, { Component } from "react";

import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/lib/integration/react";

import reducer from "./reducers";
//import AppContainer from './app/containers/AppContainer.js'
import AppContainer from "./containers/AppContainer";


const persistConfig = {
  key: "v0",
  storage: storage
};

const loggerMiddleware = createLogger({
  predicate: (getState, action) => process.env.DEBUG
});

function configureStorage(initialState) {
  let enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  let persistedReducer = persistReducer(persistConfig, reducer);
  let store = createStore(persistedReducer, initialState, enhancer);
  let persistor = persistStore(store);
  return [store, persistor];
}

let [store, persistor] = configureStorage({});

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component />
      </PersistGate>
    </Provider>,
    document.getElementById("app")
  );
};

render(AppContainer);

if (module.hot) {
  module.hot.accept("./containers/AppContainer", () => {
    var NextRootContainer = require("./containers/AppContainer").default;
    render(NextRootContainer);
  });
}