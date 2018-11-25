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

export function setFont(font) {
	return {
		type: types.SET_FONT,
		payload: font
	}
}

export function setText(text) {
	return {
		type: types.SET_TEXT,
		payload: text
	}
}
export function setRender(render) {
	return {
		type: types.SET_RENDER,
		payload: render
	}
}

export function setTextSize(size) {
	return {
		type: types.SET_TEXT_SIZE,
		payload: size
	}
}

export function setTextPosition(position) {
	return {
		type: types.SET_TEXT_POSITION,
		payload: position
	}
}

export function setTextColor(color) {
	return {
		type: types.SET_TEXT_COLOR,
		payload: color
	}
}


export function setImageUrl(url) {
	return {
		type: types.SET_IMAGE_URL,
		payload: url
	}
}

export function setImageSize(size) {
	return {
		type: types.SET_IMAGE_SIZE,
		payload: size
	}
}

export function setImagePosition(pos) {
	return {
		type: types.SET_IMAGE_POSITION,
		payload: pos
	}
}

