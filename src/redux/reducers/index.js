import { combineReducers } from "redux";

import { gymReducer } from "./gym";

export const rootReducer = combineReducers({
  gym: gymReducer,
});
