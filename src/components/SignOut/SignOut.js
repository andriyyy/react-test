import React, { Component } from "react";
import { connect } from "react-redux";
import { onDoSignOut } from "../../actions/firebase";

import Button from "@material-ui/core/Button";

class SignOutButton extends Component {
  render() {
    return  <Button color="primary" onClick={this.props.doSignOut}>
      Sign Out
    </Button>;
  }
}
const mapDispatchToProps = dispatch => ({
  doSignOut: () => dispatch(onDoSignOut())
});

export default connect(
  null,
  mapDispatchToProps
)(SignOutButton);
