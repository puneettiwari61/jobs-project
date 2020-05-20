import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './landingpage.scss';
import { connect } from 'react-redux';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import SchoolIcon from '@material-ui/icons/School';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { geolocated } from 'react-geolocated';
import Axios from 'axios';

class LandingPage extends Component {
	constructor() {
		super();
		this.state = { active: true, address: null };
	}
	displayLocation = (latitude, longitude) => {
		Axios.get(
			`https://us1.locationiq.com/v1/reverse.php?key=8933ef90f0be62&lat=${latitude}&lon=${longitude}&tag=countries&radius=400000&format=json`
		)
			.then((res) => {
				this.setState({ address: res });
			})
			.catch((err) => console.log(err));
	};
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
							<div class="logo">
								<img
									src="https://i.ibb.co/8Kc0TQC/rec.png"
									alt="logo"
									onClick={() =>
										this.displayLocation(this.props.coords.latitude, this.props.coords.longitude)
									}
								/>
								{!this.props.isGeolocationAvailable
									? 'Your browser does not support Geolocation'
									: !this.props.isGeolocationEnabled
									? 'Geolocation is not enabled'
									: this.props.coords && this.state.address
									? `${this.state.address.request.response
											.split('county')[1]
											.split(',')[0]
											.substr(
												3,
												this.state.address.request.response.split('county')[1].split(',')[0]
													.length - 4
											)}`
									: 'Location'}
							</div>
							<ul>
								<a href="#">
									<li>Home</li>
								</a>
								<a href="#services">
									<li>Services</li>
								</a>
								<a href="#contact">
									<li>Contact</li>
								</a>
							</ul>
						</main>

						<main className="main">
							<div class="left_side">
								<h1>The best solution to find Jobs</h1>
								<h4>
									Are you a skilled individual looking to kick start your career?
									<br />
									OR
									<br />
									Are you an employer looking to hire the best?
								</h4>
								<a href="#services">
									<button class="main_btn">Get Started</button>
								</a>
								<button class="outline_btn">Learn More</button>
								<div class="social">
									<a href="https://twitter.com/AltCampus" target="_blank">
										<button class="outline_btn">
											<TwitterIcon />
										</button>
									</a>
									<a href="https://www.instagram.com/altcampus/" target="_blank">
										<button class="outline_btn">
											<InstagramIcon />
										</button>
									</a>
									<a href="https://www.linkedin.com/company/altcampus/" target="_blank">
										<button class="main_btn">
											<LinkedInIcon />
										</button>
									</a>
								</div>
							</div>
							<div class="right_side">
								<div></div>
							</div>
						</main>
						<div id="services">
							<p class="show_more">
								Anyone can:
								<br />
								-Gain or improve skills with practice or short-term training.
								<br />
								-Look into state-approved apprenticeship programs to gain skills and earn a salary.
								<br />
								-Contact a local public library about free classes. Many offer basic computer training
								and job skill classes.
								<br />
								-Review Occupational Skills and Employability Skills for more ways to expand your
								skills.
								<br />
							</p>

							<section className="section">
								<div class="item">
									<button class="main_btn">
										<WorkOutlineIcon />
									</button>
									<h5>Employer</h5>
									<a href="/employers/signup">Register</a>
									<p>Employers can get best Candidates as per Skills Rating.</p>
								</div>
								<div class="item">
									<button class="main_btn second">
										<SchoolIcon />
									</button>
									<h5>Candidate</h5>
									<a href="/candidates/signup">Register</a>
									<p>
										Candidates can contact with Employer as per Skills Rating.
										<br />
									</p>
								</div>
								<div class="text_content">
									<h2>Why choose us!</h2>
									<p>
										We connect you directly with Employer if your Skills Rating is best among your
										Competitors. This is a Job Portal site or app that enables you to find Jobs as
										per your Skills.
									</p>
									<button class="outline_btn">Learn More</button>
									<br />
									<a href="#contact">
										<button class="outline_btn">
											<PermContactCalendarIcon />
										</button>
									</a>
								</div>
							</section>
						</div>
					</header>
					<div id="contact" class="hero-box-container">
						<a href="" class="hero-box">
							<span class="hero-box__circle hero-box__circle--blue"></span>
							<h2 class="hero-box__title">About Us</h2>
							<p class="hero-box__body">
								AltCampus students.
								<br /> Location: Dharamshala, HP, India
								<br />
								AltCampus, The Alternative to College That You Wish Existed.
							</p>
						</a>
						<a href="" class="hero-box">
							<span class="hero-box__circle hero-box__circle--green"></span>
							<h2 class="hero-box__title">
								<img
									className="logo_job"
									src="https://lh3.googleusercontent.com/pw/ACtC-3ewkA_FaRzGusIEIH6ra-9KVBIjNOvaH_qVaxcOAuppSEWKvhw6WwOQXii595yi06hnBrCN6fbzKHUox-j5AgvaH9M577VK5PggX0C8h-zT6iaeq7bdt1S7Vq2jMjniaH8GgUhGrtMBVuMN0SFA44-b=w659-h609-no?authuser=0"
								/>
							</h2>
							<p class="hero-box__body">
								Steve's Jobs
								<br /> Find better than best
							</p>
						</a>
						<a href="" class="hero-box">
							<span class="hero-box__circle hero-box__circle--orange"></span>
							<h2 class="hero-box__title">Stay Connected</h2>
							<p class="hero-box__body">
								<TwitterIcon />
								<InstagramIcon />
								<LinkedInIcon />
								<br />
								altstevesjobs@gmail.com
								<br /> © Steve's Jobs, 2020-present.
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

export default geolocated({
	positionOptions: {
		enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(connect(mapToProps)(withRouter(LandingPage)));
