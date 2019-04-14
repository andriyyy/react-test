import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';
import SearchPanel from '../SearchPanel';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Paper, withStyles, Select, Input, MenuItem, InputLabel } from '@material-ui/core';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
      sort: "",
      term: "",
      attendee: "",
      user: []
    };
  }

  onNextPage = () => {
    this.props.onSetItemsLimit(this.props.limit + 5);
  };

  componentDidMount() {
    if (!this.props.items.length) {
      this.setState({ loading: true });
    }
    this.setState({ loading: true });
    this.onListenForItems();
    this.setState({ loading: false });
  }

  onListenForItems = () => {
    this.props.firebase
      .items()
      .orderByChild('createdAt')
      .limitToLast(this.props.limit)
      .once('value').then(snapshot => {
        this.onListenForUsers(snapshot);
      })
  };

  onListenForUsers = (snap) => {
    this.props.firebase.users().once('value')
      .then(snapshot => {
        this.props.onSetUsers(snapshot.val());
        this.props.onSetItems(snap.val());
        this.setState({ loading: false });
      })

  }

  componentWillUnmount() {
    this.props.firebase.items().off();
    this.props.firebase.users().off();

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
    event.preventDefault();
    if (this.state.picture === "") {
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
            attendee: JSON.stringify(this.state.attendee),
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
          });

        this.setState({ title: '' });
        this.setState({ description: '' });
        this.setState({ pictureUrl: '' });
        this.setState({ picture: '' });

      },
      this.saveItemsToState,
    );
  };

  saveItemsToState = () => {
    this.props.firebase.items()
      .once('value')
      .then(snapshot => {
        this.props.onSetItems(snapshot.val());
        this.setState({ user: [] });
      });
  }

  onEditItem = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveItem = uid => {
    this.props.firebase.onRemoveItems(
      uid,
      this.saveItemsToState,
    );
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onSortChange = (sort) => {
    this.setState({ sort });
  };

  onAttendeeChange = event => {
    this.setState({ user: event.target.value });
    const attendee = [];
    for (var i = 0, l = event.target.value.length; i < l; i++) {
      attendee.push({ i: event.target.value[i] });
    }
    this.setState({ attendee });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.title.indexOf(term) > -1;
    });
  };

  sorting = (items, sort) => {
    switch (sort) {
      case '1': return items;
      case '2': return items.filter(item => item.userId === this.props.authUser.uid);
      default: return items;
    }
  };

  render() {
    const { classes } = this.props;
    const { users, items } = this.props;
    var usersMarged = {};
    Object.keys(users).map(function (key) {
      var keyTemp = users[key];
      return usersMarged[keyTemp.uid] = users[key];
    });
    const { title, description, loading, term, sort } = this.state;
    const visibleItems = this.sorting(this.search(items, term), sort);

    return (
      <main className={classes.main}>
        <Paper className={classes.padding} className={classes.paper}>
          <div>
            <Typography component="h1" variant="h5">
              Home Page
        </Typography>
            <p>
              The Home Page is accessible by every signed in user.
        </p>
            <SearchPanel
              onSearchChange={this.onSearchChange}
              onSortChange={this.onSortChange}
            />
            {loading && <div>Loading ...</div>}
            {items && (

              <ItemList
                items={visibleItems.map(item => ({
                  ...item,
                  user: usersMarged
                    ? usersMarged[item.userId]
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
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="user">Users:</InputLabel>
                <Select
                  multiple
                  value={this.state.user}
                  onChange={this.onAttendeeChange}
                  input={<Input id="user" />}
                >
                  {this.props.users.map(user => (
                    <MenuItem key={user.uid} value={user.uid}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl  className={classes.formControl}>
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                >Send
              </Button>
              </FormControl>
            </form>
          </div>
        </Paper>
      </main>
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
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key,
  })),
  limit: state.itemState.limit,
});

const mapDispatchToProps = dispatch => ({
  onSetItems: items => dispatch({ type: 'ITEMS_SET', items }),
  onSetItemsLimit: limit => dispatch({ type: 'ITEMS_LIMIT_SET', limit }),
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

export default withStyles(styles)(compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Items));