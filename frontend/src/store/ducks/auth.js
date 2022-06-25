import { createActions, createReducer } from "reduxsauce";
const INITIAL_STATE = { isAuth: false, user: {} };

export const { Types, Creators } = createActions({
  setAuth: ["value"],
  setUser: ["user"]
});

const setAuth = (state = INITIAL_STATE, action) => ({
  ...state,
  isAuth: action.value
});

const setUser = (state = INITIAL_STATE, action) => ({
  ...state,
  user: action.user
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_AUTH]: setAuth,
  [Types.SET_USER]: setUser
});
