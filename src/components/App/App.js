import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { compose } from "recompose";
import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import * as ROUTES from "../../constants/routes";
import HomePage from "../Home";
import DetailedItem from "../Items/DetailedItem";
import User from "../Items/User";
import { withAuthentication } from "../Session";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Router>
              <div>
                <Navigation authUser={this.props.authUser} />
                <Switch>
                  <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                  <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                  <Route path={ROUTES.HOME} component={HomePage} />
                  <Route path={ROUTES.DETAILED_ITEM} component={DetailedItem} />
                  <Route path={ROUTES.USER} component={User} />
                </Switch>
              </div>
            </Router>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(withAuthentication(App));
