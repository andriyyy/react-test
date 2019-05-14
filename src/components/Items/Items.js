import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../../services/Firebase";
import ItemList from "./ItemList";
import SearchPanel from "../SearchPanel";
import AddItem from "./AddItem";
import { Typography, Paper, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit * 2
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth:0
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 0
  },
  pop_up: {
    minWidth: 300
  }
});

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      time: "",
      picture: "",
      pictureUrl: "",
      loading: false,
      sort: "",
      term: "",
      attendee: "",
      user: [],
      open: false,
      removeId: ""
    };
  }

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
      .orderByChild("createdAt")
      .once("value")
      .then(snapshot => {
        this.onListenForUsers(snapshot);
      });
  };

  onListenForUsers = snap => {
    this.props.firebase
      .users()
      .once("value")
      .then(snapshot => {
        this.props.onSetUsers(snapshot.val());
        this.props.onSetItems(snap.val());
        this.setState({ loading: false });
      });
  };

  componentWillUnmount() {
    this.props.firebase.items().off();
    this.props.firebase.users().off();
  }

  componentDidUpdate(props) {
    if (props.limit !== this.props.limit) {
      this.onListenForItems();
    }
  }

  saveItemsToState = () => {
    this.props.firebase
      .items()
      .once("value")
      .then(snapshot => {
        this.props.onSetItems(snapshot.val());
        this.setState({ user: [] });
      });
  };

  onEditItem = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  onRemoveItem = uid => {
    this.setState({ removeId: uid });
    this.handleClickOpen();
  };

  onSearchChange = term => {
    this.setState({ term });
  };

  onSortChange = sort => {
    this.setState({ sort });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.title.indexOf(term) > -1;
    });
  };

  sorting = (items, sort) => {
    switch (sort) {
      case "1":
        return items;
      case "2":
        return items.filter(item => item.userId === this.props.authUser.uid);
      default:
        return items;
    }
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeItem = () => {
    this.props.firebase.onRemoveItems(this.state.removeId, this.saveItemsToState);
    this.handleClose();
  };
  
  render() {
    const { classes } = this.props;
    const { users, items } = this.props;
    var usersMarged = {};
    Object.keys(users).map(function(key) {
      var keyTemp = users[key];
      return (usersMarged[keyTemp.uid] = users[key]);
    });
    const { loading, term, sort } = this.state;
    const visibleItems = this.sorting(this.search(items, term), sort);

    return (
      <main className={classes.main}>
        <Paper
          className={classes.root + " " + classes.padding + " " + classes.paper}
        >
          <div>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.pop_up} id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.removeItem} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
            <Typography component="h1" variant="h5">
              Home Page
            </Typography>
            <p>The Home Page is accessible by every signed in user.</p>
            <SearchPanel
              onSearchChange={this.onSearchChange}
              onSortChange={this.onSortChange}
            />
            {loading && <div>Loading ...</div>}
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell align="left">User</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Created at</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items && (
                  <ItemList
                    items={visibleItems.map(item => ({
                      ...item,
                      user: usersMarged
                        ? usersMarged[item.userId]
                        : { userId: item.userId }
                    }))}
                    onEditItem={this.onEditItem}
                    onRemoveItem={this.onRemoveItem}
                  />
                )}
              </TableBody>
            </Table>
            {!items && <div>There are no items ...</div>}
            <AddItem />
          </div>
        </Paper>
      </main>
    );
  }
}

// Selectors
function getAuthUser(state) {
    return state.sessionState.authUser
}
function getItems(state) {
  return Object.keys(state.itemState.items || {}).map(key => ( { 
    ...state.itemState.items[key],
    uid: key
  }))
}
function getUsers(state) {
  return Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key
  }))
}

const mapStateToProps = state => ({
  authUser: getAuthUser(state),
  items: getItems(state),
  users: getUsers(state)
});

const mapDispatchToProps = dispatch => ({
  onSetItems: items => dispatch({ type: "ITEMS_SET", items }),
  onSetItemsLimit: limit => dispatch({ type: "ITEMS_LIMIT_SET", limit }),
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default withStyles(styles)(
  compose(
    withFirebase,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Items)
);
