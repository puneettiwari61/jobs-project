import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Header from "./components/Common/Header";
import CandidatesSignUp from "./components/CandidatesSignUp/CandidatesSignUp";
import CandidatesLogin from "./components/LogIn/CandidatesLogin";
import EmployersSignUp from "./components/SignUpEmp/EmployersSignUp";
import EmployersLogin from "./components/LogInEmp/EmployersLogin";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Axios from "axios";

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
  constructor() {
    super();
    this.state = {
      userLogged: false,
      user: null
    };
  }

  componentDidMount() {
    if (localStorage.jobUser) {
      let userType = JSON.parse(localStorage.jobUser).type;
      Axios.get(`/api/v1/${userType}s/me`, {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      })
        .then(res => {
          console.log(res.data[userType], "user identified");
          this.setState({ user: res.data[userType], userLogged: true });
          console.log(this.state);
        })
        .catch(err => console.log(err, "invalid user"));
    }
  }

  logoutFunction = () => {
    this.setState({ user: null, userLogged: false });
  };

  loginFunction = () => {
    this.setState({ userLogged: true });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userLogged !== this.state.userLogged) {
      if (localStorage.jobUser) {
        let userType = JSON.parse(localStorage.jobUser).type;
        Axios.get(`/api/v1/${userType}s/me`, {
          headers: { authorization: JSON.parse(localStorage.jobUser).token }
        })
          .then(res => {
            console.log(res.data[userType], "user identified in cdu");
            this.setState({ user: res.data[userType], userLogged: true });
            console.log(this.state);
          })
          .catch(err => console.log(err, "invalid user"));
      }
    }
  }

  render() {
    return (
      <>
        <Header
          user={this.state.user && this.state.user}
          logoutFunction={this.logoutFunction}
        />
        {this.state.user ? (
          <PrivateRoutes user={this.state.user} />
        ) : (
          <PublicRoutes loginFunction={this.loginFunction} />
        )}
      </>
    );
  }
}

export default App;
