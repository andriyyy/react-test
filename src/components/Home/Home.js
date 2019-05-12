import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withAuthorization } from "../Session";
import { withFirebase } from "../../services/Firebase";
import Items from "../Items";

class HomePage extends Component {
  componentDidMount() {
    this.props.firebase.users().on("value", snapshot => {
      this.props.onSetUsers(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
        <Items users={this.props.users} />
    );
  }
}

const mapStateToProps = state => ({
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

const condition = authUser => authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthorization(condition)
)(HomePage);
