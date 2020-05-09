import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Header from "./components/Common/Header";
import CandidatesSignUp from "./components/CandidatesSignUp/CandidatesSignUp";
import CandidatesLogin from "./components/CandidatesLogin/CandidatesLogin";
import EmployersLogin from "./components/EmployersLogin/EmployersLogin";
import EmployersSignUp from "./components/EmployersSignup/EmployersSignUp";
import CandidatesProfile from "./components/CandidatesOnboarding/CandidatesProfile";
import EmployersProfile from "./components/EmployersOnboarding/EmployersProfile"
import CandidatesPortfolio from "./components/CandidatePortfolio/CandidatePortfolio"
import EmployerPortfolio from "./components/EmployerPortfolio/EmployerPortfolio"
import Loader from "./components/Loader/Lodaer";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  logoutCandidate,
  loginCandidate,
  loginEmployer,
  logoutEmployer,
  identifyLoggedUser
} from "./store/actions";
import "./App.css";

function PublicRoutes(props) {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/candidates/signup">
          <CandidatesSignUp />
        </Route>
        <Route path="/employers/signup">
          <EmployersSignUp />
        </Route>
        <Route path="/candidates/login">
          <CandidatesLogin />
        </Route>
        <Route path="/employers/login">
          <EmployersLogin />
        </Route>
        
        />
        <Route path="*">
          <h1
            style={{
              margin: "200px auto",
              textAlign: "center",
              color: "red"
            }}
          >
            Page Not found
          </h1>
        </Route>
      </Switch>
    </>
  );
}

function PrivateRoutes(props) {
  return (
    <>
      <Header {...props} />
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/candidates/profile">
          <CandidatesProfile />
        </Route>
        <Route path="/candidateprofile">
          <CandidatesPortfolio />
        </Route>
        <Route path="/employerprofile">
          <EmployerPortfolio />
        </Route>
        <Route path="/employers/profile">
          <EmployersProfile />
        </Route>
        <Route path="*">
          <h1
            style={{
              margin: "200px auto",
              textAlign: "center",
              color: "red"
            }}
          >
            Page Not found
          </h1>
        </Route>
      </Switch>
    </>
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(identifyLoggedUser());
  }

  handleLogout = () => {
    localStorage.clear();
    if (this.props.candidate.currentCandidate) {
      this.props.dispatch(
        logoutCandidate({
          currentCandidate: null,
          isAuthInProgress: false,
          isAuthDone: false
        })
      );
    } else if (this.props.employer.currentEmployer) {
      this.props.dispatch(
        logoutEmployer({
          currentEmployer: null,
          isAuthInProgress: false,
          isAuthDone: false
        })
      );
    }
  };

  loginFunction = () => {
    if (this.props.candidateData) {
      this.props.dispatch(
        loginCandidate({
          currentEmployer: null,
          isAuthInProgress: false,
          isAuthDone: false
        })
      );
    } else if (this.props.employerData) {
      this.props.dispatch(loginEmployer({ isEmployerLogged: true }));
    }
  };

  render() {
    let employer = this.props.employer;
    let candidate = this.props.candidate;

    let jobUser = JSON.parse(localStorage.getItem("jobUser"));
    let token = jobUser && jobUser.token;

    return (
      <>
        {token &&
        (this.props.candidate.isAuthInProgress ||
          this.props.employer.isAuthInProgress) ? (
          <Loader />
        ) : candidate.currentCandidate || employer.currentEmployer ? (
          <PrivateRoutes
            currentCandidate={candidate.currentCandidate}
            handleLogout={this.handleLogout}
            currentEmployer={employer.currentEmployer}
          />
        ) : (
          <PublicRoutes />
        )}
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}

export default connect(mapToProps)(App);
