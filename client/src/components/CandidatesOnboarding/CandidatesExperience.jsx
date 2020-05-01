import React, { Component } from "react";
// import "./Portfolio.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateLoggedCandidate } from "../../store/actions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class CandidatesEducation extends Component {
  constructor() {
    super();
    this.state = {
      companyName: "",
      designation: "",
      location: "",
      description: "",
      joiningDate: "",
      leavingDate: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAdd = e => {
    console.log(this.state);
    Axios.post(
      "/api/v1/candidates/experience",
      { ...this.state },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "experience successful");
        this.setState({
          companyName: "",
          designation: "",
          location: "",
          description: "",
          joiningDate: "",
          leavingDate: ""
        });
        this.props.dispatch(
          updateLoggedCandidate({ currentCandidate: res.data.candidate })
        );
      })
      .catch(err => console.log(err, "experience failed"));
  };

  render() {
    return (
      <React.Fragment>
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
              required
              id="designation"
              name="designation"
              label="Designation"
              fullWidth
              onChange={this.handleChange}
              value={this.state.designation}
              placeholder="e.g. junior developer"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="location"
              name="location"
              label="Location"
              fullWidth
              placeholder="e.g. Delhi"
              onChange={this.handleChange}
              value={this.state.location}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              placeholder="about your work and rolw in the company.."
              onChange={this.handleChange}
              value={this.state.description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="joiningDate"
              name="joiningDate"
              label="Joining Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              placeholder="joining date..."
              onChange={this.handleChange}
              value={this.state.joiningDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="leavingDate"
              name="leavingDate"
              label="Leaving Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              placeholder="leaving date..."
              onChange={this.handleChange}
              value={this.state.leavingDate}
            />
          </Grid>
          <Button variant="contained" size="medium" onClick={this.handleAdd}>
            ADD
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapToProps({ candidate }) {
  let { candidateData, isCandidateLogged } = candidate;
  return { candidateData, isCandidateLogged };
}

export default connect(mapToProps)(withRouter(CandidatesEducation));

// return (
//   <>
//     <div className="login-box education">
//       <form>
//         <h2>Experience(If any)</h2>
//         <div className="user-box">
//           <input
//             type="text"
//             name="companyName"
//             required=""
//             onChange={this.handleChange}
//             value={this.state.companyName}
//             placeholder="e.g. TCS"
//           />
//           <label>Company</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             name="designation"
//             required=""
//             onChange={this.handleChange}
//             value={this.state.designation}
//             placeholder="e.g. junior developer"
//           />
//           <label>Designation</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             name="location"
//             required=""
//             placeholder="e.g. Delhi"
//             onChange={this.handleChange}
//             value={this.state.location}
//           />
//           <label>Location</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="text"
//             required=""
//             name="description"
//             placeholder="your role and work..."
//             onChange={this.handleChange}
//             value={this.state.description}
//           />
//           <label>Desciption</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="date"
//             name="joiningDate"
//             required=""
//             placeholder="joining date..."
//             onChange={this.handleChange}
//             value={this.state.joiningDate}
//           />
//           <label>Joining Date</label>
//         </div>
//         <div className="user-box">
//           <input
//             type="date"
//             name="leavingDate"
//             required=""
//             placeholder="year of passing"
//             placeholder="leaving date..."
//             onChange={this.handleChange}
//             value={this.state.leavingDate}
//           />
//           <label>Leaving Date</label>
//         </div>
//         <a onClick={this.handleAdd}>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           Add
//         </a>
//         <br />
//         <a onClick={this.handleBack}>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           Back
//         </a>
//         <a onClick={this.handleSubmit}>
//           <span></span>
//           <span></span>
//           <span></span>
//           <span></span>
//           Next
//         </a>
//       </form>
//     </div>
//   </>
// );
