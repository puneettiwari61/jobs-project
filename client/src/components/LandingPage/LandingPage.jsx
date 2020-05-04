import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./landingpage.scss";
import { connect } from "react-redux";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = { active: true };
  }
  render() {
    let employer = this.props.employer;
    let candidate = this.props.candidate;
    return (
      <div className="landing_page">
        <h1>
          Welcome
          {candidate.currentCandidate
            ? candidate.currentCandidate.firstName
            : employer.currentEmployer
            ? employer.currentEmployer.firstName
            : ""}
        </h1>
        <div style={{ textAlign: "center" }}>
          <img src="/job.png" alt="" />
        </div>
      </div>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}
export default connect(mapToProps)(withRouter(LandingPage));
