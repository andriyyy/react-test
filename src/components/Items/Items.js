import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import app from 'firebase/app';

import { withFirebase } from '../Firebase';
import ItemList from './ItemList';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      time: '',
      picture: '',
      pictureUrl: '',
      loading: false,
    };
  }

  onNextPage = () => {
    this.props.onSetItemsLimit(this.props.limit + 5);
  };

  componentDidMount() {
    if (!this.props.items.length) {
      this.setState({ loading: true });
    }

    this.onListenForItems();
  }

  onListenForItems = () => {
    this.props.firebase
      .items()
      .orderByChild('createdAt')
      .limitToLast(this.props.limit)
      .on('value', snapshot => {
        this.props.onSetItems(snapshot.val());
        this.setState({ loading: false });
      });
  };

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  componentDidUpdate(props) {
    if (props.limit !== this.props.limit) {
      this.onListenForItems();
    }
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onChangePicture = event => {
      this.setState({
        picture: event.target.files[0]
      });
 };

  onCreateItem = (event, authUser) => {
    if(this.state.picture === ""){ 
      event.preventDefault(); 
      return false; 
    }
      this.props.firebase.onSaveItems(
        this.state.picture,
        downloadURL => {
    
          this.props.firebase
            .items().push({
            userId: authUser.uid,
            title: this.state.title,
            description: this.state.description,
            pictureUrl: downloadURL,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
          });

    this.setState({ title: '' });
    this.setState({ description: '' });
    this.setState({ pictureUrl: '' });
    this.setState({ picture: '' });
    
        }
      );



    event.preventDefault();
  };

  onEditItem = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveItem = uid => {
    this.props.firebase.item(uid).remove();
  };


  render() {
    const { users, items } = this.props;
    const { title, description, loading } = this.state;

    return (
      <div>
        {!loading && items && (
          <button type="button" onClick={this.onNextPage}>
            More
          </button>
        )}

        {loading && <div>Loading ...</div>}

        {items && (
              <ItemList
                items={items.map(item => ({
                  ...item,
                  user: users
                    ? users[item.userId]
                    : { userId: item.userId },
                }))}
                onEditItem={this.onEditItem}
                onRemoveItem={this.onRemoveItem}
                
              />
        )}

        {!items && <div>There are no items ...</div>}
        <h4>Add event</h4>
        <form
          onSubmit={event =>
            this.onCreateItem(event, this.props.authUser)
          }
        >
        <FormControl margin="normal" required fullWidth>
          <TextField
            type="text"
            value={title}
            onChange={this.onChangeTitle}
            placeholder="Title"
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            type="text"
            value={description}
            onChange={this.onChangeDescription}
            placeholder="Description"
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <TextField
            type="file"
            onChange={this.onChangePicture}
          />
          </FormControl>
          <Button type="submit"
            variant="contained" 
            color="primary">Send
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  items: Object.keys(state.itemState.items || {}).map(
    key => ({
      ...state.itemState.items[key],
      uid: key,
    }),
  ),
  limit: state.itemState.limit,
});

const mapDispatchToProps = dispatch => ({
  onSetItems: items =>
    dispatch({ type: 'ITEMS_SET', items }),
  onSetItemsLimit: limit =>
    dispatch({ type: 'ITEMS_LIMIT_SET', limit }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Items);