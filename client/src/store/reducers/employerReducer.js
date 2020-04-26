import { GET_EMPLOYER, LOGOUT_EMPLOYER, LOGIN_EMPLOYER } from "../types";

export default function employerReducer(
  state = { employerData: null, isEmployerLogged: false },
  action
) {
  switch (action.type) {
    case GET_EMPLOYER:
      return action.payload;
    case LOGOUT_EMPLOYER:
      return action.payload;
    case LOGIN_EMPLOYER:
      return action.payload;
    default:
      return state;
  }
}
