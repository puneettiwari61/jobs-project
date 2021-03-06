import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Table from "./table";
import Divider from "@material-ui/core/Divider";
import Iframe from "react-iframe";
import Axios from "axios";

const styles = theme => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    fontSize: "2rem"
  },
  rootSmall: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    fontSize: "1.5rem"
  },
  rootSm: {
    ...theme.typography.button,
    padding: theme.spacing(0),
    fontSize: "1rem"
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paperComponent: {
    padding: theme.spacing(2),
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 700
  },
  box: {
    marginTop: theme.spacing(15)
  },
  box2: {
    padding: theme.spacing(2),
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 700
  },
  link: {
    cursor: "pointer"
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18)
  },
  bgroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

class CandidatePortfolio extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      candidate: null
    };
  }

  componentDidMount() {
    Axios.get(`/api/v1/candidates/${this.props.match.params.id}/profile`)
      .then(res => {
        console.log(res.data, "candidate profile");
        this.setState({ candidate: res.data.candidate });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;

    return this.state.candidate ? (
      <Container component="main" className={classes.box}>
        <Box>
          <Paper className={classes.paperComponent}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Avatar
                  alt="Remy Sharp"
                  src={this.state.candidate.image}
                  className={classes.large}
                />
                <Divider variant="middle" />
                <div className={classes.root}>
                  {this.state.candidate.firstName +
                    " " +
                    this.state.candidate.lastName}
                  <Link>
                    <GitHubIcon />
                  </Link>
                </div>

                <div className={classes.rootSmall}>
                  {this.state.candidate.city}
                </div>
              </div>
            </Container>
          </Paper>
          <br />
          <Paper className={classes.paperComponent}>
            <div className={classes.rootSm}>ABOUT</div>
          </Paper>

          <br />

          <Paper className={classes.paperComponent}>
            <Table currentCandidate={this.state.candidate} />
          </Paper>
          <br />
          <Paper className={classes.paperComponent}>
            <div className={classes.rootSm}>Skills</div>
            <ButtonGroup
              color="secondary"
              aria-label="outlined secondary button group"
              className={classes.bgroup}
            >
              {this.state.candidate.skills.map(a => {
                return <Button>{a.name}</Button>;
              })}
            </ButtonGroup>
          </Paper>
          <br />

          <Paper className={classes.paperComponent}>
            <div className={classes.rootSm}>Resume</div>
            <Iframe
              url={this.state.candidate.resume}
              width="100%"
              height="450px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
              styles={{ overflow: "hidden" }}
            />
          </Paper>
        </Box>
      </Container>
    ) : (
      ""
    );
  }
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CandidatePortfolio))
);

CandidatePortfolio.propTypes = {
  classes: PropTypes.object.isRequired
};
