import { createActions, createReducer } from "reduxsauce";
const INITIAL_STATE = { allMaintenanceProcedures: [], filteredMaintenanceProcedures: []
};

export const { Types, Creators } = createActions({
  setMaintenanceProcedures: ["data"],
  updateFilteredMaintenanceProcedures: ["data"]
});

const setMaintenanceProcedures = (state = INITIAL_STATE, action) => ({
  ...state,
  allMaintenanceProcedures: action.data,
  filteredMaintenanceProcedures: action.data
});

const updateFilteredMaintenanceProcedures = (state = INITIAL_STATE, action) => ({
  ...state,
  filteredMaintenanceProcedures: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_MAINTENANCE_PROCEDURES]: setMaintenanceProcedures,
  [Types.UPDATE_FILTERED_MAINTENANCE_PROCEDURES]: updateFilteredMaintenanceProcedures
});
