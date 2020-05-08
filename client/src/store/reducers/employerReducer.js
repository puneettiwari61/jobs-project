import {
  IDENTIFY_EMPLOYER,
  LOGOUT_EMPLOYER,
  LOGIN_EMPLOYER,
  EMPLOYER_AUTH_IN_PROGRESS,
  UPDATE_LOGGED_EMPLOYER
} from "../types";

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
    case EMPLOYER_AUTH_IN_PROGRESS:
      return { ...state, ...action.payload };
    case UPDATE_LOGGED_EMPLOYER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
