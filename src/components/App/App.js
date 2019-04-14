import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import './App.css';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as ROUTES from '../../constants/routes';
import HomePage from '../Home';
import DetailedItem from '../Items/DetailedItem';
import { withAuthentication } from '../Session';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Router>
              <div>
                <Navigation />
                <Switch>
                  <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                  <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                  <Route path={ROUTES.HOME} component={HomePage} />
                  <Route path={ROUTES.DETAILED_ITEM} component={DetailedItem} />
                </Switch>
              </div>
            </Router>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
