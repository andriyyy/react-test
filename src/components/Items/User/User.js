import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { List, Paper, withStyles, ListItem, Typography } from '@material-ui/core';
import { withAuthorization } from '../../Session';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Link from "@material-ui/core/Link";
import { getId, getItems, getUsersKey } from "../../../selectors/Selectors";

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
      minWidth: 120,
      maxWidth: 450,
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
      user: '',
      itemsIds: ''
    };
  }

  componentDidMount() {
    const id = this.props.getId();
       this.props.firebase.users_enrolments_list(id).once("value")
    .then(snapshot => {
      let itemsIds = [];
      Object.keys(snapshot.val()).map(itemId => {
       return itemsIds.push(itemId);
      })
      this.setState({ itemsIds: itemsIds });
    });

    this.props.users.forEach(function (element) {
      if (id === element.uid) {
        this.setState({ user: element });
      }
    }.bind(this));
  }

  onRedirect = (event) => {
    event.preventDefault();
    this.props.history.goBack()
  };

  onView = id => {
    this.props.history.push(`/detailed/${id}`);
  };
  
  render() {
    const { uid, username, email } = this.state.user;
    const itemsF = [];
    const { classes } = this.props;
    const itemsC = [];   

    this.props.items.forEach(function (entry) {
      itemsF[entry.uid] = entry.title;
      if (uid === entry.userId) {
        var key = entry.uid;
        var value = entry.title;
         itemsC.push({key , value});
      }
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
              <ListItem ><b>User e-mail:&nbsp;</b> {email}</ListItem >
              <ListItem ><b>User assigned to events:&nbsp;</b>
              
              {this.state.itemsIds.length >0 && (
                <div>
                  {this.state.itemsIds.map(itemId => (
                    <Link
                      data-user-id={itemId}
                      onClick={() => this.onView(itemId)}
                      key={itemId}
                    >
                      {" "}{itemsF[itemId]}{" "}
                    </Link>
                  ))}
                </div>
              )}
              </ListItem >
              <ListItem ><b>User created events:&nbsp;</b>

              <div>
                  {itemsC.map(item => ( 
                    <Link
                      data-user-id={item.key}
                      onClick={() => this.onView(item.key)}
                      key={item.key}
                    >
                      {" "}{item.value}{" "}
                    </Link>
                  ))}
                </div>

              </ListItem >
            </List >
          </div>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = (state,ownProps) => (
  {
    getId: ()=>{ return getId(ownProps)},
    items: getItems(state),
    users: getUsersKey(state)
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