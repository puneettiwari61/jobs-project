import {
  IDENTIFY_CANDIDATE,
  IDENTIFY_EMPLOYER,
  LOGOUT_CANDIDATE,
  LOGIN_CANDIDATE,
  LOGOUT_EMPLOYER,
  LOGIN_EMPLOYER,
  UPDATE_LOGGED_CANDIDATE
} from "./types";
// TODO: Axios should be axios.
import Axios from "axios";
import { store } from "./index";

export let fetchLoggedCandidate = payload => {
  return { type: IDENTIFY_CANDIDATE, payload };
};

export let logoutCandidate = payload => {
  return { type: LOGOUT_CANDIDATE, payload };
};

export let loginCandidate = payload => {
  return { type: LOGIN_CANDIDATE, payload };
};

export let updateLoggedCandidate = payload => {
  return { type: UPDATE_LOGGED_CANDIDATE, payload };
};

export let fetchLoggedEmployer = payload => {
  return { type: IDENTIFY_EMPLOYER, payload };
};

export let logoutEmployer = payload => {
  return { type: LOGOUT_EMPLOYER, payload };
};

export let loginEmployer = payload => {
  console.log(payload, "from employer func login");
  return { type: LOGIN_EMPLOYER, payload };
};

export let identifyLoggedUser = () => {
  return function() {
    if (localStorage.jobUser) {
      let userType = JSON.parse(localStorage.jobUser).type;
      Axios.get(`/api/v1/${userType}s/me`, {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      })
        .then(res => {
          console.log(res.data[userType], "user identified");
          if (userType === "candidate") {
            store.dispatch(
              // TODO: is, has
              fetchLoggedCandidate({
                currentCandidate: res.data[userType],
                isAuthInProgress: false,
                isAuthDone: true
              })
            );
          } else if (userType === "employer") {
            store.dispatch(
              fetchLoggedEmployer({
                currentEmployer: res.data[userType],
                isAuthInProgress: false,
                isAuthDone: true
              })
            );
          }
        })
        .catch(err => console.log(err, "invalid user"));
    }
  };
};
