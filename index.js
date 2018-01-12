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

import reducer from './app/reducers';
//import AppContainer from './app/containers/AppContainer.js'
import AppContainer from './app/containers/AppContainer.js'

var DEBUG=true;

const loggerMiddleware = createLogger({
  predicate: (getState, action) => DEBUG
});

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const React_starter = () => (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
);

document.addEventListener('DOMContentLoaded', ()=>{
  ReactDOM.render(<React_starter/>, document.getElementById('app'));
});
