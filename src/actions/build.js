import * as types from './types';

export function selectCity(city) {
	return {
		type: types.SELECT_CITY,
		payload: city
	}
}
export function removeCity(city) {
	return {
		type: types.REMOVE_CITY,
		payload: city
	}
}
export function setVolume(v) {
	return {
		type: types.SET_VOLUME,
		payload: v
	}
}
export function toggleAddon(a) {
	return {
		type: types.TOGGLE_ADDON,
		payload: a
	}
}
export function setStartMonth(m) {
	return {
		type: types.SET_START_MONTH,
		payload: m
	}
}
export function setEndMonth(m) {
	return {
		type: types.SET_END_MONTH,
		payload: m
	}
}
export function setColor(c) {
	return {
		type: types.SET_COLOR,
		payload: c
	}
}
export function setInputs(inputs) {
	return {
		type: types.SET_INPUTS,
		payload: inputs
	}
}

