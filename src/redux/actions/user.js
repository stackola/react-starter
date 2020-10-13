import * as types from "./types";

export function setUserObject(user) {
  return {
    type: types.setUserObject,
    payload: user,
  };
}
