import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Button, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  ValidatorForm,
  TextValidator as TextField
} from "react-material-ui-form-validator";
// import FaceIcon from "@material-ui/icons/Face";

import { saveCompanyDetails } from "../../store/actions";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.3)
  }
});

class CompanyDetails extends Component {
  constructor() {
    super();
    this.state = {
      establishmentDate: "",
      companyName: "",
      companyWebsiteUrl: "",
      profileImage: "",
      founder: "",
      foundersView: "",
      aboutCompany: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = e => {
    this.props.dispatch(saveCompanyDetails(this.state));
  };

  render() {
    // let company = this.props.employer.currentEmployer.company;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ValidatorForm
          ref="form"
          onError={errors => errors}
          onSubmit={this.handleAdd}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="companyName"
                name="companyName"
                label="Company Name"
                fullWidth
                onChange={this.handleChange}
                value={this.state.companyName}
                placeholder="e.g. TCS"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="establishmentDate"
                name="establishmentDate"
                label="establishmentDate"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="establishment date..."
                onChange={this.handleChange}
                value={this.state.establishmentDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="companyWebsiteUrl"
                name="companyWebsiteUrl"
                label="company Website Url"
                fullWidth
                placeholder="company Website Url"
                onChange={this.handleChange}
                value={this.state.companyWebsiteUrl}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                id="Company Logo"
                name="profileImage"
                label="Company Logo"
                fullWidth
                placeholder="Company logo"
                onChange={this.handleChange}
                value={this.state.profileImage}
                validators={[
                  "required",
                  'matchRegexp:^(ftp|http|https)://[^ "]+$'
                ]}
                errorMessages={["url is required", "enter a valid URL"]}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                id="founder"
                name="founder"
                label="founder Name"
                fullWidth
                onChange={this.handleChange}
                value={this.state.founder}
                placeholder="e.g. Steve Jobs"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="foundersView"
                name="foundersView"
                label="founders View"
                fullWidth
                onChange={this.handleChange}
                value={this.state.foundersView}
                placeholder="founder.s view"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="aboutCompany"
                name="aboutCompany"
                label="about Company"
                fullWidth
                onChange={this.handleChange}
                value={this.state.aboutCompany}
                placeholder="about company"
              />
            </Grid>
            <Button variant="contained" size="medium" type="submit">
              ADD
            </Button>
          </Grid>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

function mapToProps({ employer }) {
  return { employer };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CompanyDetails))
);
CompanyDetails.propTypes = {
  classes: PropTypes.object.isRequired
};
