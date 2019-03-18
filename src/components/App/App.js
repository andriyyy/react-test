import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as ROUTES from '../../constants/routes';
import HomePage from '../Home';

class App extends Component {
  render() {
    return (

      <div className="App">
        <header className="App-header">
          <p>
            My test App
          </p>
          <Router>
            <div>
                  <Navigation />
                  <hr />
                  <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                  <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                  <Route path={ROUTES.HOME} component={HomePage} />
            </div>
                                  
          </Router>
        </header>

      </div>
    );
  }
}

export default App;
