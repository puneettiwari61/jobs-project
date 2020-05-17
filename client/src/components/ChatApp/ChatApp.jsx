import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './chatApp.scss';
import { connect } from 'react-redux';
import io from 'socket.io-client';

let socket = io();

class ChatApp extends Component {
	constructor() {
		super();
		this.state = { active: true, activeChat: true, messages: null, text: '' };
	}
	componentDidMount() {
		socket.connect();
		socket.emit('join', {
			id: this.props.candidate.currentCandidate._id,
		});

		socket.on('chat', (msg) => {
			console.log(msg, 'from socket cdm');
			this.setState({ messages: msg.conversation.messages });
		});
		Axios.get(
			`/api/v1/candidates/chats/${this.props.candidate.currentCandidate._id}/messages/${this.props.match.params.receiverId}`
		)
			.then((res) => {
				console.log(res, 'from client candidate messages');
				this.setState({ messages: res.data.conversation.messages });
			})
			.catch((err) => console.log(err));
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (this.state.text) {
			Axios.post(
				`/api/v1/candidates/chats/${this.props.candidate.currentCandidate._id}/messages/${this.props.match.params.receiverId}`,
				{ message: this.state.text }
			)
				.then((res) => {
					console.log(res, 'message created success');
					this.setState({ messages: res.data.conversation.messages, text: '' });
				})
				.catch((err) => console.log(err, 'message created failed'));
		}
	};

	render() {
		return (
			<div class="chat_group">
				<div class="main-container">
					<div
						class="head-container"
						style={{ cursor: 'pointer' }}
						onClick={() => this.setState({ active: !this.state.active })}
					>
						<h1>Messages</h1>
					</div>
					{this.state.activeChat ? (
						<div className={this.state.active ? 'chat_box' : 'none'}>
							<h5>Recent</h5>
							<div onClick={() => this.setState({ activeChat: !this.state.activeChat })}>
								<img src="data:image/jpeg;base64,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" />
								<p>
									<b></b>Piyush
								</p>
								<span></span>
							</div>
							<div>
								<img src="data:image/jpeg;base64,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" />
								<p>Piyush</p>
								<span></span>
							</div>
						</div>
					) : (
						<div className={this.state.active ? 'block' : 'none'}>
							<span onClick={() => this.setState({ activeChat: !this.state.activeChat })}>back</span>
							<div class="message-container">
								<h3>
									<span class="date">Today</span>
								</h3>
								{console.log(this.state.messages)}
								<div class="sent">
									<h5 class="hour">10:53</h5>
									<p class="sent-bubble">Hi, Mark! I made a new design for Messenger App.</p>
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
								<a href="#" class="btn">
									Send
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

function mapToProps({ candidate, employer }) {
	return { candidate, employer };
}
export default connect(mapToProps)(withRouter(ChatApp));
