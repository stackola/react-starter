import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

export const user = createReducer(
  {},
  {
    [types.setUserObject](state, action) {
      return { ...action.payload };
    },
  }
);
