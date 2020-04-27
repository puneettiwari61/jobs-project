import React, { Component } from "react";
import "./Portfolio.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class CandidatesEducation extends Component {
  constructor() {
    super();
    this.state = {
      school: "",
      degree: "",
      grade: "",
      description: "",
      certification: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    console.log(this.state);
    Axios.post(
      "/api/v1/candidates/education",
      { ...this.state },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "education successful");
        this.props.history.push("/candidates/experience");
      })
      .catch(err => console.log(err, "education failed"));
  };

  render() {
    return (
      <>
        <div className="login-box education">
          <form>
            <h2>Education</h2>
            <div className="user-box">
              <input
                type="text"
                name="school"
                required=""
                onChange={this.handleChange}
                value={this.state.school}
              />
              <label>School</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="degree"
                required=""
                onChange={this.handleChange}
                value={this.state.degree}
              />
              <label>Degree</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="grade"
                required=""
                onChange={this.handleChange}
                value={this.state.grade}
              />
              <label>Grade</label>
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
                type="text"
                name="certification"
                required=""
                placeholder="e.g. AWS,JAVA"
                onChange={this.handleChange}
                value={this.state.certification}
              />
              <label>Certification</label>
            </div>
            <a onClick={this.handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add
            </a>
            <br />
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

export default withRouter(CandidatesEducation);
