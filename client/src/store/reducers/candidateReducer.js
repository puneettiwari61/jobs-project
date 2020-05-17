import {
  IDENTIFY_CANDIDATE,
  LOGOUT_CANDIDATE,
  LOGIN_CANDIDATE,
  UPDATE_LOGGED_CANDIDATE,
  CANDIDATE_AUTH_IN_PROGRESS,
  CANDIDATE_SKILLS_UPDATE
} from "../types";

let initialState = {
  currentCandidate: null,
  isAuthInProgress: false,
  isAuthDone: false
};

export default function candidateReducer(state = initialState, action) {
  switch (action.type) {
    case IDENTIFY_CANDIDATE:
      return action.payload;
    case LOGOUT_CANDIDATE:
      return action.payload;
    case LOGIN_CANDIDATE:
      return { ...state, ...action.payload };
    case UPDATE_LOGGED_CANDIDATE:
      return { ...state, ...action.payload };
    case CANDIDATE_AUTH_IN_PROGRESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
