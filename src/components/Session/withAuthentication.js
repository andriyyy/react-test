import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../../services/Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          console.log("autentification", authUser);
          this.props.onSetAuthUser(authUser);
        },
        () => {
          this.props.onSetAuthUser(null);
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => {
      dispatch({ type: "AUTH_USER_SET", authUser });
    }
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps
    )
  )(WithAuthentication);
};

export default withAuthentication;
