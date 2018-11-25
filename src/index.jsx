import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
//import AppContainer from './app/containers/AppContainer.js'
import AppContainer from './containers/AppContainer';

import { HashRouter as Router } from 'react-router-dom';


const loggerMiddleware = createLogger({
  predicate: (getState, action) => false
});

function configureStorage(initialState) {
  let enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  let store = createStore(reducer, initialState, enhancer);
  return store;
}

let store = configureStorage({});

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
        <Router>
          <Component />
        </Router>
    </Provider>,
    document.getElementById('app')
  );
};

render(AppContainer);

if (module.hot) {
  module.hot.accept('./containers/AppContainer', () => {
    var NextRootContainer = require('./containers/AppContainer').default;
    render(NextRootContainer);
  });
}
