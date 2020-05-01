import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateLoggedCandidate } from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import FaceIcon from '@material-ui/icons/Face';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row-reverse',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.3),
	},
});

class CandidatesEducation extends Component {
	constructor() {
		super();
		this.state = {
			schoolOrCollege: '',
			classOrDegree: '',
			grade: '',
			branch: '',
			from: '',
			to: '',
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleAdd = (e) => {
		console.log(this.state);
		Axios.post(
			'/api/v1/candidates/education',
			{ ...this.state },
			{
				headers: { authorization: JSON.parse(localStorage.jobUser).token },
			}
		)
			.then((res) => {
				console.log(res, 'education successful');
				this.props.dispatch(updateLoggedCandidate({ currentCandidate: res.data.candidate }));
				this.setState({
					schoolOrCollege: '',
					classOrDegree: '',
					grade: '',
					branch: '',
					from: '',
					to: '',
				});
			})
			.catch((err) => console.log(err, 'education failed'));
	};

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							required
							id="schoolOrCollege"
							name="schoolOrCollege"
							label="School / College"
							fullWidth
							onChange={this.handleChange}
							value={this.state.schoolOrCollege}
							placeholder="School or College Name"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="classOrDegree"
							name="classOrDegree"
							label="Class / Degree"
							fullWidth
							onChange={this.handleChange}
							value={this.state.classOrDegree}
							placeholder="eg. 12th or Btech"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id=" grade"
							name="grade"
							label="Grade"
							fullWidth
							placeholder="percentage, CGPA, or grade"
							onChange={this.handleChange}
							value={this.state.grade}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="branch"
							name="branch"
							label="Branch"
							fullWidth
							onChange={this.handleChange}
							value={this.state.branch}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="from"
							name="from"
							label="From"
							fullWidth
							placeholder="year of starting"
							placeholder="year of starting"
							onChange={this.handleChange}
							value={this.state.from}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="to"
							name="to"
							label="To"
							fullWidth
							placeholder="year of passing"
							placeholder="year of passing"
							onChange={this.handleChange}
							value={this.state.to}
						/>
					</Grid>
					<Button variant="contained" size="medium" onClick={this.handleAdd}>
						ADD
					</Button>
					{this.props.candidate.currentCandidate.education.map((a) => {
						return (
							<Chip
								clickable
								icon={<FaceIcon />}
								onClick=""
                className={classes.chip}
                onDelete="Function"
								label={a.classOrDegree}
							/>
						);
					})}
				</Grid>
			</React.Fragment>
		);
	}
}

function mapToProps({ candidate }) {
	return { candidate };
}

export default connect(mapToProps)(withRouter(withStyles(styles)(CandidatesEducation)));
CandidatesEducation.propTypes = {
	classes: PropTypes.object.isRequired,
};
// return (
//   <>
//     <div className="login-box education">
//       <form>
//         <h2>Education</h2>
//         <div className="user-box">
//           <input
//             type="text"
//             name="schoolOrCollege"
//             required=""
//             onChange={this.handleChange}
//             value={this.state.schoolOrCollege}
//             placeholder="School or College Name"
//           />
//           <label>School/College</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             name="classOrDegree"
//             required=""
//             onChange={this.handleChange}
//             value={this.state.classOrDegree}
//             placeholder="School or College Name"
//           />
//           <label>Class/Degree</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             name="grade"
//             required=""
//             placeholder="percentage, CGPA, or grade"
//             onChange={this.handleChange}
//             value={this.state.grade}
//           />
//           <label>Grade</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             required=""
//             name="branch"
//             onChange={this.handleChange}
//             value={this.state.branch}
//           />
//           <label>Branch</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             name="from"
//             required=""
//             placeholder="year of starting"
//             onChange={this.handleChange}
//             value={this.state.from}
//           />
//           <label>From</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             name="to"
//             required=""
//             placeholder="year of passing"
//             onChange={this.handleChange}
//             value={this.state.to}
//           />
//           <label>To</label>
//         </div>
//         <a onClick={this.handleAdd}>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           Add
//         </a>
//         <br />
//         <a onClick={this.handleBack}>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           Back
//         </a>
//         <a onClick={this.handleSubmit}>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           Next
//         </a>
//       </form>
//     </div>
//   </>
// );
