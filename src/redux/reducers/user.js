//Reducers: Manages data, state
import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { combineReducers } from "redux";

//Define name and default value
export const user = createReducer(
  { username: "Anon" },
  {
    [types.SET_USER_OBJECT](state, action) {
      return { ...action.payload };
    },
    [types.SET_USERNAME](state, action) {
      return { ...state, username: action.payload };
    }
  }
);
