import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const socket = io();

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      notification: ""
    };
  }
  componentDidMount() {
    //socket
    socket.connect();
    socket.on("message", msg => {
      console.log(msg);
      if (this.props.employer.currentEmployer._id === msg.employerId) {
        this.setState({ notification: msg.message });
      }
    });
  }

  render() {
    console.log(this.props, "from employer notifications");
    return (
      <>
        <h1>Notifications</h1>
        <p>{this.state.notification}</p>
      </>
    );
  }
}

function mapToProps({ employer }) {
  return { employer };
}

export default connect(mapToProps)(withRouter(Notifications));
