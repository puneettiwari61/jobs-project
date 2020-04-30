import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './login.scss';
import { loginCandidateFunc } from '../../store/actions';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '80%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class CandidatesLogin extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		};
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	// TODO: remove ajax calls from here and move to actions.
	handleSubmit = (e) => {
		e.preventDefault();

		Axios.post('/api/v1/candidates/login', { ...this.state })
			.then((res) => {
				if (res.data.success === true) {
					console.log(res, 'login successful');
					localStorage.setItem('jobUser', JSON.stringify({ token: res.data.token, type: 'candidate' }));
					this.props.dispatch(
						loginCandidateFunc({
							isCandidateLogged: true,
							candidateData: res.data.candidate,
						})
					);
					this.props.history.push('/');
				}
			})
			.catch((err) => console.log(err, 'login failed'));
	};

	render() {
		const { classes } = this.props;
		return (
			<Box>
				<form>
					<Container component="main" maxWidth="xs">
						<CssBaseline />

						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
							<form className={classes.form} noValidate>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
									size="small"
									onChange={this.handleChange}
									value={this.state.email}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									size="small"
									onChange={this.handleChange}
									value={this.state.password}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
									onClick={this.handleSubmit}
								>
									Sign In
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href="#" variant="body2">
											Forgot password?
										</Link>
									</Grid>
									<Grid item>
										<Link onClick={() => this.props.history.push('/candidates/signup')}>
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
							</form>
						</div>
					</Container>
				</form>
			</Box>
		);
	}
}

function mapToProps({ candidate, employer }) {
	if (employer.isEmployerLogged) {
		let { employerData, isEmployerLogged } = employer;
		return { employerData, isEmployerLogged };
	} else {
		let { candidateData, isCandidateLogged } = candidate;
		return { candidateData, isCandidateLogged };
	}
}

export default connect(mapToProps)(withRouter(withStyles(styles)(CandidatesLogin)));
CandidatesLogin.propTypes = {
	classes: PropTypes.object.isRequired,
};
