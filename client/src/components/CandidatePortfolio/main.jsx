import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import CandidateProfile from "./CandidatePortfolio";
import Table from "./table";
import { render } from "@testing-library/react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  right: {
    marginTop: "6rem"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignInSide extends React.Component {
  // const classes = useStyles();
  constructor() {
    super();
    this.state = { candidate: null };
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
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={9} component={Paper}>
          <CandidateProfile />
        </Grid>
        <Grid item xs={3} className={classes.right}>
          <Table currentCandidate={this.state.candidate} />
        </Grid>
      </Grid>
    ) : (
      ""
    );
  }
}

export default withRouter(withStyles(styles)(SignInSide));

SignInSide.propTypes = {
  classes: PropTypes.object.isRequired
};
