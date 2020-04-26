import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./login.scss";
import { loginEmployerFunc } from "../../store/actions";

class EmployersLogin extends Component {
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

  handleSubmit = e => {
    console.log(this.state);
    Axios.post("/api/v1/employers/login", { ...this.state })
      .then(res => {
        if (res.data.success === true) {
          console.log(res, "login successful");
          localStorage.setItem(
            "jobUser",
            JSON.stringify({ token: res.data.token, type: "employer" })
          );
          // this.props.loginFunction();
          this.props.dispatch(loginEmployerFunc({ isEmployerLogged: true }));
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err, "login failed"));
  };

  render() {
    return (
      <>
        <div className="login-box">
          <h2>Employer Login</h2>
          <form>
            <div className="user-box">
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
            <a onClick={() => this.props.history.push("/employers/signup")}>
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
export default connect(mapToProps)(withRouter(EmployersLogin));
