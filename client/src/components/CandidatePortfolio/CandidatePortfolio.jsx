import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Table from './table';
import Divider from '@material-ui/core/Divider';



const styles = (theme) => ({
	root: {
		...theme.typography.button,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(0),
		fontSize: '2rem',
	},
	rootSmall: {
		...theme.typography.button,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(0),
		fontSize: '1.5rem',
	},
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
    alignItems: 'center'
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
    display: 'flex',
		flexDirection: 'column',
    alignItems: 'center',
    maxWidth:700
	},
	box: {
		marginTop: theme.spacing(15),
	},
	link: {
		cursor: 'pointer',
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(18),
		height: theme.spacing(18),
	},
});

class CandidatePortfolio extends Component {
	constructor() {
		super();
		this.state = {
			url: '',
		};
	}
	componentDidMount() {
    var url=[];
		this.props.candidate.currentCandidate.skills.map((a) => {
			fetch(`https://en.wikipedia.org/wiki/${a.name}`, {
        mode: 'no-cors'
      }).then(function (response) {
				var data = response.text().then(function (res) {
					return res;
				});
				data.then((d) => {
					return (data = `${d}`);
        }).then((run) => this.setState({ url: data.split('img')[1].split('src')[1].split('"')[1] }))
        ;
			});
    });
    console.log(this.state)
	}

	render() {
		const { classes } = this.props;
		return (
			<Container component="main" className={classes.box}>
				<Box>
					<Paper className={classes.paperComponent}>
						<Container component="main" maxWidth="xs">
							

							<div className={classes.paper}>
								<Avatar
									alt="Remy Sharp"
									src={this.props.candidate.currentCandidate.image}
									className={classes.large}
								/>
<Divider variant="middle" />
								<div className={classes.root}>
									{this.props.candidate.currentCandidate.firstName +
										' ' +
										this.props.candidate.currentCandidate.lastName}
									<Link>
										<GitHubIcon />
									</Link>
								</div>

								<div className={classes.rootSmall}>{this.props.candidate.currentCandidate.city}</div>
							</div>
						</Container>
					</Paper>
					<br />
					<Paper className={classes.paperComponent}>
            
          <ButtonGroup  color="secondary" aria-label="outlined secondary button group">
            {this.props.candidate.currentCandidate.skills.map((a) => {
              return  <Button>{a.name}</Button>
            })}
    </ButtonGroup>
          </Paper>
					<br />
					<Paper className={classes.paperComponent}>
						<Table />
					</Paper>
				</Box>
			</Container>
		);
	}
}

function mapToProps({ candidate }) {
	return { candidate };
}

export default connect(mapToProps)(withRouter(withStyles(styles)(CandidatePortfolio)));

CandidatePortfolio.propTypes = {
	classes: PropTypes.object.isRequired,
};
