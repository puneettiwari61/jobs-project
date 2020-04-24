import React, { Component } from 'react';
import './landingpage.scss';

class LandingPage extends Component {
	constructor() {
		super();
		this.state = { active: true };
	}
	render() {
		return (
			<div className="landing_page">
				<h1>Welcome to Steve's Jobs</h1>
			</div>
		);
	}
}

export default LandingPage;
