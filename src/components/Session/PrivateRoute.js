import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getAuthUser } from "../../selectors/Selectors";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authUser: getAuthUser(state),
});

export default connect(mapStateToProps, null)(PrivateRoute);
