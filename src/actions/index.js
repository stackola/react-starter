import * as userActions from './user';
import * as settingsActions from './settings';
import * as buildActions from './build';

export const ActionCreators = Object.assign({}, userActions, settingsActions, buildActions);