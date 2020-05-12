import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Select from "react-select";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Axios from "axios";
import { Grid, Container, Box, Paper } from "@material-ui/core";


const styles = theme => ({
  root: {
    marginTop: theme.spacing(15)
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  box: {
    maxWidth: 800
  },
  card: {
    margin: "1rem"
  }
});

class ImgMediaCard extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      skills: null,
      skillsData: [],
      filteredJobs: null
    };
  }
  componentDidMount() {
    Axios.get("/api/v1/employers/jobs", {
      headers: { authorization: JSON.parse(localStorage.jobUser).token }
    })
      .then(res => {
        this.setState({ jobs: res.data.jobs });
      })
      .catch(err => console.log(err));
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
    if (!this.state.skills) {
      return this.setState({ filteredJobs: this.state.jobs });
    } else {
      let skills =
        this.state.skills === null ? [] : this.state.skills.map(a => a.value);
      Axios.post(
        "/api/v1/candidates/skills/jobs",
        {
          skills
        },
        {
          headers: { authorization: JSON.parse(localStorage.jobUser).token }
        }
      )
        .then(res => {
          this.setState({
            filteredJobs: res.data.jobs.length === "0" ? [] : res.data.jobs
          });
          console.log("after res", this.state, res.data);
        })
        .catch(err => console.log(err));
    }
  };


  showAll = () => {
    this.setState({ filteredJobs: this.state.jobs });
  };

  render() {
    const { classes } = this.props;
    console.log("showjobs", this.state.jobs);
    return (
      <>
        <Container component="main" className={classes.box}>
          <Box>
            <Paper className={classes.paperComponent}>
              <Grid item xs={12} className={classes.root}>
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
                <Button onClick={this.handleFilter} variant="outlined">
                  Filter
                </Button>
                <Button onClick={this.showAll} variant="outlined">
                  Show All
                </Button>
                {!this.state.filteredJobs
                  ? this.state.jobs.map(job =>
                      job ? (
                        <Card className={classes.card}>
                          <CardActionArea>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {job.title}
                              </Typography>
                              {/* <Typography gutterBottom variant="h5" component="h2">
                          {job.employer.company.companyLogo}
                        </Typography> */}
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="40"
                                //   image={
                                //     job.employer.company.companyLogo
                                //       ? job.employer.company.companyLogo
                                //       : ""
                                //   }
                                title="Contemplative Reptile"
                              />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary" onClick={() =>this.props.history.push("/candidates/singlejob")}>
                              Details
                            </Button>
                            <Button size="small" color="primary">
                              Apply
                            </Button>
                          </CardActions>
                        </Card>
                      ) : (
                        ""
                      )
                    )
                  : this.state.filteredJobs.map(job =>
                      job ? (
                        <Card>
                          <CardActionArea>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {job.title}
                              </Typography>
                              {/* <Typography gutterBottom variant="h5" component="h2">
                          {job.employer.company.companyLogo}
                        </Typography> */}
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                //   image={
                                //     job.employer.company.companyLogo
                                //       ? job.employer.company.companyLogo
                                //       : ""
                                //   }
                                title="Contemplative Reptile"
                              />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary" onClick={() =>this.props.history.push("/candidates/singlejob")}>
                              Details
                            </Button>
                            <Button size="small" color="primary">
                              Apply
                            </Button>
                          </CardActions>
                        </Card>
                      ) : (
                        ""
                      )
                    )}
              </Grid>
            </Paper>
          </Box>
        </Container>
      </>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(ImgMediaCard))
);

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};
