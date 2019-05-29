import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../../services/Firebase";
import { getAuthUser } from "../../selectors/Selectors";

const withAuthorization = condition => Component => {

  class WithAuthorization extends React.Component {
    render() {
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: getAuthUser(state) 
  });
  
  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => {
      dispatch({ type: "AUTH_USER_SET", authUser });
    }
  });

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
  )(WithAuthorization);
};

export default withAuthorization;
