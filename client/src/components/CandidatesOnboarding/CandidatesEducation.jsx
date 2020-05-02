import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import FaceIcon from "@material-ui/icons/Face";

import { addCandidatesEducation } from "../../store/actions";

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

class CandidatesEducation extends Component {
  constructor() {
    super();
    this.state = {
      schoolOrCollege: "",
      classOrDegree: "",
      grade: "",
      branch: "",
      from: "",
      to: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = e => {
    console.log(this.state);
    this.props.dispatch(addCandidatesEducation(this.state));
    this.setState({
      schoolOrCollege: "",
      classOrDegree: "",
      grade: "",
      branch: "",
      from: "",
      to: ""
    });
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
          {this.props.candidate.currentCandidate.education.map(a => {
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

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CandidatesEducation))
);
CandidatesEducation.propTypes = {
  classes: PropTypes.object.isRequired
};
