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
  Typography
} from "@material-ui/core";
import { withAuthorization } from "../../Session";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Link from "@material-ui/core/Link";

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
      width: 800,
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
    maxWidth: 700
  }
});

class DetailedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      open: false,
      attendeesIds: []
    };
  }

  componentDidMount() {

    this.setState({ open: false });
    let id = this.props.match.params.id;

    this.props.firebase.items_enrolments(id).once("value")
    .then(snapshot => {
      let attendeesIds = [];
      Object.keys(snapshot.val()).map(userId => {
       return attendeesIds.push(userId);
      })
      this.setState({ attendeesIds: attendeesIds });
    })

    this.props.items.forEach(
      function(element) {
        if (id === element.uid) {
          this.setState({ item: element });
        }
      }.bind(this)
    );
  }

  onRedirect = event => {
    event.preventDefault();
    this.props.history.push(`/home`);
  };

  onView = id => {
    this.props.history.push(`/user/${id}`);
  };

  render() {
    const {
      title,
      description,
      pictureUrl,
      createdAt,
      attendee
    } = this.state.item;

    const attendeeF = [];
    const { classes } = this.props;
    this.props.users.forEach(function(entry) {
      attendeeF[entry.uid] = entry.username;
    });

    return (
      <main className={classes.main}>
        <Paper className={classes.padding + " " + classes.paper}>
          <div>
            <IconButton onClick={this.onRedirect} aria-label="Info">
              <KeyboardBackspace />
            </IconButton>
            <span>back</span>
            <Typography component="h1" variant="h5">
              Detailed info:
            </Typography>
            <List>
              <ListItem>
                <b>Title: &nbsp;</b> {title}
              </ListItem>
              <ListItem>
                <b>Description:&nbsp;</b> {description}
              </ListItem>
              <ListItem>
                <b>Image:&nbsp;</b>
              </ListItem>
              <ListItem>
                <img
                  className={classes.image}
                  src={pictureUrl}
                  alt={description}
                />
              </ListItem>
              <ListItem>
                <b>Created at:&nbsp; </b>{" "}
                <Moment format="YYYY/MM/DD HH:mm:ss">{createdAt}</Moment>
              </ListItem>
              <ListItem>
                <b>Users:&nbsp;</b>
              </ListItem>
              {this.state.attendeesIds.length >0 && (
                <div>
                  {this.state.attendeesIds.map(attenId => (
                    <Link
                      data-user-id={attenId}
                      onClick={() => this.onView(attenId)}
                      key={attenId}
                    >
                      {" "}{attendeeF[attenId]}{" "}
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

const mapStateToProps = state => ({
  items: Object.keys(state.itemState.items || {}).map(key => ({
    ...state.itemState.items[key],
    uid: key
  })),
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key
  }))
});

const condition = authUser => authUser;

export default withStyles(styles)(
  compose(
    withRouter,
    connect(
      mapStateToProps,
      null
    ),
    withAuthorization(condition)
  )(DetailedItem)
);
