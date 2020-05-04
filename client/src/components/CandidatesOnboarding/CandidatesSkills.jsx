import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Skills from './skillsData.json';
import { Button } from '@material-ui/core';
import { addCandidatesSkills } from '../../store/actions.js';

class CandidatesSkills extends Component {
	constructor() {
		super();
		this.state = {
			skills: null,
		};
	}

	handleAdd = (e) => {
		let skillsArray = this.state.skills.map((a) => a.value);
		console.log(skillsArray);
		this.props.dispatch(addCandidatesSkills({ skills: skillsArray }));
	};

	render() {
		console.log(this.state);
		return (
			<>
				<Select
					// defaultValue={[colourOptions[2], colourOptions[3]]}
					isMulti
					name="skills"
					options={Skills.skills.map((a) => {
						return {
							value: `${a}`,
							label: `${a}`,
							// color: "#00B8D9",
							// isFixed: true
						};
					})}
					className="basic-multi-select"
					classNamePrefix="select"
					onChange={(e) => this.setState({ skills: e })}
				/>
				<Button variant="contained" size="medium" onClick={this.handleAdd} style={{ marginTop: '1rem' }}>
					ADD
				</Button>
			</>
		);
	}
}

function mapToProps({ candidate }) {
	let { candidateData, isCandidateLogged } = candidate;
	return { candidateData, isCandidateLogged };
}

export default connect(mapToProps)(withRouter(CandidatesSkills));
