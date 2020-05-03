import {
  IDENTIFY_CANDIDATE,
  IDENTIFY_EMPLOYER,
  LOGOUT_CANDIDATE,
  LOGIN_CANDIDATE,
  LOGOUT_EMPLOYER,
  LOGIN_EMPLOYER,
  UPDATE_LOGGED_CANDIDATE,
  CANDIDATE_AUTH_IN_PROGRESS,
  EMPLOYER_AUTH_IN_PROGRESS
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

export let candidateAuthProgress = payload => {
  return { type: CANDIDATE_AUTH_IN_PROGRESS, payload };
};

export let employerAuthProgress = payload => {
  return { type: EMPLOYER_AUTH_IN_PROGRESS, payload };
};

export let identifyLoggedUser = () => {
  return function() {
    if (localStorage.jobUser) {
      let userType = JSON.parse(localStorage.jobUser).type;
      store.dispatch(
        userType === "candidate"
          ? candidateAuthProgress({ isAuthInProgress: true, isAuthDone: false })
          : employerAuthProgress({ isAuthInProgress: true, isAuthDone: false })
      );
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

export let validateCandidatesLogin = payload => {
  return function() {
    store.dispatch(
      candidateAuthProgress({ isAuthInProgress: true, isAuthDone: false })
    );
    Axios.post("/api/v1/candidates/login", { ...payload })
      .then(res => {
        if (res.data.success) {
          if (res.data.success === true) {
            console.log(res, "login successful");
            localStorage.setItem(
              "jobUser",
              JSON.stringify({ token: res.data.token, type: "candidate" })
            );
            store.dispatch(
              loginCandidate({
                currentCandidate: res.data.candidate,
                isAuthInProgress: false,
                isAuthDone: true
              })
            );
          }
        }
      })
      .catch(err => {
        console.log(err, "login failed");
      });
  };
};

export let candidatesSignup = payload => {
  return function() {
    Axios.post("/api/v1/candidates/signup", { ...payload })
      .then(res => {
        if (res.data.success) {
          console.log(res, "signup successful");
          localStorage.setItem(
            "jobUser",
            JSON.stringify({ token: res.data.token, type: "candidate" })
          );
          store.dispatch(
            loginCandidate({
              currentCandidate: res.data.candidate,
              isAuthInProgress: false,
              isAuthDone: true
            })
          );
        }
      })
      .catch(err => console.log(err, "signup failed"));
  };
};

export let validateEmployersLogin = payload => {
  return function() {
    store.dispatch(
      employerAuthProgress({ isAuthInProgress: true, isAuthDone: false })
    );
    Axios.post("/api/v1/employers/login", { ...payload })
      .then(res => {
        if (res.data.success === true) {
          console.log(res, "login successful");
          localStorage.setItem(
            "jobUser",
            JSON.stringify({ token: res.data.token, type: "employer" })
          );
          // this.props.loginFunction();
          store.dispatch(
            loginEmployer({
              currentEmployer: res.data.employer,
              isAuthInProgress: false,
              isAuthDone: true
            })
          );
        }
      })
      .catch(err => console.log(err, "login failed"));
  };
};

export let employersSignup = payload => {
  return function() {
    Axios.post("/api/v1/employers/signup", { ...payload })
      .then(res => {
        if (res.data.success) {
          console.log(res, "signup successful");
          localStorage.setItem(
            "jobUser",
            JSON.stringify({ token: res.data.token, type: "employer" })
          );
          store.dispatch(
            loginEmployer({
              currentEmployer: res.data.employer,
              isAuthInProgress: false,
              isAuthDone: true
            })
          );
        }
      })
      .catch(err => console.log(err, "signup failed"));
  };
};

export let saveCandidatesBasicInfo = payload => {
  return function() {
    Axios.post(
      "/api/v1/candidates/profile",
      { ...payload },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "portfolio successful");
        store.dispatch(
          updateLoggedCandidate({ currentCandidate: res.data.candidate })
        );
      })
      .catch(err => console.log(err, "portfolio failed"));
  };
};

export let addCandidatesEducation = payload => {
  return function() {
    Axios.post(
      "/api/v1/candidates/education",
      { ...payload },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "education successful");
        store.dispatch(
          updateLoggedCandidate({ currentCandidate: res.data.candidate })
        );
      })
      .catch(err => console.log(err, "education failed"));
  };
};

export let addCandidatesExperience = payload => {
  return function() {
    Axios.post(
      "/api/v1/candidates/experience",
      { ...payload },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "experience successful");
        store.dispatch(
          updateLoggedCandidate({ currentCandidate: res.data.candidate })
        );
      })
      .catch(err => console.log(err, "experience failed"));
  };
};

export let addCandidatesSkills = payload => {
  return function() {
    Axios.post(
      "/api/v1/candidates/skills",
      { ...payload },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res.data, "skills successful");
      })
      .catch(err => console.log(err, "skills failed"));
  };
};
