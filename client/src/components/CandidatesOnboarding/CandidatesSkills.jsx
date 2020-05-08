import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Button, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import FaceIcon from "@material-ui/icons/Face";
import {
  addCandidatesSkills,
  deleteCandidatesSkills
} from "../../store/actions.js";
import Axios from "axios";

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
class CandidatesSkills extends Component {
  constructor() {
    super();
    this.state = {
      skills: null,
      skillsData: []
    };
  }

  componentDidMount() {
    Axios.get("/api/v1/candidates/skills", {
      headers: { authorization: JSON.parse(localStorage.jobUser).token }
    })
      .then(res => {
        console.log(res);
        this.setState({ skillsData: res.data.skills });
      })
      .catch(err => console.log(err));
  }

  handleAdd = e => {
    let skillsArray = this.state.skills.map(a => a.value);
    this.props.dispatch(addCandidatesSkills({ skills: skillsArray }));
  };

  handledelete = e => {
    this.props.dispatch(deleteCandidatesSkills(e));
  };

  render() {
    const { classes } = this.props;

    console.log(this.state);
    return (
      <>
        <Select
          // defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          name="skills"
          options={this.state.skillsData.map(a => {
            return {
              value: `${a._id}`,
              label: `${a.name}`
              // color: "#00B8D9",
              // isFixed: true
            };
          })}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={e => this.setState({ skills: e })}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={this.handleAdd}
          style={{ marginTop: "1rem" }}
        >
          ADD
        </Button>
        {console.log(
          this.props.candidate.currentCandidate.skills,
          "from skills "
        )}
        {this.props.candidate.currentCandidate.skills.map(a => {
          return (
            <Chip
              clickable
              icon={<FaceIcon />}
              onClick=""
              className={classes.chip}
              onDelete={() => this.handledelete(a._id)}
              label={a.name}
            />
          );
        })}
      </>
    );
  }
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(
  withRouter(withStyles(styles)(CandidatesSkills))
);
CandidatesSkills.propTypes = {
  classes: PropTypes.object.isRequired
};
