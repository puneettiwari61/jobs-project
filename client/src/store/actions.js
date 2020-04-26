import {
  GET_CANDIDATE,
  LOGOUT_CANDIDATE,
  LOGIN_CANDIDATE,
  GET_EMPLOYER,
  LOGOUT_EMPLOYER,
  LOGIN_EMPLOYER
} from "./types";
// TODO: Axios should be axios.
import Axios from "axios";
import { store } from "./index";

export let fetchLoggedCandidate = payload => {
  return { type: GET_CANDIDATE, payload };
};

export let logoutCandidateFunc = payload => {
  return { type: LOGOUT_CANDIDATE, payload };
};

export let loginCandidateFunc = payload => {
  return { type: LOGIN_CANDIDATE, payload };
};

export let fetchLoggedEmployer = payload => {
  console.log(payload, "from actions pf ftchloogedempluyer");
  return { type: GET_EMPLOYER, payload };
};

export let logoutEmployerFunc = payload => {
  return { type: LOGOUT_EMPLOYER, payload };
};

export let loginEmployerFunc = payload => {
  console.log(payload, "from employer func login");
  return { type: LOGIN_EMPLOYER, payload };
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
          if (userType === "candidate") {
            store.dispatch(
              // TODO: is, has
              fetchLoggedCandidate({
                candidateData: res.data[userType],
                isCandidateLogged: true
              })
            );
          } else if (userType === "employer") {
            store.dispatch(
              fetchLoggedEmployer({
                employerData: res.data[userType],
                isEmployerLogged: true
              })
            );
          }
        })
        .catch(err => console.log(err, "invalid user"));
    }
  };
};
