import React, { Component } from "react";
import "./Portfolio.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateLoggedCandidate } from "../../store/actions";

class CandidatesEducation extends Component {
  constructor() {
    super();
    this.state = {
      schoolOrCollege: "",
      classOrDegree: "",
      grade: "",
      branch: "",
      from: "",
      to: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = e => {
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
        this.props.dispatch(
          updateLoggedCandidate({ currentCandidate: res.data.candidate })
        );
        this.setState({
          schoolOrCollege: "",
          classOrDegree: "",
          grade: "",
          branch: "",
          from: "",
          to: ""
        });
      })
      .catch(err => console.log(err, "education failed"));
  };

  handleSubmit = () => {
    this.props.history.push("/candidates/experience");
  };

  handleBack = () => {
    this.props.history.goBack();
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
                name="schoolOrCollege"
                required=""
                onChange={this.handleChange}
                value={this.state.schoolOrCollege}
                placeholder="School or College Name"
              />
              <label>School/College</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="classOrDegree"
                required=""
                onChange={this.handleChange}
                value={this.state.classOrDegree}
                placeholder="School or College Name"
              />
              <label>Class/Degree</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="grade"
                required=""
                placeholder="percentage, CGPA, or grade"
                onChange={this.handleChange}
                value={this.state.grade}
              />
              <label>Grade</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                required=""
                name="branch"
                onChange={this.handleChange}
                value={this.state.branch}
              />
              <label>Branch</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="from"
                required=""
                placeholder="year of starting"
                onChange={this.handleChange}
                value={this.state.from}
              />
              <label>From</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="to"
                required=""
                placeholder="year of passing"
                onChange={this.handleChange}
                value={this.state.to}
              />
              <label>To</label>
            </div>
            <a onClick={this.handleAdd}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add
            </a>
            <br />
            <a onClick={this.handleBack}>
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

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(withRouter(CandidatesEducation));
