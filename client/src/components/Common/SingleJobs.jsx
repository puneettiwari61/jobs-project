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

const styles = theme => ({
  root: {
    marginTop: theme.spacing(15)
  }
});

class SingleJobs extends React.Component {
  constructor() {
    super();
    this.state = {
      job: null
    };
  }
  componentDidMount() {
    let { slug } = this.props.match.params || "";
    Axios.get(`/api/v1/employers/jobs/${slug}`)
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
      <Grid
        item
        xs={12}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          background:
            "url('https://image.freepik.com/free-vector/background-white-elegant-texture_23-2148438404.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Card className={classes.root} style={{ height: "50%" }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {job.title}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {job.employer.company.companyName}
              </Typography>

              <Typography gutterBottom variant="h5" component="h2">
                {job.isRemote}
              </Typography>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198__340.jpg"
                title="Contemplative Reptile"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {job.description}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {job.currency == "dollars"
                  ? "$" + job.salary
                  : job.currency == "rupees" + job.salary
                  ? "₹"
                  : "€" + job.salary}
              </Typography>
            </CardContent>
          </CardActionArea>
          <span>Please Login to Apply</span>
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

export default connect(mapToProps)(withRouter(withStyles(styles)(SingleJobs)));

SingleJobs.propTypes = {
  classes: PropTypes.object.isRequired
};
