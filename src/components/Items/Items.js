import React, { Component } from "react";
import { connect } from "react-redux";
import ItemList from "./ItemList";
import SearchPanel from "../SearchPanel";
import AddItem from "./AddItem";
import { Typography, Paper, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  getAuthUser,
  getItems,
  getUsersKey,
  getUsersHasErrored,
  getUsersIsLoading,
  getItemsHasErrored,
  getItemsIsLoading,
  getUsersMarged,
  getItemsEnrolmentsAllIsLoading,
} from "../../selectors/Selectors";
import moment from "moment";

import {
  itemsOff,
  usersOff,
  removeItems,
  updateItemsInState,
} from "../../actions/firebase";

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit * 2,
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 0,
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 0,
  },
  pop_up: {
    minWidth: 300,
  },
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
      removeId: "",
    };
  }

  componentWillUnmount() {
    this.props.onItemsOff();
    this.props.onUsersOff();
  }

  deleteItemFromStateCallback = () => {
    this.props.onDeleteItem(this.state.removeId);
  };

  onRemoveItem = (uid) => {
    this.setState({ removeId: uid });
    this.handleClickOpen();
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onSortChange = (sort) => {
    this.setState({ sort });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return (
        item.title.indexOf(term) > -1 ||
        item.description.indexOf(term) > -1 ||
        this.props.usersMarged[item.userId].username.indexOf(term) > -1 ||
        moment(item.createdAt).format("YYYY/MM/DD HH:mm:ss").indexOf(term) > -1
      );
    });
  };

  sorting = (items, sort) => {
    switch (sort) {
      case "1":
        return items;
      case "2":
        return items.filter((item) => item.userId === this.props.authUser.uid);
      case "3":
        return items.filter((item) =>
          item.attendees.hasOwnProperty(this.props.authUser.uid)
        );
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
    this.props.onRemoveItems(
      this.state.removeId,
      this.deleteItemFromStateCallback
    );
    this.handleClose();
  };

  render() {
    if (
      this.props.isUsersLoading === true ||
      this.props.isItemsLoading === true ||
      this.props.isItemsEnrolmentsAllLoading === true
    ) {
      return (
        <div>
          <p
            style={{ display: "block", margin: "0 auto" }}
            className="lds-dual-ring"
          />
        </div>
      );
    }
    if (this.props.isUsersErrored === true) {
      return <p>Can not load Users</p>;
    }
    if (this.props.isItemsErrored === true) {
      return <p>Can not load Events</p>;
    }

    const { classes, items, usersMarged } = this.props;
    const { term, sort } = this.state;

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
              <DialogTitle className={classes.pop_up} id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
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
                    items={visibleItems.map((item) => ({
                      ...item,
                      user: usersMarged
                        ? usersMarged[item.userId]
                        : { userId: item.userId },
                    }))}
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

const mapStateToProps = (state) => ({
  authUser: getAuthUser(state),
  items: getItems(state),
  users: getUsersKey(state),
  usersMarged: getUsersMarged(state),
  isUsersLoading: getUsersIsLoading(state),
  isItemsLoading: getItemsIsLoading(state),
  isItemsEnrolmentsAllLoading: getItemsEnrolmentsAllIsLoading(state),
  isUsersErrored: getUsersHasErrored(state),
  isItemsErrored: getItemsHasErrored(state),
});

const mapDispatchToProps = (dispatch) => ({
  onItemsOff: () => dispatch(itemsOff()),
  onUsersOff: () => dispatch(usersOff()),
  onDeleteItem: () => dispatch(updateItemsInState()),
  onRemoveItems: (removeId, saveItemsToStateCallback) =>
    dispatch(removeItems(removeId, saveItemsToStateCallback)),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Items)
);
