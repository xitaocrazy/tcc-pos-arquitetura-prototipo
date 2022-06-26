import { createActions, createReducer } from "reduxsauce";
const INITIAL_STATE = { allMaintenanceHistory: [], filteredMaintenanceHistory: []
};

export const { Types, Creators } = createActions({
  setMaintenanceHistory: ["data"],
  updateFilteredMaintenanceHistory: ["data"]
});

const setMaintenanceHistory = (state = INITIAL_STATE, action) => ({
  ...state,
  allMaintenanceHistory: action.data,
  filteredMaintenanceHistory: action.data
});

const updateFilteredMaintenanceHistory = (state = INITIAL_STATE, action) => ({
  ...state,
  filteredMaintenanceHistory: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_MAINTENANCE_HISTORY]: setMaintenanceHistory,
  [Types.UPDATE_FILTERED_MAINTENANCE_HISTORY]: updateFilteredMaintenanceHistory
});
