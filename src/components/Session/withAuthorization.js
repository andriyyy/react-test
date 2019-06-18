import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../../services/Firebase";
import { getAuthUser } from "../../selectors/Selectors";
import { Redirect } from 'react-router'

const withAuthorization = condition => Component => {

  class WithAuthorization extends React.Component {

    render() {
      
    console.log("Autorization9", this.props.authUser) ;
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : <Redirect to="/signin"/>;
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
