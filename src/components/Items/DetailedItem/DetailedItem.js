import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import Moment from "react-moment";
import {
  List,
  Paper,
  withStyles,
  ListItem,
  Typography,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Link from "@material-ui/core/Link";
import {
  getId,
  getAttendeesIds,
  getAttendeesHasErrored,
  getAttendeesIsLoading,
  getItem,
  getItems,
  getUsersKey,
  getAttendeeFormatted,
  getAuthUser,
} from "../../../selectors/Selectors";
import { attendeesIdsFetchData } from "../../../actions/users";
import {
  itemsOff,
  usersOff,
  usersEnrolmentsListOff,
  reject,
  notReject,
  updateItemsInState,
} from "../../../actions/firebase";

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
  image: {
    maxWidth: 250,
  },
  button: {
    marginRight: 8,
  },
});

class DetailedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  componentDidMount() {
    const id = this.props.getId();
    this.props.fetchAttendeesIds(id);
  }

  componentWillUnmount() {
    this.props.onItemsOff();
    this.props.onUsersOff();
    this.props.onUsersEnrolmentsListOff();
  }

  onRedirect = (event) => {
    event.preventDefault();
    this.props.history.push(`/home`);
  };

  onView = (id) => {
    this.props.history.push(`/user/${id}`);
  };

  onReject = (uid, iid) => {
    this.props.onReject(uid, iid, this.addActiveToState);
  };

  addActiveToState = () => {
    this.setState({ active: true });
    this.props.onDeleteAttendee();
  };

  onNotReject = (uid, iid) => {
    this.props.onNotReject(uid, iid, this.addNotActiveToState);
  };

  addNotActiveToState = () => {
    this.setState({ active: false });
    this.props.onAddAttendee();
  };

  render() {
    if (this.props.isAttendeesLoading === true) {
      return (
        <div>
          <p
            style={{ display: "block", margin: "0 auto" }}
            className="lds-dual-ring"
          />
        </div>
      );
    }
    if (this.props.isAttendeesErrored === true) {
      return <p>Can not load Attendees</p>;
    }
    const {
      title,
      description,
      pictureUrl,
      createdAt,
      userId,
    } = this.props.item;

    const { classes, attendeesIds } = this.props;
    const id = this.props.getId();
    return (
      <main className={classes.main}>
        <Paper className={classes.padding + " " + classes.paper}>
          <div>
            <IconButton onClick={this.onRedirect} aria-label="Info">
              <KeyboardBackspace />
            </IconButton>
            <span>back</span>
            <Typography component="h1" variant="h5">
              Event detailed info:
            </Typography>
            <List>
              <ListItem>
                <b>Event title: &nbsp;</b> {title}
              </ListItem>
              <ListItem>
                <b>Event Description:&nbsp;</b> {description}
              </ListItem>
              <ListItem>
                <b>Event Image:&nbsp;</b>
              </ListItem>
              <ListItem>
                <img
                  className={classes.image}
                  src={pictureUrl}
                  alt={description}
                />
              </ListItem>
              <ListItem>
                <b>Event created at:&nbsp; </b>{" "}
                <Moment format="YYYY/MM/DD HH:mm:ss">{createdAt}</Moment>
              </ListItem>
              <ListItem>
                <b>Event created by:&nbsp; </b>{" "}
                <Link
                  data-user-id={userId}
                  onClick={() => this.onView(userId)}
                  key={userId}
                >
                  {" "}
                  {this.props.attendeeFormatted[userId]}{" "}
                </Link>
              </ListItem>
              <ListItem>
                <b>Users assigned to event:&nbsp;</b>
              </ListItem>
              <ListItem>
                {attendeesIds.length > 0 && (
                  <div>
                    {attendeesIds.map((attenId) => (
                      <Link
                        data-user-id={attenId}
                        onClick={() => this.onView(attenId)}
                        key={attenId}
                      >
                        {" "}
                        {this.props.attendeeFormatted[attenId]}{" "}
                      </Link>
                    ))}
                  </div>
                )}
              </ListItem>
              {attendeesIds.includes(this.props.authUser.uid) && (
                <ListItem>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      this.onNotReject(this.props.authUser.uid, id)
                    }
                    disabled={!this.state.active}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.onReject(this.props.authUser.uid, id)}
                    disabled={this.state.active}
                  >
                    Reject
                  </Button>
                </ListItem>
              )}
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
  item: getItem(state, ownProps, getItems(state)),
  attendeeFormatted: getAttendeeFormatted(state, getUsersKey(state)),
  attendeesIds: getAttendeesIds(state),
  isAttendeesErrored: getAttendeesHasErrored(state),
  isAttendeesLoading: getAttendeesIsLoading(state),
  authUser: getAuthUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAttendeesIds: (id) => dispatch(attendeesIdsFetchData(id)),
  onItemsOff: () => dispatch(itemsOff()),
  onUsersOff: () => dispatch(usersOff()),
  onUsersEnrolmentsListOff: () => dispatch(usersEnrolmentsListOff()),
  onReject: (uid, iid, saveActiveToStateCallback) =>
    dispatch(reject(uid, iid, saveActiveToStateCallback)),
  onNotReject: (uid, iid, saveNotActiveToStateCallback) =>
    dispatch(notReject(uid, iid, saveNotActiveToStateCallback)),
  onDeleteAttendee: () => dispatch(updateItemsInState()),
  onAddAttendee: () => dispatch(updateItemsInState()),
});

export default withStyles(styles)(
  compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(DetailedItem)
);
