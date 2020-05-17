import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { TextField, Button } from "@material-ui/core";
import io from "socket.io-client";

let socket = io();

class Messages extends Component {
  constructor() {
    super();
    this.state = { messages: null, text: "" };
  }

  componentDidMount() {
    socket.connect();

    // socket.on("connection", function() {
    socket.emit("join", { id: this.props.employer.currentEmployer._id });
    // });
    socket.on("chat", msg => {
      console.log(msg, "from socket cdm");
      this.setState({ messages: msg.conversation.messages });
    });
    Axios.get(
      `/api/v1/employers/chats/${this.props.employer.currentEmployer._id}/messages/${this.props.match.params.receiverId}`
    )
      .then(res => {
        console.log(res, "from client messages");
        this.setState({
          messages: res.data.conversation && res.data.conversation.messages
        });
      })
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.text) {
      Axios.post(
        `/api/v1/employers/chats/${this.props.employer.currentEmployer._id}/messages/${this.props.match.params.receiverId}`,
        { message: this.state.text }
      )
        .then(res => {
          console.log(res, "message created success");
          this.setState({ messages: res.data.conversation.messages, text: "" });
          // socket.emit("received", this.state.text);
        })
        .catch(err => console.log(err, "message created failed"));
    }
  };

  render() {
    return (
      <>
        {this.state.messages
          ? this.state.messages.map(m => {
              return m.senderType === "candidate" ? (
                <div>
                  <span>
                    Sender - {m.candidateId.firstName + m.candidateId.lastName}
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
