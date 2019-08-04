import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../../services/Firebase";
import { getAuthUser } from "../../selectors/Selectors";
import { Redirect } from "react-router-dom";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    render() {
      console.log("Autorization", this.props.authUser);
      if (condition(this.props.authUser)) {
        return <Component {...this.props} />;
      } else {
        this.props.firebase.doSignOut();
        return <Redirect to="/signin" />;
      }
    }
  }

  const mapStateToProps = state => ({
    authUser: getAuthUser(state)
  });

  return compose(
    withFirebase,
    withRouter,
    withFirebase,
    connect(
      mapStateToProps,
      null
    )
  )(WithAuthorization);
};

export default withAuthorization;
