import React from "react";
import { connect } from "react-redux";
import { getSignUpSubmitted, getRetriaved } from "../../selectors/Selectors";
import { onAuthUserListener } from "../../actions/firebase";

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = {
      sessionRetrieved: true,
    };

    componentDidMount() {
      this.listener = this.props.authUserListener();
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      console.log("this.props.onGetRetriaved", this.props.onGetRetriaved);
      return (
        this.props.onGetRetriaved !== null && <Component {...this.props} />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    authUserListener: () => dispatch(onAuthUserListener()),
  });

  const mapStateToProps = (state) => ({
    signUpSubmitted: getSignUpSubmitted(state),
    onGetRetriaved: getRetriaved(state),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
