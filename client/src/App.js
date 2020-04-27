import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Header from "./components/Common/Header";
import CandidatesSignUp from "./components/CandidatesSignUp/CandidatesSignUp";
import CandidatesLogin from "./components/CandidatesLogin/CandidatesLogin";
import EmployersLogin from "./components/EmployersLogin/EmployersLogin";
import EmployersSignUp from "./components/EmployersSignup/EmployersSignUp";
import CandidatesPortfolio from "./components/CandidatesOnboarding/CandidatesPortfolio";
import CandidatesEducation from "./components/CandidatesOnboarding/CandidatesEducation";
import CandidatesExperience from "./components/CandidatesOnboarding/CandidatesExperience";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchOnMount,
  logoutCandidateFunc,
  loginCandidateFunc,
  loginEmployerFunc,
  logoutEmployerFunc
} from "./store/actions";
import "./App.css";

function PublicRoutes(props) {
  return (
    <>
      <Header logoutFunction={props.logoutFunction} />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/candidates/signup">
          <CandidatesSignUp loginFunction={props.loginFunction} />
        </Route>
        <Route path="/employers/signup">
          <EmployersSignUp loginFunction={props.loginFunction} />
        </Route>
        <Route path="/candidates/login">
          <CandidatesLogin loginFunction={props.loginFunction} />
        </Route>
        <Route path="/employers/login">
          <EmployersLogin loginFunction={props.loginFunction} />
        </Route>
        />
        <Route path="*">
          <h1>Page Not found</h1>
        </Route>
      </Switch>
    </>
  );
}

function PrivateRoutes(props) {
  return (
    <>
      <Header
        candidateData={props.candidateData}
        logoutFunction={props.logoutFunction}
        employerData={props.employerData}
      />
      <Switch>
        <Route path="/" exact>
          <LandingPage
            candidateData={props.candidateData}
            employerData={props.employerData}
          />
        </Route>
        <Route path="/candidates/profile">
          <CandidatesPortfolio />
        </Route>
        <Route path="/candidates/education">
          <CandidatesEducation />
        </Route>
        <Route path="/candidates/experience">
          <CandidatesExperience />
        </Route>
        <Route path="*">
          <h1>Page Not found</h1>
        </Route>
      </Switch>
    </>
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchOnMount());
  }

  logoutFunction = () => {
    if (this.props.candidateData) {
      this.props.dispatch(
        logoutCandidateFunc({ candidateData: null, isCandidateLogged: false })
      );
    } else if (this.props.employerData) {
      this.props.dispatch(
        logoutEmployerFunc({ employerData: null, isEmployerLogged: false })
      );
    }
  };

  loginFunction = () => {
    if (this.props.candidateData) {
      this.props.dispatch(loginCandidateFunc({ isCandidateLogged: true }));
    } else if (this.props.employerData) {
      this.props.dispatch(loginEmployerFunc({ isEmployerLogged: true }));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isCandidateLogged !== this.props.isCandidateLogged ||
      prevProps.isEmployerLogged !== this.props.isEmployerLogged
    ) {
      this.props.dispatch(fetchOnMount());
    }
  }

  render() {
    console.log(this.props, "from app.js Props");
    return (
      <>
        {this.props.candidateData || this.props.employerData ? (
          <PrivateRoutes
            candidateData={this.props.candidateData}
            logoutFunction={this.logoutFunction}
            employerData={this.props.employerData}
          />
        ) : (
          <PublicRoutes
            loginFunction={this.loginFunction}
            logoutFunction={this.logoutFunction}
          />
        )}
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  console.log(employer, "from mp");
  if (employer.isEmployerLogged) {
    let { employerData, isEmployerLogged } = employer;
    return { employerData, isEmployerLogged };
  } else {
    let { candidateData, isCandidateLogged } = candidate;
    return { candidateData, isCandidateLogged };
  }
}

export default connect(mapToProps)(App);
