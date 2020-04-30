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
      companyName: "",
      designation: "",
      location: "",
      description: "",
      joiningDate: "",
      leavingDate: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = e => {
    console.log(this.state);
    Axios.post(
      "/api/v1/candidates/experience",
      { ...this.state },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "experience successful");
        this.setState({
          companyName: "",
          designation: "",
          location: "",
          description: "",
          joiningDate: "",
          leavingDate: ""
        });
        this.props.dispatch(
          updateLoggedCandidate({ currentCandidate: res.data.candidate })
        );
      })
      .catch(err => console.log(err, "experience failed"));
  };

  handleSubmit = () => {
    this.props.history.push("/candidates/skills");
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <div className="login-box education">
          <form>
            <h2>Experience(If any)</h2>
            <div className="user-box">
              <input
                type="text"
                name="companyName"
                required=""
                onChange={this.handleChange}
                value={this.state.companyName}
                placeholder="e.g. TCS"
              />
              <label>Company</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="designation"
                required=""
                onChange={this.handleChange}
                value={this.state.designation}
                placeholder="e.g. junior developer"
              />
              <label>Designation</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="location"
                required=""
                placeholder="e.g. Delhi"
                onChange={this.handleChange}
                value={this.state.location}
              />
              <label>Location</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                required=""
                name="description"
                placeholder="your role and work..."
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label>Desciption</label>
            </div>
            <div className="user-box">
              <input
                type="date"
                name="joiningDate"
                required=""
                placeholder="joining date..."
                onChange={this.handleChange}
                value={this.state.joiningDate}
              />
              <label>Joining Date</label>
            </div>
            <div className="user-box">
              <input
                type="date"
                name="leavingDate"
                required=""
                placeholder="year of passing"
                placeholder="leaving date..."
                onChange={this.handleChange}
                value={this.state.leavingDate}
              />
              <label>Leaving Date</label>
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
  let { candidateData, isCandidateLogged } = candidate;
  return { candidateData, isCandidateLogged };
}

export default connect(mapToProps)(withRouter(CandidatesEducation));
