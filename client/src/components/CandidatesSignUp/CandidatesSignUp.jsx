import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator as TextField
} from "react-material-ui-form-validator";
import { candidatesSignup, candidateAuthProgress } from "../../store/actions";

// import "./signup.scss";
const genders = [
  {
    value: "Male",
    label: "Male"
  },
  {
    value: "Female",
    label: "Female"
  },
  {
    value: "other",
    label: "Other"
  }
];

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary
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

class CandidatesSignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
      city: "",
      zip: "",
      dob: "",
      gender: "",
      msg: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .dispatch(candidatesSignup(this.state))
      .then(data => {
        if (data.success) return this.props.history.push("/candidates/profile");
        if (data.err.errmsg.includes("duplicate"))
          return this.setState({ msg: "User with same email already exists" });
      })
      .catch(err => {
        console.log(err, "signup failed");
        this.props.dispatch(
          candidateAuthProgress({ isAuthInProgress: false, isAuthDone: false })
        );
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" className={classes.box}>
        <CssBaseline />
        <Paper className={classes.paperComponent}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Candidate Signup
            </Typography>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log(errors)}
            >
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      size="small"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.firstName}
                      validators={["required"]}
                      errorMessages={["first is required"]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      validators={["required"]}
                      errorMessages={["last name is required"]}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      size="small"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "email is required",
                        "email is not valid"
                      ]}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      size="small"
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      validators={[
                        "required",
                        "matchRegexp:^[a-z | 0-9 | !,@,#,$,$,^,&,*,(,),_,+]{6,15}$"
                      ]}
                      errorMessages={[
                        "passwword is required",
                        "minimum length is 6"
                      ]}
                      variant="outlined"
                      required
                      fullWidth
                      label="Password"
                      id="password"
                      autoComplete="current-password"
                      size="small"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      validators={[
                        "required",
                        "matchRegexp:^[a-z |A-Z|"
                      ]}
                      errorMessages={[
                        "City is required",
                        "minimum length is 3",
                        "special characters not allowed"
                      ]}
                      autoComplete="fname"
                      name="city"
                      variant="outlined"
                      required
                      fullWidth
                      id="city"
                      label="City"
                      size="small"
                      type="city"
                      onChange={this.handleChange}
                      value={this.state.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      validators={["required", "matchRegexp:^[0-9]{6}$"]}
                      errorMessages={["zip is required", "use 6 digit number"]}
                      autoComplete="fname"
                      name="zip"
                      variant="outlined"
                      required
                      fullWidth
                      id="zip"
                      label="Zip"
                      size="small"
                      type="zip"
                      onChange={this.handleChange}
                      value={this.state.zip}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      validators={["required"]}
                      errorMessages={["DOB is required"]}
                      autoComplete="dob"
                      name="dob"
                      variant="outlined"
                      required
                      fullWidth
                      id="dob"
                      label="DOB"
                      size="small"
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.dob}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      validators={["required", "matchRegexp:^[0-9]{10}$"]}
                      errorMessages={["contact number is required"]}
                      autoComplete="fname"
                      name="contactNumber"
                      variant="outlined"
                      required
                      fullWidth
                      id="contactNumber"
                      label="Contact"
                      size="small"
                      type="tel"
                      onChange={this.handleChange}
                      value={this.state.contactNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      validators={["required"]}
                      errorMessages={["form is required"]}
                      size="small"
                      id="outlined-select-currency"
                      select
                      label="Gender"
                      helperText="Please select your gender"
                      variant="outlined"
                      type="radio"
                      name="gender"
                      onChange={this.handleChange}
                      value={this.state.gender}
                    >
                      {genders.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </form>
            </ValidatorForm>
            <Grid container justify="flex-end">
              <Grid item>
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  onError={errors => console.log(errors)}
                >
                  <Link href="/candidates/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </ValidatorForm>
                <p>{this.state.msg}</p>
              </Grid>
            </Grid>
          </div>
          <Box mt={5}></Box>
        </Paper>
      </Container>
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}

CandidatesSignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CandidatesSignUp))
);
