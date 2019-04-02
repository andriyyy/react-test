import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';

class DetailedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ''
   };

  }
  componentDidMount() {
    this.props.firebase.item(this.props.match.params.id).on('value', snapshot => {
       this.setState( {item: snapshot.val()} );
       console.log(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  render() {
      const { title, description, pictureUrl } = this.state.item;
    return (
      <div>
      <ul>
          <li>{ title }</li>
          <li>{ description }</li>
          <li><img src={ pictureUrl } /></li>
          
      </ul>
       </div>
    );
  }
}


export default compose(
  withFirebase,
)(DetailedItem);