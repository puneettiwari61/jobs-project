import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Button, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import FaceIcon from "@material-ui/icons/Face";
import {
  ValidatorForm,
  TextValidator as TextField
} from "react-material-ui-form-validator";

import { addCandidatesExperience } from "../../store/actions";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.3)
  }
});

class CandidatesExperience extends Component {
  constructor() {
    super();
    this.state = {
      companyName: "",
      designation: "",
      location: "",
      description: "",
      joiningDate: "",
      leavingDate: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = e => {
    console.log(this.state);
    this.props.dispatch(addCandidatesExperience(this.state));
    this.setState({
      companyName: "",
      designation: "",
      location: "",
      description: "",
      joiningDate: "",
      leavingDate: ""
    });
  };

  render() {
    console.log(this.props.candidate.currentCandidate);
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ValidatorForm
          ref="form"
          onError={errors => console.log(errors)}
          onSubmit={this.handleAdd}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="companyName"
                name="companyName"
                label="Company Name"
                fullWidth
                onChange={this.handleChange}
                value={this.state.companyName}
                placeholder="e.g. AltCampus"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="designation"
                name="designation"
                label="Designation"
                fullWidth
                onChange={this.handleChange}
                value={this.state.designation}
                placeholder="e.g. junior developer"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="location"
                name="location"
                label="Location"
                fullWidth
                placeholder="e.g. Delhi"
                onChange={this.handleChange}
                value={this.state.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                placeholder="about your work and role in the company.."
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="joiningDate"
                name="joiningDate"
                label="Joining Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                required
                placeholder="joining date..."
                onChange={this.handleChange}
                value={this.state.joiningDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="leavingDate"
                name="leavingDate"
                label="Leaving Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="leaving date..."
                onChange={this.handleChange}
                value={this.state.leavingDate}
              />
            </Grid>
            <Button variant="contained" size="medium" type="submit">
              ADD
            </Button>
            {this.props.candidate.currentCandidate.experience.map(a => {
              return (
                <Chip
                  clickable
                  icon={<FaceIcon />}
                  onClick=""
                  className={classes.chip}
                  onDelete="Function"
                  label={a.companyName}
                />
              );
            })}
          </Grid>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CandidatesExperience))
);
CandidatesExperience.propTypes = {
  classes: PropTypes.object.isRequired
};
