import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Header from "./components/Common/Header";
import CandidatesSignUp from "./components/CandidatesSignUp/CandidatesSignUp";
import CandidatesLogin from "./components/LogIn/CandidatesLogin";
import EmployersSignUp from "./components/SignUpEmp/EmployersSignUp";
import EmployersLogin from "./components/LogInEmp/EmployersLogin";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchLoggedUser,
  logoutUserFunc,
  loginUserFunc,
  fetchOnMount
} from "./store/actions";
import "./App.css";

function PublicRoutes(props) {
  return (
    <>
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
      <Switch>
        <Route path="/" exact>
          <LandingPage user={props.user} />
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
    this.props.dispatch(logoutUserFunc({ user: null, userLogged: false }));
  };

  loginFunction = () => {
    this.props.dispatch(loginUserFunc({ userLogged: true }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userLogged !== this.props.userLogged) {
      this.props.dispatch(fetchOnMount());
    }
  }

  render() {
    console.log(this.props, "hey");
    return (
      <>
        <Header
          user={this.props.user && this.props.user}
          logoutFunction={this.logoutFunction}
        />
        {this.props.user ? (
          <PrivateRoutes user={this.props.user} />
        ) : (
          <PublicRoutes loginFunction={this.loginFunction} />
        )}
      </>
    );
  }
}

function mapToProps({ userInfo }) {
  let { user, userLogged } = userInfo;
  return { user, userLogged };
}

export default connect(mapToProps)(App);
