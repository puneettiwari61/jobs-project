import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

import "./signup.scss";

class EmployersSignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
      profileImage: "",
      dob: "",
      gender: ""
    };
  }
  // TODO: Handle validation?
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    console.log(this.state);
    Axios.post("/api/v1/employers/signup", { ...this.state })
      .then(res => {
        console.log(res, "signup successful");
        localStorage.setItem(
          "jobUser",
          JSON.stringify({ token: res.data.token, type: "employer" })
        );
        this.props.loginFunction();
        this.props.history("/");
      })
      .catch(err => console.log(err, "signup failed"));
  };

  render() {
    return (
      <>
        <div className="login-box sign_up">
          <form>
            <h2>SignUp Employer</h2>
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
            <div className="user-box">
              <input
                type="password"
                name="password"
                required=""
                onChange={this.handleChange}
                value={this.state.password}
              />
              <label>Password</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="firstName"
                required=""
                onChange={this.handleChange}
                value={this.state.firstName}
              />
              <label>First Name</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="lastName"
                required=""
                N
                onChange={this.handleChange}
                value={this.state.lastName}
              />
              N <label>Last Name</label>
            </div>
            <div className="user-box">
              <input
                type="tel"
                name="contactNumber"
                required=""
                onChange={this.handleChange}
                value={this.state.contactNumber}
              />
              <label>Contact</label>
            </div>
            <div className="user-box">
              <input
                type="date"
                name="dob"
                required=""
                onChange={this.handleChange}
                value={this.state.dob}
              />
              <label>DOB</label>
            </div>
            <div className="user-box">
              <input
                type="url"
                name="profileImage"
                required=""
                onChange={this.handleChange}
                value={this.state.profileImage}
              />
              <label>Profile Image URL</label>
            </div>

            <div className="form-radio">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={this.handleChange}
                  />
                  <i className="helper"></i>Male
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={this.handleChange}
                  />
                  <i className="helper"></i>Female
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="others"
                    onChange={this.handleChange}
                  />
                  <i className="helper"></i>Others
                </label>
              </div>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" />
                <i className="helper"></i> I agree to Terms & Conditions
              </label>
            </div>
            <a onClick={this.handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(EmployersSignUp);
