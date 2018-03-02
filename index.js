import React, {
  Component
} from 'react';

import ReactDOM from 'react-dom';

import {
  Provider
} from 'react-redux';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  createLogger
} from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react'

import reducer from './app/reducers';
//import AppContainer from './app/containers/AppContainer.js'
import AppContainer from './app/containers/AppContainer.jsx'

var DEBUG=true;

const persistConfig = {
  key: 'v0',
  storage: storage,
};

const loggerMiddleware = createLogger({
  predicate: (getState, action) => DEBUG
});

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  const persistedReducer = persistReducer(persistConfig, reducer);
  let store = createStore(persistedReducer, initialState, enhancer);
  let persistor = persistStore(store);
  return { store, persistor };
}

const store = configureStore({});


const React_starter = () => (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<React_starter />, document.getElementById('app'));
});