import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { candidateAuthProgress, candidatesLogin } from "../../store/actions";
import AwesomeComponent from "../Loader/Lodaer";

const styles = theme => ({
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
    maxWidth: 500
  },
  box: {
    marginTop: theme.spacing(15)
  }
});

class CandidatesLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      msg: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .dispatch(candidatesLogin(this.state))
      .then(data => {
        if (data.success) return this.props.history.push("/candidates/profile");
        this.setState({ msg: data.msg });
      })
      .catch(err => {
        console.log(err, "login failed");
        store.dispatch(
          candidateAuthProgress({ isAuthInProgress: false, isAuthDone: false })
        );
      });
  };

  render() {
    const { classes } = this.props;
    const isAuthInProgress = this.props.candidate.isAuthInProgress;
    console.log(isAuthInProgress, "isAuthInProgress");
    return (
      <Container component="main" className={classes.box}>
        <Box>
          <Paper className={classes.paperComponent}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />

              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Candidate Login
                </Typography>
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  onError={errors => console.log(errors)}
                >
                  <form className={classes.form} noValidate>
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      size="small"
                      onChange={this.handleChange}
                      value={this.state.email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "email is required",
                        "email is not valid"
                      ]}
                    />
                    <Link href="/recover" variant="body2">
                      {this.state.msg == "incorrect credentials"
                        ? this.state.msg
                        : ""}
                    </Link>
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      size="small"
                      onChange={this.handleChange}
                      value={this.state.password}
                      validators={[
                        "required",
                        "matchRegexp:^[a-z | 0-9]{6,15}$"
                      ]}
                      errorMessages={[
                        "passwword is required",
                        "minimum length is 6"
                      ]}
                    />
                    <Link href="/recover" variant="caption" color="primary">
                      {this.state.msg == "incorrect password"
                        ? this.state.msg
                        : ""}
                    </Link>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {isAuthInProgress ? "Signing in . . ." : "Sign In"}
                    </Button>
                  </form>
                </ValidatorForm>
                <Grid container>
                  <Grid item xs>
                    <Link href="/recover" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/candidates/signup">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Paper>
        </Box>
      </Container>
    );
  }
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CandidatesLogin))
);
CandidatesLogin.propTypes = {
  classes: PropTypes.object.isRequired
};
