import React, { Component } from "react";
import "./Portfolio.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class CandidatesExperience extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      company: "",
      location: "",
      description: "",
      joiningDate: "",
      leavingDate: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    console.log(this.state);
    Axios.post("/api/v1/candidates/signup", { ...this.state })
      .then(res => {
        console.log(res, "signup successful");
        localStorage.setItem(
          "jobUser",
          JSON.stringify({ token: res.data.token, type: "candidate" })
        );
        this.props.loginFunction();
        this.props.history.push("/");
      })
      .catch(err => console.log(err, "signup failed"));
  };

  render() {
    return (
      <>
        <div className="login-box experience">
          <form>
            <h2>Experience</h2>
            <div className="user-box">
              <input
                type="text"
                name="title"
                required=""
                onChange={this.handleChange}
                value={this.state.title}
              />
              <label>Title</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="company"
                required=""
                onChange={this.handleChange}
                value={this.state.company}
              />
              <label>Company</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="location"
                required=""
                onChange={this.handleChange}
                value={this.state.location}
              />
              <label>Location</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="description"
                required=""
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label>Description</label>
            </div>
            
            <div className="user-box">
              <input
                type="date"
                name="joiningDate"
                required=""
                onChange={this.handleChange}
                value={this.state.joiningDate}
              />
              <label>Join Date</label>
            </div>
            <div className="user-box">
              <input
                type="date"
                name="leavingDate"
                required=""
                onChange={this.handleChange}
                value={this.state.leavingDate}
              />
              <label>Leave Date</label>
            </div>
            <a onClick={this.handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add
            </a><br/>
            <a onClick={this.handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Back
            </a>
            <a onClick={this.handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Next
            </a>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(CandidatesExperience);
