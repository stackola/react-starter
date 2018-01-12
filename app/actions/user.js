import * as types from './types';
//We have to define action types in types.js, here we make them available as functions that can be mapped to props.
export function setUserObject(user) {
	return {
		type: types.SET_USER_OBJECT,
		payload: user
	}
}

export function setUsername(username){
	return {
		type: types.SET_USERNAME,
		payload: username
	}
}

/*
Example of an async function
export function click(id){
	return (dispatch, getState) => {
		let state=getState();		
		state.socket.socket.get('/user/click/14', function(body, jwr){
			//Dispatch redux action.
			dispatch(setUsername(body.username));
		} );
	}
}
*/