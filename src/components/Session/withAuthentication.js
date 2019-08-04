import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../../services/Firebase";
import { getSignUpSubmitted } from "../../selectors/Selectors";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      sessionRetrieved: true
    };

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          console.log("autentification", authUser);
          if (this.props.signUpSubmitted === false) {
            this.props.onSetAuthUser(authUser);
          }
          this.setState({
            sessionRetrieved: true
          });
        },
        () => {
          console.log("bad_autentification");
          this.props.onSetAuthUser(null);
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return this.state.sessionRetrieved && <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => {
      dispatch({ type: "AUTH_USER_SET", authUser });
    }
  });
  const mapStateToProps = state => ({
    signUpSubmitted: getSignUpSubmitted(state)
  });
  return compose(
    withFirebase,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(WithAuthentication);
};

export default withAuthentication;
