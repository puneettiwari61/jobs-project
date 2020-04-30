import React, { Component } from 'react';
import './signup.scss';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
const genders = [
	{
		value: 'Male',
		label: 'Male',
	},
	{
		value: 'Female',
		label: 'Female',
	},
	{
		value: 'other',
		label: 'Other',
	},
];

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class CandidatesSignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			contactNumber: '',
			city: '',
			zip: '',
			dob: '',
			gender: '',
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		Axios.post('/api/v1/candidates/signup', { ...this.state })
			.then((res) => {
				console.log(res, 'signup successful');
				localStorage.setItem('jobUser', JSON.stringify({ token: res.data.token, type: 'candidate' }));
				this.props.loginFunction();
				this.props.history.push('/');
			})
			.catch((err) => console.log(err, 'signup failed'));
	};
	render() {
		const { classes } = this.props;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									size="small"
									type="text"
									onChange={this.handleChange}
									value={this.state.firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									size="small"
									type="text"
									onChange={this.handleChange}
									value={this.state.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									autoComplete="email"
									size="small"
									type="email"
									name="email"
									onChange={this.handleChange}
									value={this.state.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="Password"
									id="password"
									autoComplete="current-password"
									size="small"
									type="password"
									name="password"
									onChange={this.handleChange}
									value={this.state.password}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="city"
									variant="outlined"
									required
									fullWidth
									id="city"
									label="City"
									autoFocus
									size="small"
									type="city"
									onChange={this.handleChange}
									value={this.state.city}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="zip"
									variant="outlined"
									required
									fullWidth
									id="zip"
									label="Zip"
									autoFocus
									size="small"
									type="zip"
									onChange={this.handleChange}
									value={this.state.zip}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="dob"
									variant="outlined"
									required
									fullWidth
									id="dob"
									label="DOB"
									size="small"
									type="date"
									onChange={this.handleChange}
									value={this.state.dob}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="contactNumber"
									variant="outlined"
									required
									fullWidth
									id="contactNumber"
									label="Contact"
									autoFocus
									size="small"
									type="tel"
									onChange={this.handleChange}
									value={this.state.contactNumber}
									// pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									size="small"
									id="outlined-select-currency"
									select
									label="Gender"
									helperText="Please select your currency"
									variant="outlined"
									type="radio"
									name="gender"
									onChange={this.handleChange}
									value={this.state.gender}
								>
									{genders.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}></Box>
			</Container>
		);
	}
}

export default withRouter(withStyles(styles)(CandidatesSignUp));
CandidatesSignUp.propTypes = {
	classes: PropTypes.object.isRequired,
};
