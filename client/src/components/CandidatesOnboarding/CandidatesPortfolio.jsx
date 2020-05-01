import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";

import "./Portfolio.scss";
import { fetchOnMount } from "../../store/actions";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";




const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const styles = theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
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
    let { image, spokenLanguages, resume, github } =
      this.props.candidateData && this.props.candidateData;
    spokenLanguages = spokenLanguages.join();
    this.setState({ image, spokenLanguages, resume, github });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState !== this.props.isCandidateLogged  ) {
  //     this.props.dispatch(fetchOnMount());
  //   }
  // }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    Axios.post(
      "/api/v1/candidates/profile",
      { ...this.state },
      {
        headers: { authorization: JSON.parse(localStorage.jobUser).token }
      }
    )
      .then(res => {
        console.log(res, "portfolio successful");
        this.props.dispatch(fetchOnMount());
        this.props.history.push("/candidates/education");
      })
      .catch(err => console.log(err, "portfolio failed"));
  };

  render() {
		const { classes } = this.props;
    return (
      <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="image"
            name="image"
            label="Image"
            fullWidth
            // autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="spokenLanguages"
            name="spokenLanguages"
            label="Spoken Languages"
            fullWidth
            // autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="resume"
            name="resume"
            label="Resume"
            fullWidth
            // autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="github"
            name="github"
            label="Github"
            placeholder="your github username"
            fullWidth
            // autoComplete="billing address-line2"
          />
        </Grid>
        <Button variant="contained" size="medium">Save</Button> 
      </Grid>
      </React.Fragment>
      // <>
      //   <div className="login-box profile">
      //     <form>
      //       <h2>Your Profile</h2>
      //       {/* <div className="user-box">
      //         <input
      //           type="email"
      //           name="skills"
      //           required=""
      //           placeholder="e.g. JS,PHP"
      //           onChange={this.handleChange}
      //           value={this.state.skills}
      //         />
      //         <label>Skills</label>
      //       </div> */}
      //       <div className="user-box">
      //         <input
      //           type="url"
      //           name="image"
      //           required=""
      //           placeholder="url"
      //           onChange={this.handleChange}
      //           value={this.state.image}
      //         />
      //         <label>Image</label>
      //       </div>
      //       <div className="user-box">
      //         <input
      //           type="url"
      //           name="github"
      //           required=""
      //           placeholder="url"
      //           onChange={this.handleChange}
      //           value={this.state.github}
      //         />
      //         <label>Github</label>
      //       </div>
      //       <div className="user-box">
      //         <input
      //           type="text"
      //           name="spokenLanguages"
      //           required=""
      //           placeholder="e.g. English,Hindi"
      //           onChange={this.handleChange}
      //           value={this.state.spokenLanguages}
      //         />
      //         <label>Language</label>
      //       </div>
      //       <div className="user-box">
      //         <input
      //           type="text"
      //           name="resume"
      //           required=""
      //           placeholder="url"
      //           onChange={this.handleChange}
      //           value={this.state.resume}
      //         />
      //         <label>Resume</label>
      //       </div>

      //       <a onClick={this.handleSubmit}>
      //         <span></span>
      //         <span></span>
      //         <span></span>
      //         <span></span>
      //         Next
      //       </a>
      //     </form>
      //   </div>
      // </>
    );
  }
}

function mapToProps({ candidate }) {
  let { candidateData, isCandidateLogged } = candidate;
  return { candidateData, isCandidateLogged };
}

export default connect(mapToProps)(withRouter(withStyles(styles)(CandidatesPortfolio)));
CandidatesPortfolio.propTypes = {
	classes: PropTypes.object.isRequired,
};
