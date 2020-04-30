import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";

import "./Portfolio.scss";
import { updateLoggedCandidate } from "../../store/actions";

class CandidatesPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      spokenLanguages: "",
      resume: "",
      github: ""
    };
  }

  componentDidMount() {
    let {
      image,
      spokenLanguages,
      resume,
      github
    } = this.props.candidate.currentCandidate;
    spokenLanguages = spokenLanguages.join();
    this.setState({ image, spokenLanguages, resume, github });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    Axios.post(
      "/api/v1/candidates/profile",
      { ...this.state },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "portfolio successful");
        this.props.dispatch(
          updateLoggedCandidate({ currentCandidate: res.data.candidate })
        );
        this.props.history.push("/candidates/education");
      })
      .catch(err => console.log(err, "portfolio failed"));
  };

  render() {
    return (
      <>
        <div className="login-box profile">
          <form>
            <h2>Your Profile</h2>
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
                value={this.state.spokenLanguages}
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

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(withRouter(CandidatesPortfolio));
