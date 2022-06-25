import { createActions, createReducer } from "reduxsauce";
const INITIAL_STATE = { allAssets: [], filteredAssets: [] };

export const { Types, Creators } = createActions({
  setAssets: ["data"],
  updateFilteredAssets: ["data"]
});

const setAssets = (state = INITIAL_STATE, action) => ({
  ...state,
  allAssets: action.data,
  filteredAssets: action.data
});

const updateFilteredAssets = (state = INITIAL_STATE, action) => ({
  ...state,
  filteredAssets: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_ASSETS]: setAssets,
  [Types.UPDATE_FILTERED_ASSETS]: updateFilteredAssets
});
