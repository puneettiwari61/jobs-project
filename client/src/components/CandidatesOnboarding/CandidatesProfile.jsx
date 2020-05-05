import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import CandidatesEducation from "./CandidatesEducation";
import CandidatesExperience from "./CandidatesExperience";
import CandidatesSkills from "./CandidatesSkills";
import CandidatesBasicInfo from "./CandidatesBasicInfo";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://jobs.altcampus.xyz/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    },
    marginTop: theme.spacing(15)
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    width: "auto%",
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["Basic Information", "Education", "Experience", "Skills"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CandidatesBasicInfo />;
    case 1:
      return <CandidatesEducation />;
    case 2:
      return <CandidatesExperience />;
    case 3:
      return <CandidatesSkills />;
    default:
      throw new Error("Unknown step");
  }
}

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <h1>Welcome{" " + props.candidate.currentCandidate.firstName}</h1>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Updated Successfully
                </Typography>
                <Typography variant="subtitle1">
                  Your Profile has been updated.
                </Typography>
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 4 &&
                  props.candidate.currentCandidate.github ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  ) : activeStep === steps.length - 3 &&
                    props.candidate.currentCandidate.education[0] ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  ) : activeStep === steps.length - 2 &&
                    props.candidate.currentCandidate.experience[0] ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  ) : activeStep === steps.length - 1 &&
                    props.candidate.currentCandidate.skills[0] ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(Checkout);
