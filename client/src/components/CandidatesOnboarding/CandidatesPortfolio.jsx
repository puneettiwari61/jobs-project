import React, { Component } from "react";
import "./Portfolio.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class CandidatesPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      skills: "",
      image: "",
      language: "",
      resume: "",
      github: ""
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
        <div className="login-box profile">
          <form>
            <h2>Your Profile</h2>
            <div className="user-box">
              <input
                type="email"
                name="skills"
                required=""
                placeholder="e.g. JS,PHP"
                onChange={this.handleChange}
                value={this.state.skills}
              />
              <label>Skills</label>
            </div>
            <div className="user-box">
              <input
                type="url"
                name="image"
                required=""
                placeholder="url"
                onChange={this.handleChange}
                value={this.state.image}
              />
              <label>Image</label>
            </div>
            <div className="user-box">
              <input
                type="url"
                name="github"
                required=""
                placeholder="url"
                onChange={this.handleChange}
                value={this.state.github}
              />
              <label>Github</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="spokenLanguages"
                required=""
                placeholder="e.g. English,Hindi"
                onChange={this.handleChange}
                value={this.state.language}
              />
              <label>Language</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="resume"
                required=""
                placeholder="url"
                onChange={this.handleChange}
                value={this.state.resume}
              />
              <label>Resume</label>
            </div>
            
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

export default withRouter(CandidatesPortfolio);
