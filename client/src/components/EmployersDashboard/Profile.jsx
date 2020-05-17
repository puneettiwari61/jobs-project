import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <>
        <h1>Its a profile</h1>
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}

export default connect(mapToProps)(withRouter(Profile));
