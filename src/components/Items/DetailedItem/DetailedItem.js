import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import Moment from "react-moment";
import { withFirebase } from "../../../services/Firebase";
import {
  List,
  Paper,
  withStyles,
  ListItem,
  Typography
} from "@material-ui/core";
import { withAuthorization } from "../../Session";
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
  getAttendeeFormatted
} from "../../../selectors/Selectors";
import { attendeesIdsFetchData } from "../../../actions/users";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
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
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  image: {
    maxWidth: 250
  }
});

class DetailedItem extends Component {
  componentDidMount() {
    const id = this.props.getId();
    this.props.fetchAttendeesIds(this.props.firebase, id);
  }
  componentWillUnmount() {
    this.props.firebase.items().off();
    this.props.firebase.users().off();
    this.props.firebase.users_enrolments_list().off();
  }
  onRedirect = event => {
    event.preventDefault();
    this.props.history.push(`/home`);
  };

  onView = id => {
    this.props.history.push(`/user/${id}`);
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
      userId
    } = this.props.item;

    const { classes, attendeesIds } = this.props;
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
              {attendeesIds.length > 0 && (
                <div>
                  {attendeesIds.map(attenId => (
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
  isAttendeesLoading: getAttendeesIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAttendeesIds: (firebase, id) =>
    dispatch(attendeesIdsFetchData(firebase, id))
});

const condition = authUser => authUser;

export default withStyles(styles)(
  compose(
    withFirebase,
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    withAuthorization(condition)
  )(DetailedItem)
);
