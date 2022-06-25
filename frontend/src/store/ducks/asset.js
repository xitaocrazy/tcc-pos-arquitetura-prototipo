import { createActions, createReducer } from "reduxsauce";
const INITIAL_STATE = { allAssets: [], filteredAssets: [] };

export const { Types, Creators } = createActions({
  setAssets: ["data"],
  removeAsset: ["id"],
  updateFilteredAssets: ["data"]
});

const setAssets = (state = INITIAL_STATE, action) => ({
  ...state,
  allAssets: action.data,
  filteredAssets: action.data
});

const removeAsset = (state = INITIAL_STATE, action) => ({
  ...state,
  allAssets: state.allAssets.filter((item, _) => item._id !== action.id),
  filteredassets: state.filteredAssets.filter((item, _) => item._id !== action.id)
});

const updateFilteredAssets = (state = INITIAL_STATE, action) => ({
  ...state,
  filteredAssets: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_ASSETS]: setAssets,
  [Types.REMOVE_ASSET]: removeAsset,
  [Types.UPDATE_FILTERED_ASSETS]: updateFilteredAssets
});
