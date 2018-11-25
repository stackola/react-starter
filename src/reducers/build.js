//Reducers: Manages data, state
import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { combineReducers } from "redux";

//Define name and default value
export const build = createReducer(
	{
		cities: [],
		volume: 0,
		render: null,
		addons: {},
		startMonth: null,
		endMonth: null,
		color: "#004a99",
		inputs: {},
		text: {
			size: 20,
			text: "",
			font: "Helvetica",
			color: "#fff",
			position: { x: 50, y: 50 }
		},
		image: {
			position: { left: 10, top: 20 },
			size: 50,
			url: null
		}
	},
	{
		[types.SELECT_CITY](state, action) {
			return { ...state, cities: [...state.cities, action.payload] };
		},
		[types.SET_RENDER](state, action) {
			return { ...state, render: action.payload };
		},
		[types.REMOVE_CITY](state, action) {
			return {
				...state,
				cities: state.cities.filter(c => {
					return c != action.payload;
				})
			};
		},
		[types.SET_VOLUME](state, action) {
			return { ...state, volume: action.payload };
		},
		[types.TOGGLE_ADDON](state, action) {
			return {
				...state,
				addons: {
					...state.addons,
					[action.payload]: state.addons[action.payload]
						? !state.addons[action.payload]
						: true
				}
			};
		},
		[types.SET_START_MONTH](state, action) {
			return { ...state, startMonth: action.payload };
		},
		[types.SET_END_MONTH](state, action) {
			return { ...state, endMonth: action.payload };
		},
		[types.SET_COLOR](state, action) {
			return { ...state, color: action.payload };
		},
		[types.SET_INPUTS](state, action) {
			return { ...state, inputs: action.payload };
		},
		[types.SET_TEXT](state, action) {
			return { ...state, text: { ...state.text, text: action.payload } };
		},
		[types.SET_FONT](state, action) {
			return { ...state, text: { ...state.text, font: action.payload } };
		},
		[types.SET_TEXT_SIZE](state, action) {
			return { ...state, text: { ...state.text, size: action.payload } };
		},
		[types.SET_TEXT_POSITION](state, action) {
			return {
				...state,
				text: { ...state.text, position: action.payload }
			};
		},
		[types.SET_TEXT_COLOR](state, action) {
			return { ...state, text: { ...state.text, color: action.payload } };
		},
		[types.SET_IMAGE_URL](state, action) {
			return {
				...state,
				image: { ...state.image, url: action.payload }
			};
		},
		[types.SET_IMAGE_SIZE](state, action) {
			return {
				...state,
				image: { ...state.image, size: action.payload }
			};
		},
		[types.SET_IMAGE_POSITION](state, action) {
			return {
				...state,
				image: { ...state.image, position: action.payload }
			};
		}
	}
);
