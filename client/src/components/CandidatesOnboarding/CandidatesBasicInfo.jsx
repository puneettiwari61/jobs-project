import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
// import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator as TextField
} from "react-material-ui-form-validator";

import { saveCandidatesBasicInfo } from "../../store/actions";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" }
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA"
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" }
];

const styles = theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
});

class CandidatesPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      spokenLanguages: "",
      resume: "",
      github: ""
    };
  }

  componentDidMount() {
    let {
      image,
      spokenLanguages,
      resume,
      github
    } = this.props.candidate.currentCandidate;
    spokenLanguages = spokenLanguages.join();
    this.setState({ image, spokenLanguages, resume, github });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSave = e => {
    this.props.dispatch(saveCandidatesBasicInfo(this.state));
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ValidatorForm
          ref="form"
          onError={errors => console.log(errors)}
          onSubmit={this.handleSave}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="image"
                name="image"
                label="Image"
                fullWidth
                onChange={this.handleChange}
                value={this.state.image}
                autoFocus
                // validators={['required', 'matchRegexp:/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i']}
                // errorMessages={['url is required', 'it should be URL']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="spokenLanguages"
                name="spokenLanguages"
                label="Spoken Languages"
                fullWidth
                onChange={this.handleChange}
                value={this.state.spokenLanguages}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="resume"
                name="resume"
                label="Resume"
                fullWidth
                onChange={this.handleChange}
                value={this.state.resume}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="github"
                name="github"
                label="Github"
                placeholder="your github username"
                fullWidth
                onChange={this.handleChange}
                value={this.state.github}
              />
            </Grid>
            <Button variant="contained" size="medium" type="submit">
              Save
            </Button>
          </Grid>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

function mapToProps({ candidate }) {
  return { candidate };
}

CandidatesPortfolio.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CandidatesPortfolio))
);
