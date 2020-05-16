import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import warning from "warning";

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

  updateHasRead = () => {
    var notifications = this.props.employer.currentEmployer.notifications.map(
      n => n._id
    );
    Axios.put(
      "/api/v1/employers/notifications",
      { notifications },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "notifications read");
      })
      .catch(err => console.log(err, "notifications read failed"));
  };

  render() {
    console.log(this.props, "from employer notifications");
    return (
      <>
        <h1>Notifications</h1>
        {this.state.notification ? (
          <>
            <Alert severity="success" color="warning">
              {this.state.notification}
            </Alert>
            <br />
          </>
        ) : (
          " "
        )}
        {this.props.employer.currentEmployer.notifications.map(n =>
          n.hasRead == true ? (
            <>
              <Alert severity="success" color="info">
                {n.notification}
              </Alert>
              <br />
            </>
          ) : (
            <>
              <Alert severity="success" color="warning">
                {n.notification}
              </Alert>
              <br />
            </>
          )
        )}
        {this.updateHasRead()}
      </>
    );
  }
}

function mapToProps({ employer }) {
  return { employer };
}

export default connect(mapToProps)(withRouter(Notifications));
