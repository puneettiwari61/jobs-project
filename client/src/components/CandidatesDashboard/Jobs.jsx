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
          Jobs You have Applied
        </Typography>
        {this.props.candidate.currentCandidate.jobsApplied.map(job => {
          return (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Apply Date - {Date(job.createdAt)}
                </Typography>
                <Typography variant="h5" component="h2">
                  {job.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {job.employer.company.companyName}
                </Typography>
                <Typography variant="body2" component="p">
                  {job.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Details</Button>
                <Button
                  href={`/candidates/dashboard/messages/${job.employer._id}`}
                  variant="outlined"
                >
                  Message
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </>
    );
  }
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(withRouter(withStyles(styles)(Jobs)));
Jobs.propTypes = {
  classes: PropTypes.object.isRequired
};
