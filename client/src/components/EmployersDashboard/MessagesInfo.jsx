import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import io from "socket.io-client";
import { css } from "glamor";
import { Button, Grid } from "@material-ui/core";

let socket = io();
const ROOT_CSS = css({
  // height: 600,
  width: 288
});

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      conversations: []
    };
  }

  componentDidMount() {
    Axios.get("/api/v1/employers/chats/conversations", {
      headers: { authorization: JSON.parse(localStorage.jobUser).token }
    })
      .then(res => {
        console.log(res, "got conversations");
        this.setState({ conversations: res.data.conversation });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state, "from dddddddddd");
    return (
      <>
        <h3>Recent Conversations</h3>
        {this.state.conversations.map(c => {
          return (
            <Grid sm={6}>
              <Button
                href={`/employers/dashboard/messages/${c.candidateId._id}`}
                color="secondary"
              >
                {c.candidateId.firstName + " " + c.candidateId.lastName}
              </Button>
            </Grid>
          );
        })}
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}
export default connect(mapToProps)(withRouter(Messages));
