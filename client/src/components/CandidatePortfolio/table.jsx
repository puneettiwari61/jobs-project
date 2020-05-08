import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import EducationIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';

function CollapsibleTable(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
	}));

	const useRowStyles = makeStyles({
		root: {
			'& > *': {
				borderBottom: 'unset',
			},
		},
	});

	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);

	const classes = useRowStyles();
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					{/* <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
          </TableRow> */}
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
								{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
							</IconButton>
						</TableCell>
						<TableCell component="th" scope="row">
							Education
						</TableCell>

						{/* <TableCell align="right">abc</TableCell>
						<TableCell align="right">xyz</TableCell> */}
					</TableRow>
					<TableRow>
						<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<Box margin={1}>
									<Typography variant="h6" gutterBottom component="div">
										History
									</Typography>
									<List>
										{props.candidate.currentCandidate.education.map((a) => {
											return (
												<ListItem>
													<ListItemAvatar>
														<Avatar>
															<EducationIcon />
														</Avatar>
													</ListItemAvatar>
													<ListItemText primary="Work" secondary="Jan 7, 2014" />
												</ListItem>
											);
										})}
									</List>
								</Box>
							</Collapse>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<IconButton aria-label="expand row" size="small" onClick={() => setOpen1(!open1)}>
								{open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
							</IconButton>
						</TableCell>
						<TableCell component="th" scope="row">
							Experience
						</TableCell>
						{/* <TableCell align="right">abc</TableCell>
						<TableCell align="right">xyz</TableCell> */}
					</TableRow>
					<TableRow>
						<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
							<Collapse in={open1} timeout="auto" unmountOnExit>
								<Box margin={1}>
									<Typography variant="h6" gutterBottom component="div">
										History
									</Typography>
									<List>
										{props.candidate.currentCandidate.experience.map((a) => {
											return (
												<ListItem>
													<ListItemAvatar>
														<Avatar>
															<WorkIcon />
														</Avatar>
													</ListItemAvatar>
													<ListItemText
														primary={a.companyName}
														secondary={
															Math.abs(
																a.leavingDate.split('-')[1] -
																	a.joiningDate.split('-')[1]
															) > 1
																? Math.abs(
																		a.leavingDate.split('-')[1] -
																			a.joiningDate.split('-')[1]
																  ) + ' Months'
																: Math.abs(
																		a.leavingDate.split('-')[1] -
																			a.joiningDate.split('-')[1]
																  ) + ' Month'
														}
													/>
												</ListItem>
											);
										})}
									</List>
								</Box>
							</Collapse>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
function mapToProps({ candidate }) {
	return { candidate };
}

export default connect(mapToProps)(withRouter(CollapsibleTable));

CollapsibleTable.propTypes = {
	classes: PropTypes.object.isRequired,
};
