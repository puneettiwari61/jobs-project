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

import { validateEmployersLogin } from "../../store/actions";

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
  },
  link: {
    cursor: "pointer"
  }
});

class EmployersLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    console.log(this.state);
    this.props.dispatch(validateEmployersLogin(this.state));
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
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
                  Employer Login
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
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
                  />
                  <TextField
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
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        className={classes.link}
                        onClick={() =>
                          this.props.history.push("/employers/signup")
                        }
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Paper>
        </Box>
      </Container>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(EmployersLogin))
);

EmployersLogin.propTypes = {
  classes: PropTypes.object.isRequired
};
