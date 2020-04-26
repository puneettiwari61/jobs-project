import { GET_CANDIDATE, LOGOUT_CANDIDATE, LOGIN_CANDIDATE } from "../types";

export default function candidateReducer(
  state = { candidateData: null, isCandidateLogged: false },
  action
) {
  switch (action.type) {
    case GET_CANDIDATE:
      return action.payload;
    case LOGOUT_CANDIDATE:
      return action.payload;
    case LOGIN_CANDIDATE:
      return action.payload;
    default:
      return state;
  }
}
