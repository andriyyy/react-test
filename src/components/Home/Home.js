import React, { Component } from "react";
import { withAuthorization } from "../Session";
import Items from "../Items";

class HomePage extends Component {

  render() {
    return (
      <div>
          <Items />
      </div>
    );
  }
}

const condition = authUser => authUser;
export default (
  withAuthorization(condition)
)(HomePage);
