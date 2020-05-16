import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Axios from "axios";
import { Grid } from "@material-ui/core";
import FormDialog from "./popup";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(15)
  }
});

class ImgMediaCard extends React.Component {
  constructor() {
    super();
    this.state = {
      job: null
    };
  }
  componentDidMount() {
    let { slug } = this.props.match.params || "";
    Axios.get(`/api/v1/employers/jobs/${slug}`, {
      headers: { authorization: JSON.parse(localStorage.jobUser).token }
    })
      .then(res => {
        console.log("from single job", res);
        this.setState({ job: res.data.job });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    console.log("singlejob", this.state);
    let job = this.state.job;
    return this.state.job ? (
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {job.title}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {job.employer.company.companyName}
              </Typography>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={job.employer.company.companyLogo}
                title="Contemplative Reptile"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <FormDialog id={job._id} />
          </CardActions>
        </Card>
      </Grid>
    ) : (
      ""
    );
  }
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(ImgMediaCard))
);

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};
