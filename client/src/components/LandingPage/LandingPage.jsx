import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./landingpage.scss";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = { active: true };
  }
  render() {
    return (
      <div className="landing_page">
        <h1>Welcome {this.props.user && this.props.user.firstname}</h1>
      </div>
    );
  }
}

export default withRouter(LandingPage);
