import { getUser, logoutUser, loginUser } from "../types";

export default function userReducer(
  state = { user: null, userLogged: false },
  action
) {
  switch (action.type) {
    case getUser:
      return action.payload;
    case logoutUser:
      return action.payload;
    case loginUser:
      return action.payload;
    default:
      return state;
  }
}
