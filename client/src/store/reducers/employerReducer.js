import { IDENTIFY_EMPLOYER, LOGOUT_EMPLOYER, LOGIN_EMPLOYER } from "../types";

let initialState = {
  currentEmployer: null,
  isAuthInProgress: false,
  isAuthDone: false
};

export default function employerReducer(state = initialState, action) {
  switch (action.type) {
    case IDENTIFY_EMPLOYER:
      return action.payload;
    case LOGOUT_EMPLOYER:
      return action.payload;
    case LOGIN_EMPLOYER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
