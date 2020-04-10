import React from "react";
import { connect } from "react-redux";
import { getAuthUser } from "../../selectors/Selectors";
import { Redirect } from "react-router-dom";
import { onDoSignOut } from "../../actions/firebase";

const withAuthorization = () => (Component) => {
  class WithAuthorization extends React.Component {
    render() {
      console.log("Autorization", this.props.authUser);
      if (this.props.authUser) {
        return <Component {...this.props} />;
      } else {
        this.props.doSignOut();
        return <Redirect to="/signin" />;
      }
    }
  }

  const mapStateToProps = (state) => ({
    authUser: getAuthUser(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    doSignOut: () => dispatch(onDoSignOut()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthorization);
};

export default withAuthorization;
