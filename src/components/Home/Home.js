import React, { Component } from 'react';
import { compose } from 'recompose';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
      </div>
    );
  }
}

export default HomePage;