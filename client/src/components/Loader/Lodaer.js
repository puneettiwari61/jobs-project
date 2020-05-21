import React from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 300px auto;
  border-color: red;
`;

export default class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <HashLoader
          css={override}
          size={90}
          color={"#ec6953"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
