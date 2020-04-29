import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./login.scss";
import { loginCandidateFunc } from "../../store/actions";

class CandidatesLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // TODO: remove ajax calls from here and move to actions.
  handleSubmit = e => {
    console.log(this.state);
    Axios.post("/api/v1/candidates/login", { ...this.state })
      .then(res => {
        if (res.data.success === true) {
          console.log(res, "login successful");
          localStorage.setItem(
            "jobUser",
            JSON.stringify({ token: res.data.token, type: "candidate" })
          );
          // this.props.loginFunction();
          this.props.dispatch(
            loginCandidateFunc({
              isCandidateLogged: true,
              candidateData: res.data.candidate
            })
          );
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err, "login failed"));
  };

  render() {
    return (
      <>
        <div class="login-box">
          <h2>Login</h2>
          <form>
            <div class="user-box">
              <input
                type="email"
                name="email"
                required=""
                onChange={this.handleChange}
                value={this.state.email}
              />
              <label>Email</label>
            </div>
            <div class="user-box">
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <label for="">Password</label>
            </div>
            <a onClick={this.handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </a>
            <br />
            <a onClick={() => this.props.history.push("/candidates/signup")}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              New to Steve's Jobs?
            </a>
          </form>
        </div>
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  if (employer.isEmployerLogged) {
    let { employerData, isEmployerLogged } = employer;
    return { employerData, isEmployerLogged };
  } else {
    let { candidateData, isCandidateLogged } = candidate;
    return { candidateData, isCandidateLogged };
  }
}

export default connect(mapToProps)(withRouter(CandidatesLogin));
