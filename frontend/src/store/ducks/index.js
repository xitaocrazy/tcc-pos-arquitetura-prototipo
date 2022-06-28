import { combineReducers } from "redux";
import asset from "./asset";
import auth from "./auth";
import maintenanceProcedure from "./maintenanceProcedure";
import MaintenanceOcurrency from "./maintenanceOcurrency";

export default combineReducers({
  asset,
  auth,
  maintenanceProcedure,
  MaintenanceOcurrency
});
