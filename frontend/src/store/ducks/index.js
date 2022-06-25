import { combineReducers } from "redux";
import asset from "./asset";
import auth from "./auth";

export default combineReducers({
  asset,
  auth
});
