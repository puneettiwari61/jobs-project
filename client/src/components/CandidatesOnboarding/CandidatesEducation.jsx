import React, { Component } from "react";
import "./Portfolio.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOnMount } from "../../store/actions";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Chip } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';


class CandidatesEducation extends Component {
  constructor() {
    super();
    this.state = {
      schoolOrCollege: "",
      classOrDegree: "",
      grade: "",
      branch: "",
      from: "",
      to: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = e => {
    console.log(this.state);
    Axios.post(
      "/api/v1/candidates/education",
      { ...this.state },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "education successful");
        this.props.dispatch(fetchOnMount());
        this.setState({
          schoolOrCollege: "",
          classOrDegree: "",
          grade: "",
          branch: "",
          from: "",
          to: ""
        });
      })
      .catch(err => console.log(err, "education failed"));
  };

  handleSubmit = () => {
    this.props.history.push("/candidates/experience");
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="schoolOrCollege"
            name="schoolOrCollege"
            label="School / College"
            fullWidth
            // autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="classOrDegree"
            name="classOrDegree"
            label="Class / Degree"
            fullWidth
            // autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id=" grade"
            name=" grade"
            label="Grade"
            fullWidth
            // autoComplete="billing address-line1"s
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="branch"
            name="branch"
            label="Branch"
            fullWidth
            // autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="from"
            name="from"
            label="From"
            fullWidth
            placeholder="year of starting"
            // autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="to"
            name="to"
            label="To"
            fullWidth
            placeholder="year of passing"
            // autoComplete="billing postal-code"
          />
        </Grid>
        <Button variant="contained" size="medium">ADD</Button>
        
      </Grid>
        {/* <div className="login-box education">
          <form>
            <h2>Education</h2>
            <div className="user-box">
              <input
                type="text"
                name="schoolOrCollege"
                required=""
                onChange={this.handleChange}
                value={this.state.schoolOrCollege}
                placeholder="School or College Name"
              />
              <label>School/College</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="classOrDegree"
                required=""
                onChange={this.handleChange}
                value={this.state.classOrDegree}
                placeholder="School or College Name"
              />
              <label>Class/Degree</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="grade"
                required=""
                placeholder="percentage, CGPA, or grade"
                onChange={this.handleChange}
                value={this.state.grade}
              />
              <label>Grade</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                required=""
                name="branch"
                onChange={this.handleChange}
                value={this.state.branch}
              />
              <label>Branch</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="from"
                required=""
                placeholder="year of starting"
                onChange={this.handleChange}
                value={this.state.from}
              />
              <label>From</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="to"
                required=""
                placeholder="year of passing"
                onChange={this.handleChange}
                value={this.state.to}
              />
              <label>To</label>
            </div>
            <a onClick={this.handleAdd}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add
            </a>
            <br />
            <a onClick={this.handleBack}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Back
            </a>
            <a onClick={this.handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Next
            </a>
          </form>
        </div> */}
      </React.Fragment>
    );
  }
}

function mapToProps({ candidate }) {
  let { candidateData, isCandidateLogged } = candidate;
  return { candidateData, isCandidateLogged };
}

export default connect(mapToProps)(withRouter(CandidatesEducation));
