import { combineReducers } from "redux";
import asset from "./asset";
import auth from "./auth";
import maintenanceProcedure from "./maintenanceProcedure";
import maintenanceHistory from "./maintenanceHistory";

export default combineReducers({
  asset,
  auth,
  maintenanceProcedure,
  maintenanceHistory
});
