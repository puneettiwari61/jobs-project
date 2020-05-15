import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: "36ch",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

class AppliedCandidates extends React.Component {
  constructor() {
    super();
    this.state = {
      job: null
    };
  }

  componentDidMount() {
    Axios.get(`/api/v1/employers/jobs/${this.props.match.params.slug}`, {
      headers: { authorization: JSON.parse(localStorage.jobUser).token }
    })
      .then(res => {
        console.log(res.data.job, "from applied candidiates");
        this.setState({ job: res.data.job });
      })
      .catch(err => console.log(err, "applied candidates fetchfailed"));
  }

  render() {
    const { classes } = this.props;
    console.log(this.state, "from applied candidiates");
    return (
      <>
        <Typography variant="h5" component="h3">
          Candidates who have applied for -
        </Typography>
        <Typography variant="h4" component="h2" color="primary">
          {this.state.job && this.state.job.title} Job
        </Typography>
        {this.state.job &&
          this.state.job.applicants.map(c => {
            return (
              <List className={classes.root}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={c.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={c.firstName + c.lastName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {c.gender}
                        </Typography>
                        <br />
                        {c.skills.map(a => {
                          return (
                            <span style={{ padding: 5 }}>
                              <Chip
                                clickable
                                // icon={<FaceIcon />}
                                onClick=""
                                className={classes.chip}
                                // onDelete={() => this.handledelete(a)}
                                label={a.name}
                              />
                            </span>
                          );
                        })}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            );
          })}
      </>
    );
  }
}

function mapToProps({ employer }) {
  return { employer };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(AppliedCandidates))
);
AppliedCandidates.propTypes = {
  classes: PropTypes.object.isRequired
};
