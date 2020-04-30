import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Skills from "./skillsData.json";
import "./Portfolio.scss";

class CandidatesSkills extends Component {
  constructor() {
    super();
    this.state = {
      skills: null
    };
  }

  handleSubmit = e => {
    let skillsArray = this.state.skills.map(a => a.value);
    console.log(skillsArray);
    Axios.post(
      "/api/v1/candidates/skills",
      { skills: skillsArray },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res.data, "skills successful");
      })
      .catch(err => console.log(err, "skills failed"));
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="login-box profile">
          <form>
            <h2>Skills</h2>

            <Select
              isMulti
              name="skills"
              options={Skills.skills.map(a => {
                return {
                  value: `${a}`,
                  label: `${a}`
                  // color: "#00B8D9",
                  // isFixed: true
                };
              })}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={e => this.setState({ skills: e })}
            />

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

export default connect(mapToProps)(withRouter(CandidatesSkills));
