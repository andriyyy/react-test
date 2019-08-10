import React from "react";
import { connect } from "react-redux";
import { getSignUpSubmitted, getRetriaved } from "../../selectors/Selectors";
import { onAuthUserListener } from "../../actions/firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      sessionRetrieved: true
    };

    componentDidMount() {
      this.listener = this.props.authUserListener();
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return this.props.onGetRetriaved && <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => {
      dispatch({ type: "AUTH_USER_SET", authUser });
    },
    authUserListener: () => dispatch(onAuthUserListener())
  });

  const mapStateToProps = state => ({
    signUpSubmitted: getSignUpSubmitted(state),
    onGetRetriaved: getRetriaved(state)
  });

  return (
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(WithAuthentication);

};

export default withAuthentication;
