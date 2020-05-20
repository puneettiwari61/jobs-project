import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './landingpage.scss';
import { connect } from 'react-redux';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import SchoolIcon from '@material-ui/icons/School';

class LandingPage extends Component {
	constructor() {
		super();
		this.state = { active: true };
	}
	render() {
		let employer = this.props.employer;
		let candidate = this.props.candidate;
		return (
			<div className="landing_page">
				<h1>
					Welcome
					{candidate.currentCandidate
						? candidate.currentCandidate.firstName
						: employer.currentEmployer
						? employer.currentEmployer.firstName
						: ''}
				</h1>
				<div class="page">
					<header>
						<main className="header">
							{/* <div class="logo">
								<img src="https://i.ibb.co/8Kc0TQC/rec.png" alt="logo" />
								Remote
							</div> */}
							<ul>
								<li>Jobs</li>
								<li>Services</li>
								<li>Contact</li>
							</ul>
						</main>

						<main className="main">
							<div class="left_side">
								<h1>Are you a skilled individual looking to kick start your career?<br/>OR<br/>Are you an employer looking to hire the best?</h1>
								<h4>
									Do you need the coolest and the most awesome platform to manage your project?! You
									have walked to the right place!
								</h4>
								{/* <button class="main_btn">Get Started</button>
								<button class="outline_btn">Learn More</button>
								<div class="social">
									<button class="outline_btn">
										<TwitterIcon />
									</button>
									<button class="outline_btn">
										<InstagramIcon />
									</button>
									<button class="main_btn">
										<LinkedInIcon />
									</button>
								</div> */}
							</div>
							<div class="right_side">
								<div></div>
							</div>
						</main>
						{/* <p class="show_more">
							See how we help great companies with their works <i class="fa fa-play-circle-o"></i>
						</p> */}

						<section className="section">
							<div class="item">
								<button class="main_btn"
								onClick={()=>this.props.history.push("/employers/login")}>
									<WorkOutlineIcon />
								</button>
								<h5>Employer Login</h5>
							
							</div>
							<div class="item">
								<button class="main_btn second"
								onClick={()=>this.props.history.push("/candidates/login")}>
									<SchoolIcon />
								</button>
								<h5>Candidate Login</h5>
							</div>
							<div class="text_content">
								<h2>About us!</h2>
								<p>
									Steves Jobs is a great bridge that helps in connecting highly skilled candidates and great employers.
								</p>
								<button class="outline_btn">Learn More</button>
								<button class="outline_btn">
									<i class="fa fa-play"></i>
								</button>
							</div>
						</section>
					</header>
					<div class="hero-box-container">
						<a href="" class="hero-box">
							<span class="hero-box__circle hero-box__circle--blue"></span>
							<h2 class="hero-box__title">Sell your device</h2>
							<p class="hero-box__body">
								Get instant quote
								<br /> and ship device for free
							</p>
						</a>
						<a href="" class="hero-box">
							<span class="hero-box__circle hero-box__circle--green"></span>
							<h2 class="hero-box__title">Repair</h2>
							<p class="hero-box__body">
								Give a second chance
								<br /> to your device
							</p>
						</a>
						<a href="" class="hero-box">
							<span class="hero-box__circle hero-box__circle--orange"></span>
							<h2 class="hero-box__title">Exchange</h2>
							<p class="hero-box__body">
								Refurbished and lightly used
								<br /> device marketplace
							</p>
						</a>
					</div>
					<footer>
						<div class="footer__container">© Made in the ⛰️ by AltCampus students.</div>
					</footer>
				</div>
				<div id="splash">
					<div class="anim">
						<div id="loader">
							<svg version="1.1" width="60px" height="70px" viewBox="0 0 60 70">
								<defs>
									<filter id="f1" x="0" y="0">
										<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
									</filter>
								</defs>
								<g id="airplane">
									<path
										fill="#000"
										d="M0.677,20.977l4.355,1.631c0.281,0.104,0.579,0.162,0.88,0.16l9.76-0.004L30.46,41.58c0.27,0.34,0.679,0.545,1.112,0.541
          h1.87c0.992,0,1.676-0.992,1.322-1.918l-6.643-17.439l6.914,0.002l6.038,6.037c0.265,0.266,0.624,0.412,0.999,0.418l1.013-0.004
          c1.004-0.002,1.684-1.012,1.312-1.938l-2.911-7.277l2.912-7.278c0.372-0.928-0.313-1.941-1.313-1.938h1.017
          c-0.375,0-0.732,0.15-0.996,0.414l-6.039,6.039h-6.915l6.646-17.443c0.354-0.926-0.33-1.916-1.321-1.914l-1.87-0.004
          c-0.439,0.004-0.843,0.203-1.112,0.543L15.677,17.24l-9.765-0.002c-0.3,0.002-0.597,0.055-0.879,0.16L0.678,19.03
          C-0.225,19.36-0.228,20.637,0.677,20.977z"
										transform="translate(44,0) rotate(90 0 0)"
									/>
								</g>
								<g id="shadow" transform="scale(.9)">
									<path
										fill="#000"
										fill-opacity="0.3"
										d="M0.677,20.977l4.355,1.631c0.281,0.104,0.579,0.162,0.88,0.16l9.76-0.004L30.46,41.58c0.27,0.34,0.679,0.545,1.112,0.541
            h1.87c0.992,0,1.676-0.992,1.322-1.918l-6.643-17.439l6.914,0.002l6.038,6.037c0.265,0.266,0.624,0.412,0.999,0.418l1.013-0.004
            c1.004-0.002,1.684-1.012,1.312-1.938l-2.911-7.277l2.912-7.278c0.372-0.928-0.313-1.941-1.313-1.938h1.017
            c-0.375,0-0.732,0.15-0.996,0.414l-6.039,6.039h-6.915l6.646-17.443c0.354-0.926-0.33-1.916-1.321-1.914l-1.87-0.004
            c-0.439,0.004-0.843,0.203-1.112,0.543L15.677,17.24l-9.765-0.002c-0.3,0.002-0.597,0.055-0.879,0.16L0.678,19.03
            C-0.225,19.36-0.228,20.637,0.677,20.977z"
										transform="translate(64,30) rotate(90 0 0)"
										filter="url(#f1)"
									/>
								</g>
							</svg>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapToProps({ candidate, employer }) {
	return { candidate, employer };
}
export default connect(mapToProps)(withRouter(LandingPage));
