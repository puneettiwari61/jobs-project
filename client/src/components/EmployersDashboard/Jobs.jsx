import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import AppliedCandidates from "./AppliedCandidates";

const styles = theme => ({
  root: {
    minWidth: 275
    // maxWidth: 800
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class Jobs extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography color="primary" variant="h4" align="center">
          Posted Jobs
        </Typography>
        {this.props.employer.currentEmployer.jobs.map(job => {
          return (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Posten On - {Date(job.createdAt)}
                </Typography>
                <Typography variant="h5" component="h2">
                  {job.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {this.props.employer.currentEmployer.company.companyName}
                </Typography>
                <Typography variant="body2" component="p">
                  {job.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Details</Button>
              </CardActions>
              <CardActions>
                <Button
                  onClick={() =>
                    this.props.history.push(
                      `/employers/dashboard/jobs/${job.slug}/appliedcandidates`
                    )
                  }
                  size="small"
                  variant="outlined"
                >
                  Show Applied Candidates
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </>
    );
  }
}

function mapToProps({ employer }) {
  return { employer };
}

export default connect(mapToProps)(withRouter(withStyles(styles)(Jobs)));
Jobs.propTypes = {
  classes: PropTypes.object.isRequired
};
