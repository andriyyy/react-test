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

// Selectors
function getUsers(state) {
  return state.userState.users;
}

const mapStateToProps = state => ({
  users: getUsers(state)
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
