import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { List, Paper, withStyles, ListItem, Typography } from '@material-ui/core';
import { withAuthorization } from '../../Session';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';

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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.users.forEach(function (element) {
      console.log("element", element);
      if (id === element.uid) {
        this.setState({ user: element });
      }
    }.bind(this));
  }

  onRedirect = (event) => {
    event.preventDefault();
    this.props.history.goBack()
  };

  render() {
    const { uid, username, email } = this.state.user;
    const attendeeF = [];
    const { classes } = this.props;
    this.props.users.forEach(function (entry) {
      attendeeF[entry.uid] = entry.username;
    });

    return (
      <main className={classes.main}>
        <Paper className={classes.padding + ' ' + classes.paper}>
          <div>
            <IconButton onClick={this.onRedirect} aria-label="Info">
              <KeyboardBackspace />
            </IconButton>
            <span >back</span>
            <Typography component="h1" variant="h5">
              User detailed info:
            </Typography>
            <List >
              <ListItem ><b>User id: &nbsp;</b> {uid}</ListItem >
              <ListItem ><b>User name:&nbsp;</b> {username}</ListItem >
              <ListItem ><b>E-mail:&nbsp;</b> {email}</ListItem >
            </List >
          </div>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = state => (
  {
    users: Object.keys(state.userState.users || {}).map(key => ({
      ...state.userState.users[key],
      uid: key,
    })),
  });

const condition = authUser => authUser;

export default withStyles(styles)(compose(
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
  withAuthorization(condition)
)(User));