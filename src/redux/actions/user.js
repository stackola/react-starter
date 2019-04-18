import * as types from "./types";

//We have to define action types in types.js, here we make them available as functions that can be mapped to props.

export function setUserObject(user) {
  return {
    type: types.SET_USER_OBJECT,
    payload: user
  };
}

export function setUsername(name) {
  return {
    type: types.SET_USERNAME,
    payload: name
  };
}

// asnyc function
export function asnycDemo(username) {
  return (dispatch, getState) => {
    //fetch some data for example
    setTimeout(() => {
      // Dispatch redux function:
      dispatch(setUsername(username));
    }, 1000);
  };
}
