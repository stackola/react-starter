import * as types from './types';

export function setSettings(settings) {
	return {
		type: types.SET_SETTINGS,
		payload: settings
	}
}