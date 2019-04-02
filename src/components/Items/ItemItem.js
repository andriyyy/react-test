import React, { Component } from 'react';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';

class ItemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTitle: this.props.item.title,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.props.item.title,
    }));
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onView = (key) => {
    this.props.history.push(`detailed/${key}`)

  };

  render() {
    const { item, onRemoveItem } = this.props;
    const { editMode, editTitle } = this.state;

    return (
      <li>
      <img src = { item.pictureUrl } />
          <span>
            <strong>
              {item.user.username || item.user.userId}
            </strong>
            {item.title} {item.description} <Moment format='YYYY/MM/DD HH:mm:ss' >{ item.createdAt}</Moment> {item.editedAt && <span>(Edited)</span>}
          </span>
          <button
            type="button"
            onClick={() => onRemoveItem(item.uid)}
          >
            Delete
          </button>
          <button
            type="button"
             onClick={() => this.onView(item.uid)}
          >
            View
          </button>
      </li>

    );
  }
}

export default withRouter(ItemItem);