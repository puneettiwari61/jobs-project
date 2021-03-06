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
import { Button } from "@material-ui/core";
import Select from "react-select";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    padding: "1rem"
  },
  inline: {
    display: "inline"
  },
  hireButton: {
    marginLeft: "2rem"
  },
  div: {
    padding: "1rem"
  }
});

class AppliedCandidates extends React.Component {
  constructor() {
    super();
    this.state = {
      job: null,
      skillsData: [],
      skills: null,
      filteredCanidates: null,
      hired: false
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

    Axios.get("/api/v1/candidates/skills", {
      headers: { authorization: JSON.parse(localStorage.jobUser).token }
    })
      .then(res => {
        this.setState({ skillsData: res.data.skills });
      })
      .catch(err => console.log(err));
  }

  handleFilter = () => {
    console.log("before res", this.state);
    var ids = this.state.job.applicants.map(c => c.candidate._id);
    // if (!this.state.skills) {
    //   return this.setState({ filteredCanidates:  });

    // } else {
    let skills =
      this.state.skills === null ? [] : this.state.skills.map(a => a.value);
    Axios.post(
      "/api/v1/employers/skills/jobs/candidates",
      {
        skills,
        ids
      },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        // this.setState({
        //   filteredJobs: res.data.jobs.length === "0" ? [] : res.data.candidates
        // });

        this.setState({ filteredCanidates: res.data.candidates });
        console.log("after res", this.state, res.data);
      })
      .catch(err => console.log(err));
    // }
  };

  hire = React.createRef("");

  handleHire = _id => {
    console.log(this.hire.current);
    Axios.post(
      "/api/v1/employers/hired/jobs/candidates",
      {
        _id,
        jobId: this.state.job._id
      },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        this.hire.current.innerText = "Hired";

        console.log("hred", this.state, res.data);
      })
      .catch(err => console.log(err));
  };

  showAll = () => {
    this.setState({ filteredCanidates: null });
  };

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
        <Select
          isMulti
          name="skills"
          options={this.state.skillsData.map(a => {
            return {
              value: `${a._id}`,
              label: `${a.name}`
            };
          })}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={e => this.setState({ skills: e })}
        />
        <Button variant="outlined" onClick={this.handleFilter}>
          Filter
        </Button>
        <Button variant="outlined" onClick={this.showAll}>
          Show All
        </Button>

        {!this.state.filteredCanidates
          ? this.state.job &&
            this.state.job.applicants.map(c => {
              return (
                <List className={classes.root}>
                  <ListItem alignItems="flex-start" className={classes.div}>
                    <ListItemAvatar>
                      <Avatar src={c.candidate.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={c.candidate.firstName + c.candidate.lastName}
                      // className={classes.div}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {c.candidate.gender}
                          </Typography>
                          <br />
                          {c.candidate.skills
                            ? c.candidate.skills.map(a => {
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
                              })
                            : ""}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <div className={classes.div}>
                    <Button
                      href={`/employers/dashboard/messages/${c.candidate._id}`}
                      // onClick={() =>
                      //   this.props.history.push("/employers/dashboard/messages")
                      // }
                      variant="outlined"
                    >
                      Message
                    </Button>
                    <Button href={`/profile/candidates/${c.candidate._id}`}>
                      View Profile
                    </Button>
                    {this.state.job.hiredCandidates.includes(
                      c.candidate._id
                    ) ? (
                      <span
                        style={{
                          color: "#53d4e9",
                          fontSize: "1.2rem",
                          marginLeft: "2rem"
                        }}
                      >
                        Already Hired
                      </span>
                    ) : (
                      <Button
                        onClick={() => this.handleHire(c.candidate._id)}
                        variant="contained"
                        size="medium"
                        className={classes.hireButton}
                        ref={this.hire}
                      >
                        Hire {c.candidate.firstName}
                      </Button>
                    )}
                  </div>
                </List>
              );
            })
          : this.state.filteredCanidates.map(c => {
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
                          {c.skills
                            ? c.skills.map(a => {
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
                              })
                            : ""}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <div className={classes.div}>
                    <Button
                      href={`/employers/dashboard/messages/${c._id}`}
                      // onClick={() =>
                      //   this.props.history.push("/employers/dashboard/messages")
                      // }
                      variant="outlined"
                    >
                      Message
                    </Button>
                    <Button href={`/profile/candidates/${c._id}`}>
                      View Profile
                    </Button>
                    {this.state.job.hiredCandidates.includes(c._id) ? (
                      <span
                        style={{
                          color: "#53d4e9",
                          fontSize: "1.2rem",
                          marginLeft: "2rem"
                        }}
                      >
                        Already Hired
                      </span>
                    ) : (
                      <Button
                        onClick={() => this.handleHire(c._id)}
                        variant="contained"
                        size="medium"
                        className={classes.hireButton}
                      >
                        Hire {c.firstName}
                      </Button>
                    )}
                  </div>
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
