import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Button, RadioGroup, Container, Box, Paper } from '@material-ui/core';
import { ValidatorForm, TextValidator as TextField } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Select from 'react-select';
import Axios from 'axios';
import { createJob } from '../../store/actions';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	paperComponent: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
	},
	box: {
		marginTop: theme.spacing(15),
	},
	link: {
		cursor: 'pointer',
	},
	Typography: {
		marginBottom: '1.5rem',
	},
});

const remote = [
	{
		value: true,
		label: 'Yes available',
	},
	{
		value: false,
		label: 'Not available',
	},
];

const currency = [
	{
		label: '€ euros',
		value: 'euros',
	},
	{
		label: '$ dollars',
		value: 'dollars',
	},
	{
		label: '₹ rupees',
		value: 'rupees',
	},
];

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     borderBottom: "1px dotted pink",
//     // color: state.isSelected ? "red" : "blue",
//     // padding: 10,
//     backgroundColor: "white"
//   }),
//   control: () => ({
//     // none of react-select's styles are passed to <Control />
//     width: 500,
//     backgroundColor: "black"
//   }),
//   singleValue: (provided, state) => {
//     const opacity = state.isDisabled ? 0.5 : 1;
//     const transition = "opacity 300ms";

//     return { ...provided, opacity, transition };
//   }
// };

class PostJobs extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			location: '',
			skills: [],
			isRemote: '',
			currency: 'rupees',
			salary: '',
			skillsData: [],
			dollars: [
				['required', 'matchRegexp:^[1-9][0-9]{4,10}$'],
				['salary is required', 'minimun 10K'],
			],
		};
	}

	componentDidMount() {
		Axios.get('/api/v1/candidates/skills', {
			headers: { authorization: JSON.parse(localStorage.jobUser).token },
		})
			.then((res) => {
				this.setState({ skillsData: res.data.skills });
			})
			.catch((err) => console.log(err));
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = () => {
		console.log(this.state);
		this.props.dispatch(createJob(this.state));
		this.setState({
			title: '',
			description: '',
			location: '',
			skills: [],
			isRemote: '',
			currency: '',
			salary: '',
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Container component="main" className={classes.box}>
					<Box>
						<Paper className={classes.paperComponent}>
							<div className={classes.paper}>
								<Avatar className={classes.avatar}>
									<WorkOutlineIcon />
								</Avatar>
								<Typography component="h1" variant="h5" className={classes.Typography}>
									POST A JOB
								</Typography>
								<ValidatorForm
									ref="form"
									onError={(errors) => console.log(errors)}
									onSubmit={this.handleSubmit}
								>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<TextField
												required
												id="title"
												name="title"
												label="Title"
												fullWidth
												onChange={this.handleChange}
												value={this.state.title}
												variant="outlined"
												autoFocus
												placeholder="Use Complete words e.g. Junior Developer"
												validators={['required']}
												errorMessages={['this field is required']}
												size="small"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												multiline
												rows={4}
												id="description"
												name="description"
												label="Description"
												fullWidth
												onChange={this.handleChange}
												value={this.state.description}
												validators={['required']}
												errorMessages={['description is required']}
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												validators={['required']}
												errorMessages={['form is required']}
												size="small"
												id="remote"
												select
												label="Remote"
												helperText="Please select if remote available"
												variant="outlined"
												type="radio"
												name="isRemote"
												onChange={this.handleChange}
												value={this.state.isRemote}
											>
												{remote.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												id="location"
												name="location"
												label="Location"
												fullWidth
												onChange={this.handleChange}
												value={this.state.location}
												variant="outlined"
												size="small"
												disabled={this.state.isRemote === false ? false : true}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												validators={['required']}
												errorMessages={['form is required']}
												size="small"
												id="currency"
												select
												label="currency"
												helperText="Please select currency of salary "
												variant="outlined"
												type="radio"
												name="currency"
												onChange={this.handleChange}
												value={this.state.currency}
											>
												{currency.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												validators={
													this.state.currency == 'rupees'
														? [
																'required',
																'matchRegexp:^[6-9][0-9]{5,10}|[1-9][0-9]{6,10}$',
														  ]
														: this.state.dollars[0]
												}
												errorMessages={
													this.state.currency == 'rupees'
														? ['salary is required', 'minimun 6 Lakhs']
														: this.state.dollars[1]
												}
												id="salary"
												name="salary"
												label="salary"
												fullWidth
												onChange={this.handleChange}
												value={this.state.salary}
												variant="outlined"
												size="small"
												placeholder="Annual Salary"
											/>
										</Grid>
										<Grid item xs={12}>
											<Select
												isMulti
												name="skills"
												options={this.state.skillsData.map((a) => {
													return {
														value: `${a._id}`,
														label: `${a.name}`,
													};
												})}
												className="basic-multi-select"
												classNamePrefix="select"
												onChange={(e) => this.setState({ skills: e })}
												validators={['required']}
												errorMessages={['form is required']}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Button variant="contained" size="medium" type="submit">
												POST JOB
											</Button>
										</Grid>
									</Grid>
								</ValidatorForm>
							</div>
						</Paper>
					</Box>
				</Container>
			</React.Fragment>
		);
	}
}

function mapToProps({ employer }) {
	return { employer };
}

PostJobs.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(mapToProps)(withRouter(withStyles(styles)(PostJobs)));
