import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Axios from 'axios';
import { Grid, Container, Box, Paper } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		padding: '0.8rem',
	},
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// padding: "0.8rem"
	},
	box: {
		maxWidth: 800,
		marginTop: theme.spacing(15),
	},
	card: {
		margin: '1rem',
	},
});

class Jobs extends React.Component {
	constructor() {
		super();
		this.state = {
			jobs: [],
			skills: null,
			skillsData: [],
			filteredJobs: null,
		};
	}
	componentDidMount() {
		Axios.get('/api/v1/employers/jobs')
			.then((res) => {
				console.log(res.data.jobs, 'From public jobs');

				this.setState({ jobs: res.data.jobs });
			})
			.catch((err) => console.log(err));
		Axios.get('/api/v1/candidates/skills')
			.then((res) => {
				console.log(res.data, 'From public skill jobs');
				this.setState({ skillsData: res.data.skills });
			})
			.catch((err) => console.log(err));
	}

	handleFilter = () => {
		console.log('before res', this.state);
		if (!this.state.skills) {
			return this.setState({ filteredJobs: this.state.jobs });
		} else {
			let skills = this.state.skills === null ? [] : this.state.skills.map((a) => a.value);
			Axios.post('/api/v1/candidates/skills/jobs', {
				skills,
			})
				.then((res) => {
					this.setState({
						filteredJobs: res.data.jobs.length === '0' ? [] : res.data.jobs,
					});
					console.log('after res', this.state, res.data);
				})
				.catch((err) => console.log(err));
		}
	};

	showAll = () => {
		this.setState({ filteredJobs: this.state.jobs });
	};

	render() {
		const { classes } = this.props;
		console.log('showjobs', this.state.jobs);

		return (
			<>
				<Container component="main" className={classes.box}>
					<Box>
						<Paper className={classes.paperComponent}>
							{this.state.filteredJobs && this.state.filteredJobs.length == 0 ? (
								<h5 style={{ textAlign: 'center' }}>No results</h5>
							) : this.state.filteredJobs && this.state.filteredJobs.length > 0 ? (
								<h5 style={{ textAlign: 'center' }}>
									{this.state.filteredJobs.length}{' '}
									{this.state.filteredJobs.length == 1 ? 'result' : 'results'}
								</h5>
							) : (
								<h5 style={{ textAlign: 'center' }}>
									{this.state.jobs.length} {this.state.jobs.length == 1 ? 'result' : 'results'}
								</h5>
							)}

							<Grid item xs={12} className={classes.root}>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={8}>
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
										/>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Button onClick={this.handleFilter} variant="outlined">
											Search
										</Button>
										<Button onClick={this.showAll} variant="outlined">
											Show All
										</Button>
									</Grid>
								</Grid>

								<Grid container spacing={3}>
									{!this.state.filteredJobs
										? this.state.jobs.map((job) =>
												job ? (
													<Grid item xs={12} sm={6}>
														<CardActionArea>
															<CardContent
																onClick={() =>
																	this.props.history.push(`/jobs/${job.slug}`)
																}
															>
																<Typography gutterBottom variant="h5" component="h2">
																	{job.title}
																	{/* {job.slug} */}
																</Typography>
																{/* <Typography gutterBottom variant="h5" component="h2">
                          {job.employer.company.companyLogo}
                        </Typography> */}
																<CardMedia
																	component="img"
																	alt="Contemplative Reptile"
																	height="100"
																	image="https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198__340.jpg"
																	title="Contemplative Reptile"
																/>
																<Typography
																	variant="body2"
																	color="textSecondary"
																	component="p"
																>
																	{/* Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica */}
																</Typography>
															</CardContent>
														</CardActionArea>
														<CardActions>
															<Button
																size="small"
																color="primary"
																onClick={() =>
																	this.props.history.push(`/jobs/${job.slug}`)
																}
															>
																Details
															</Button>
															{/* <Button size="small" color="primary">
                              Apply
                            </Button> */}
														</CardActions>
													</Grid>
												) : (
													''
												)
										  )
										: this.state.filteredJobs.map((job) =>
												job ? (
													<Grid item xs={12} sm={6}>
														<CardActionArea>
															<CardContent
																onClick={() =>
																	this.props.history.push(`/jobs/${job.slug}`)
																}
															>
																<Typography gutterBottom variant="h5" component="h2">
																	{job.title}
																</Typography>
																{/* <Typography gutterBottom variant="h5" component="h2">
                          {job.employer.company.companyLogo}
                        </Typography> */}
																<CardMedia
																	component="img"
																	alt="Contemplative Reptile"
																	height="100"
																	image="https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198__340.jpg"
																	title="Contemplative Reptile"
																/>
																<Typography
																	variant="body2"
																	color="textSecondary"
																	component="p"
																>
																	Lizards are a widespread group of squamate reptiles,
																	with over 6,000 species, ranging across all
																	continents except Antarctica
																</Typography>
															</CardContent>
														</CardActionArea>
														<CardActions>
															<Button
																size="small"
																color="primary"
																onClick={() =>
																	this.props.history.push(`/jobs/${job.slug}`)
																}
															>
																Details
															</Button>
															{/* <Button size="small" color="primary">
                              Apply
                            </Button> */}
														</CardActions>
													</Grid>
												) : (
													''
												)
										  )}
								</Grid>
							</Grid>
						</Paper>
					</Box>
				</Container>
			</>
		);
	}
}

function mapToProps({ candidate, employer }) {
	return { candidate, employer };
}

export default connect(mapToProps)(withRouter(withStyles(styles)(Jobs)));

Jobs.propTypes = {
	classes: PropTypes.object.isRequired,
};
