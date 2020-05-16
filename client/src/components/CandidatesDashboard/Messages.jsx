import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { TextField, Button } from "@material-ui/core";

class Messages extends Component {
  constructor() {
    super();
    this.state = { messages: null, text: "" };
  }

  componentDidMount() {
    Axios.get(
      "/api/v1/candidates/chats/5ebfcafb69108871bd5d1b64/messages/5ebf8420e14e5a332b457f64"
    )
      .then(res => {
        console.log(res, "from client candidate messages");
        this.setState({ messages: res.data.conversation.messages });
      })
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.text) {
      Axios.post(
        "/api/v1/candidates/chats/5ebfcafb69108871bd5d1b64/messages/5ebf8420e14e5a332b457f64",
        { message: this.state.text }
      )
        .then(res => {
          console.log(res, "message created success");
          this.setState({ messages: res.data.conversation.messages, text: "" });
        })
        .catch(err => console.log(err, "message created failed"));
    }
  };

  render() {
    return (
      <>
        {this.state.messages
          ? this.state.messages.map(m => {
              return m.senderType === "employer" ? (
                <div>
                  <span>
                    Sender - {m.employerId.firstName + m.employerId.lastName}
                  </span>
                  <span>{" " + m.message}</span>
                </div>
              ) : (
                <div>
                  <span>Receiver - YOU </span>
                  <span>{m.message}</span>
                </div>
              );
            })
          : ""}
        <form onSubmit={this.handleSubmit}>
          <TextField
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
            value={this.state.text}
          />
          <Button type="submit">Send</Button>
        </form>
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}
export default connect(mapToProps)(withRouter(Messages));
