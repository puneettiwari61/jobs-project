import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./chatApp.scss";
import { connect } from "react-redux";

class ChatApp extends Component {
  constructor() {
    super();
    this.state = { active: true };
  }
  render() {
    let employer = this.props.employer;
    let candidate = this.props.candidate;
    return (
      <>
    <div class="main-container">
      <div class="head-container" style={{cursor:'pointer'}} onClick={()=>this.setState({active:!this.state.active})}>
        <h1>• Mark Zuckerberg</h1>
      </div>
    <div className={this.state.active?"block":"none"}>
    <div class="message-container">
        <h3><span class="date">Today</span></h3>
        <div class="sent">
          <h5 class="hour">10:53</h5>
          <p class="sent-bubble">
            Hi, Mark! I made a new design for Messenger App.
          </p>
        </div>
        <div class="received">
          <h5 class="hour">10:57</h5>
          <p class="received-bubble">
            Yo! Send it to my assistant and we'll review it during the year.
          </p>
        </div>
        <div class="sent">
          <h5 class="hour">11:03</h5>
          <p class="sent-bubble">But Mark...</p>
        </div>
        <div class="blocked">
          <h5 class="hour">11:05</h5>
          <p class="blocked-bubble">You were blocked by the user</p>
        </div>
      </div>

      <div class="input-container">
        <input type="text" placeholder="Enter your message" />
        <a href="#" class="btn">Send</a>
      </div>
    </div>
    </div>
      
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}
export default connect(mapToProps)(withRouter(ChatApp));
