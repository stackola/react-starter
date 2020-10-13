import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {persistStore, persistReducer} from 'redux-persist';
import reducer from './reducers';
import storage from 'redux-persist/lib/storage'
const loggerMiddleware = createLogger({
  predicate: (getState, action) => true,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);
function configureStorage(initialState) {
  let enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  let store = createStore(persistedReducer, initialState, enhancer);
  return store;
}

export let store = configureStorage({});
export let persistor = persistStore(store);
