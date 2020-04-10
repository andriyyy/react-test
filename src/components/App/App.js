import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import * as ROUTES from "../../constants/routes";
import HomePage from "../Home";
import DetailedItem from "../Items/DetailedItem";
import User from "../Items/User";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import withAuthentication from "../Session/withAuthentication";
import PrivateRoute from "../Session/PrivateRoute";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route
              exact
              path={ROUTES.LANDING}
              render={() => <Redirect to={ROUTES.HOME} />}
            />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <PrivateRoute path={ROUTES.HOME} component={HomePage} />
            <PrivateRoute
              path={ROUTES.DETAILED_ITEM}
              component={DetailedItem}
            />
            <PrivateRoute path={ROUTES.USER} component={User} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
