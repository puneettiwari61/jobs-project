import { getUser, logoutUser, loginUser } from "./types";
// TODO: Axios should be axios.
import Axios from "axios";
import { store } from "./index";
export let fetchLoggedUser = payload => {
  return { type: getUser, payload };
};

export let logoutUserFunc = payload => {
  return { type: logoutUser, payload };
};

export let loginUserFunc = payload => {
  return { type: loginUser, payload };
};

export let fetchOnMount = () => {
  return function() {
    if (localStorage.jobUser) {
      let userType = JSON.parse(localStorage.jobUser).type;
      Axios.get(`/api/v1/${userType}s/me`, {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      })
        .then(res => {
          console.log(res.data[userType], "user identified");
          store.dispatch(
            // TODO: is, has
            fetchLoggedUser({ user: res.data[userType], userLogged: true })
          );
        })
        .catch(err => console.log(err, "invalid user"));
    }
  };
};
