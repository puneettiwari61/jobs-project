import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
// import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator as TextField } from 'react-material-ui-form-validator';
import Avatar from '@material-ui/core/Avatar';

import { saveCandidatesBasicInfo } from '../../store/actions';

const styles = (theme) => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: 700,
	},
	title: {
		marginTop: theme.spacing(2),
	},
});

class CandidatesPortfolio extends Component {
	constructor() {
		super();
		this.state = {
			image: '',
			spokenLanguages: '',
			resume: '',
			github: '',
			githubImage: '',
			save: 'save',
		};
	}

	componentDidMount() {
		fetch(`https://api.github.com/users/${this.props.candidate.currentCandidate.github}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ githubImage: data.avatar_url });
			});
		let { image, spokenLanguages, resume, github } = this.props.candidate.currentCandidate;
		spokenLanguages = spokenLanguages.join();
		this.setState({ image, spokenLanguages, resume, github });
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleChangeImage = () => {
		fetch(`https://api.github.com/users/${this.state.github}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ githubImage: data.avatar_url });
			});
	};

	handleSave = (e) => {
		this.props.dispatch(saveCandidatesBasicInfo(this.state));
		this.setState({ save: 'saved' });
	};

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<ValidatorForm ref="form" onError={(errors) => console.log(errors)} onSubmit={this.handleSave}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<Avatar alt={this.props.candidate.currentCandidate.firstName} src={this.state.image} />
							<TextField
								required
								id="image"
								name="image"
								label="Image"
								fullWidth
								onChange={this.handleChange}
								value={this.state.image}
								autoFocus
								validators={['required', 'matchRegexp:^(ftp|http|https)://[^ "]+$']}
								errorMessages={['url is required', 'enter a valid URL']}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Avatar
								alt={this.props.candidate.currentCandidate.firstName}
								src={this.state.githubImage}
							/>
							<TextField
								id="github"
								name="github"
								label="Github"
								placeholder="your github username"
								fullWidth
								onChange={this.handleChange}
								onBlur={this.handleChangeImage}
								value={this.state.github}
								validators={['required', 'matchRegexp:^[a-z|A-Z | 0-9]{1,15}$']}
								errorMessages={['username is required', 'enter a valid Github username']}
							/>{' '}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="spokenLanguages"
								name="spokenLanguages"
								label="Spoken Languages"
								fullWidth
								onChange={this.handleChange}
								value={this.state.spokenLanguages}
								validators={['required', 'matchRegexp:^[a-z|A-Z,;]{3,55}$']}
								errorMessages={['City is required', 'e.g. English,Hindi']}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="resume"
								name="resume"
								label="Resume"
								fullWidth
								onChange={this.handleChange}
								value={this.state.resume}
								validators={['required', 'matchRegexp:^(ftp|http|https)://[^ "]+$']}
								errorMessages={['url is required', 'enter a valid URL']}
							/>
						</Grid>

						<Button variant="contained" size="medium" type="submit">
							{this.state.save}
						</Button>
					</Grid>
				</ValidatorForm>
			</React.Fragment>
		);
	}
}

function mapToProps({ candidate }) {
	return { candidate };
}

CandidatesPortfolio.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(mapToProps)(withRouter(withStyles(styles)(CandidatesPortfolio)));
