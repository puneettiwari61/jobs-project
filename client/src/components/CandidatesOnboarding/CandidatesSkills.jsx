import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Skills from "./skillsData.json";
import { Button } from "@material-ui/core";
import { addCandidatesSkills } from "../../store/actions.js";
import Axios from "axios";

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
    console.log(skillsArray);
    this.props.dispatch(addCandidatesSkills({ skills: skillsArray }));
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Select
          // defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          name="skills"
          options={this.state.skillsData.map(a => {
            return {
              value: `${a.name}`,
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
      </>
    );
  }
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(withRouter(CandidatesSkills));
