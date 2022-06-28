import { createActions, createReducer } from "reduxsauce";
const INITIAL_STATE = { allMaintenanceOcurrency: [], filteredMaintenanceOcurrency: []
};

export const { Types, Creators } = createActions({
  setMaintenanceOcurrency: ["data"],
  updateFilteredMaintenanceOcurrency: ["data"]
});

const setMaintenanceOcurrency = (state = INITIAL_STATE, action) => ({
  ...state,
  allMaintenanceOcurrency: action.data,
  filteredMaintenanceOcurrency: action.data
});

const updateFilteredMaintenanceOcurrency = (state = INITIAL_STATE, action) => ({
  ...state,
  filteredMaintenanceOcurrency: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_MAINTENANCE_OCURRENCY]: setMaintenanceOcurrency,
  [Types.UPDATE_FILTERED_MAINTENANCE_OCURRENCY]: updateFilteredMaintenanceOcurrency
});
