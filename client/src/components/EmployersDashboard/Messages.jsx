import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import io from "socket.io-client";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatApp from "../ChatApp/ChatApp";
import { Button, Paper, Grid } from "@material-ui/core";

let socket = io();
const ROOT_CSS = css({
  // height: 600,
  width: 288
});

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      active: true,
      activeChat: true,
      messages: null,
      text: "",
      conversations: [],
      receiverId: "",
      name: ""
    };
  }

  componentDidMount() {
    if (this.props.match.params.receiverId) {
      this.setState({ activeChat: false });
    }
    // socket.connect();

    // socket.on("connection", function() {
    socket.emit("join", { id: this.props.employer.currentEmployer._id });
    // });
    socket.on("chat", msg => {
      console.log(msg, "from socket cdm");
      this.setState({ messages: msg.conversation.messages });
    });

    // socket.on("offline", msg => {
    //   console.log(msg);
    // });

    Axios.get(
      `/api/v1/employers/chats/${this.props.employer.currentEmployer._id}/messages/${this.props.match.params.receiverId}`
    )
      .then(res => {
        console.log(res, "from client messages");
        this.setState({
          messages: res.data.conversation && res.data.conversation.messages,
          name:
            res.data.conversation.messages[0].candidateId.firstName +
            " " +
            res.data.conversation.messages[0].candidateId.lastName
        });
      })
      .catch(err => console.log(err));

    Axios.get("/api/v1/employers/chats/conversations", {
      headers: { authorization: JSON.parse(localStorage.jobUser).token }
    })
      .then(res => {
        console.log(res, "got conversations");
        this.setState({ conversations: res.data.conversation });
      })
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.receiverId, "receiver id employer side");
    var receiverId =
      this.state.receiverId || this.props.match.params.receiverId;
    if (this.state.text) {
      Axios.post(
        `/api/v1/employers/chats/${this.props.employer.currentEmployer._id}/messages/${receiverId}`,
        { message: this.state.text }
      )
        .then(res => {
          console.log(res, "message created success");
          this.setState({
            messages: res.data.conversation.messages,
            text: "",
            name:
              res.data.conversation.messages[0].candidateId.firstName +
              " " +
              res.data.conversation.messages[0].candidateId.lastName
          });
          // socket.emit("received", this.state.text);
        })
        .catch(err => console.log(err, "message created failed"));
    }
  };

  handleConversation = (id, f, l) => {
    this.setState({
      activeChat: !this.state.activeChat,
      receiverId: id,
      name: f + " " + l
    });

    Axios.get(
      `/api/v1/employers/chats/${this.props.employer.currentEmployer._id}/messages/${id}`
    )
      .then(res => {
        console.log(res, "from client employer messages");
        this.setState({ messages: res.data.conversation.messages });
      })
      .catch(err => console.log(err));
  };

  render() {
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
        <div class="chat_group">
          <div class="main-container">
            <div
              class="head-container"
              style={{ cursor: "pointer" }}
              onClick={() => this.setState({ active: !this.state.active })}
            >
              <h1>{this.state.name ? this.state.name : "Messages"}</h1>
            </div>
            {this.state.activeChat ? (
              <div className={this.state.active ? "chat_box" : "none"}>
                <h5>Recent</h5>
                {this.state.conversations.map(c => {
                  return (
                    <div
                      onClick={() =>
                        this.handleConversation(
                          c.candidateId._id,
                          c.candidateId.firstName,
                          c.candidateId.lastName
                        )
                      }
                    >
                      <img src={c.candidateId.image} alt="" />
                      <p>
                        <b></b>
                        {c.candidateId.firstName + " " + c.candidateId.lastName}
                      </p>
                      <span></span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={this.state.active ? "block" : "none"}>
                <span
                  onClick={() =>
                    this.setState({
                      activeChat: !this.state.activeChat,
                      name: ""
                    })
                  }
                >
                  back
                </span>
                <ScrollToBottom
                  className={ROOT_CSS}
                  mode="bottom"
                  scrollViewClassName="message-container"
                >
                  {/* <div class="message-container"> */}
                  <h3>
                    <span class="date">Today</span>
                  </h3>
                  {this.state.messages ? (
                    this.state.messages.map(a => {
                      if (a.senderType == "employer") {
                        return (
                          <div class="received">
                            <h5 class="hour">10:53</h5>
                            <p class="received-bubble">{a.message}</p>
                          </div>
                        );
                      } else {
                        return (
                          <div class="sent">
                            <h5 class="hour">10:57</h5>
                            <p class="sent-bubble">{a.message}</p>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <></>
                  )}
                  {/* </div> */}
                </ScrollToBottom>
                <div class="input-container">
                  <form onSubmit={this.handleSubmit}>
                    <input
                      onChange={e => {
                        this.setState({ text: e.target.value });
                      }}
                      value={this.state.text}
                      type="text"
                      placeholder="Enter your message"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}
export default connect(mapToProps)(withRouter(Messages));
