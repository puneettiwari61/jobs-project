import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EducationIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";

function CollapsibleTable(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  }));

  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset"
      }
	},
	box:{
		background:"#231e39",
		color:"white"
	}
  });

  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(true);
  const employer = props.employer.currentEmployer
  const classes = useRowStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>	
        </TableHead>
        <TableBody>
        <TableCell component="th" scope="row" className={classes.box}>
				Personal Details
            </TableCell>
					<TableRow>
						<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<Box margin={1}>
									
									<List>
									Email: {employer.email}<br/>
									first name : {employer.firstName}<br/>
									last name : {employer.lastName}<br/>
									dob: {employer.dob}<br/>
									gender : {employer.gender}<br />
									Contact Number : {employer.contactNumber}<br/>
									Profile Description : {employer. profileDescription}
									</List>
								</Box>
							</Collapse>
						</TableCell>
					</TableRow>
					<TableCell component="th" scope="row" className={classes.box}>
				Company Details
              
            </TableCell>
					<TableRow>
						<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<Box margin={1}>
									
									<List>
									{employer.company.companyLogo}<br/>
									Company Name : {employer.company.companyName}<br/>
									Establishment Date : {employer.company.establishmentDate.substring(0,10)}<br/>
									Website URL :{employer.company.companyWebsiteUrl}<br/>
									founder : {employer.company.founder}<br />
									founders view : {employer.company.foundersView}<br/>
									about the company : {employer.company.aboutCompany}
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
function mapToProps({ employer }) {
  return { employer };
}

export default connect(mapToProps)(withRouter(CollapsibleTable));

CollapsibleTable.propTypes = {
  classes: PropTypes.object.isRequired
};
