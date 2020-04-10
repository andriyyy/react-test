import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import {
  List,
  Paper,
  withStyles,
  ListItem,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Link from "@material-ui/core/Link";
import {
  getId,
  getItems,
  getUsersKey,
  getItemsIds,
  getItemsIdsHasErrored,
  getItemsIdsIsLoading,
  getUser,
  getSortedItems,
} from "../../../selectors/Selectors";
import { itemsIdsFetchData } from "../../../actions/items";
import { itemsOff } from "../../../actions/firebase";

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit,
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      minWidth: 120,
      maxWidth: 450,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    maxWidth: 300,
  },
});

class User extends Component {
  componentDidMount() {
    const id = this.props.getId();
    this.props.fetchItemsIds(id);
  }

  componentWillUnmount() {
    this.props.onItemsOff();
  }

  onRedirect = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };

  onView = (id) => {
    this.props.history.push(`/detailed/${id}`);
  };

  render() {
    if (this.props.isItemsIdsLoading === true) {
      return (
        <div>
          <p
            style={{ display: "block", margin: "0 auto" }}
            className="lds-dual-ring"
          />
        </div>
      );
    }
    if (this.props.isItemsIdsErrored === true) {
      return <p>Can not load Items</p>;
    }
    const { uid, username, email } = this.props.user;
    const { classes, itemsIds, sortedItems } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.padding + " " + classes.paper}>
          <div>
            <IconButton onClick={this.onRedirect} aria-label="Info">
              <KeyboardBackspace />
            </IconButton>
            <span>back</span>
            <Typography component="h1" variant="h5">
              User detailed info:
            </Typography>
            <List>
              <ListItem>
                <b>User id: &nbsp;</b> {uid}
              </ListItem>
              <ListItem>
                <b>User name:&nbsp;</b> {username}
              </ListItem>
              <ListItem>
                <b>User e-mail:&nbsp;</b> {email}
              </ListItem>
              <ListItem>
                <b>User assigned to events:&nbsp;</b>

                {itemsIds.length > 0 && (
                  <div>
                    {itemsIds.map((itemId) => (
                      <Link
                        data-user-id={itemId}
                        onClick={() => this.onView(itemId)}
                        key={itemId}
                      >
                        {" "}
                        {sortedItems.itemsTemporary[itemId]}{" "}
                      </Link>
                    ))}
                  </div>
                )}
              </ListItem>
              <ListItem>
                <b>User created events:&nbsp;</b>
                <div>
                  {sortedItems.itemsResult.map((item) => (
                    <Link
                      data-user-id={item.key}
                      onClick={() => this.onView(item.key)}
                      key={item.key}
                    >
                      {" "}
                      {item.value}{" "}
                    </Link>
                  ))}
                </div>
              </ListItem>
            </List>
          </div>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  getId: () => {
    return getId(ownProps);
  },
  items: getItems(state),
  users: getUsersKey(state),
  itemsIds: getItemsIds(state),
  isItemsIdsErrored: getItemsIdsHasErrored(state),
  isItemsIdsLoading: getItemsIdsIsLoading(state),
  user: getUser(state, ownProps, getUsersKey(state)),
  sortedItems: getSortedItems(
    state,
    getItems(state),
    getUser(state, ownProps, getUsersKey(state))
  ),
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemsIds: (id) => dispatch(itemsIdsFetchData(id)),
  onItemsOff: () => dispatch(itemsOff()),
});

export default withStyles(styles)(
  compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(User)
);
