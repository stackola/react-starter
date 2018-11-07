import {combineReducers} from 'redux';

import * as userReducer from './user';
import * as settingsReducer from './settings';
import * as buildReducer from './build';

export default combineReducers(Object.assign({}, userReducer, settingsReducer, buildReducer));