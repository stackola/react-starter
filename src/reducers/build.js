//Reducers: Manages data, state
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {
	combineReducers
} from 'redux';

//Define name and default value
export const build = createReducer({cities:["Dresden","München"], volume:0, addons:{}, startMonth:null, endMonth:null, color:null, inputs:{}}, {
	[types.SELECT_CITY](state, action) {
		return {...state, cities:[...state.cities, action.payload]};
	},
	[types.REMOVE_CITY](state, action) {
		return {...state, cities:state.cities.filter((c)=>{return c!=action.payload})};
	},
	[types.SET_VOLUME](state, action) {
		return {...state, volume:action.payload};
	},
	[types.TOGGLE_ADDON](state, action) {
		return {...state, addons:{...state.addons, [action.payload]:state.addons[action.payload]?!state.addons[action.payload]:true}};
	},
	[types.SET_START_MONTH](state, action) {
		return {...state, startMonth: action.payload};
	},
	[types.SET_END_MONTH](state, action) {
		return {...state, endMonth: action.payload};
	},
	[types.SET_COLOR](state, action) {
		return {...state, color: action.payload};
	},
	[types.SET_INPUTS](state, action) {
		return {...state, inputs: action.payload};
	}
})