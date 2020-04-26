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
    console.log(this.props, "from landing oage");
    return (
      <div className="landing_page">
        <h1>
          Welcome
          {this.props.candidateData
            ? this.props.candidateData.firstName
            : this.props.employerData
            ? this.props.employerData.firstName
            : ""}
        </h1>
      </div>
    );
  }
}

function mapToProps({ candidate, employer }) {
  console.log(employer, "from mp");
  if (employer.isEmployerLogged) {
    let { employerData, isEmployerLogged } = employer;
    return { employerData, isEmployerLogged };
  } else {
    let { candidateData, isCandidateLogged } = candidate;
    return { candidateData, isCandidateLogged };
  }
}
export default connect(mapToProps)(withRouter(LandingPage));
