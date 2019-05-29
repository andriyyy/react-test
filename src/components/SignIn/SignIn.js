import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../services/Firebase";
import * as ROUTES from "../../constants/routes";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme =>
  console.log(theme) || {
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
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
    }
  };

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(()=>{
        this.props.firebase.onAuthUserListener(
          authUser => {
            this.props.onSetAuthUser(authUser);
          },
          () => {
            localStorage.removeItem("authUser");
          }
        );
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.onSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                autoComplete="password"
                autoFocus
                value={password}
                onChange={this.onChange}
                type="password"
              />
            </FormControl>
            <Button
              disabled={isInvalid}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </Paper>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser => {
    dispatch({ type: "AUTH_USER_SET", authUser });
  }
});

const SignInForm = withStyles(styles)(
  compose(
    withRouter,
    withFirebase,
    connect(
      null,
      mapDispatchToProps
    )
  )(SignInFormBase)
);

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

export default SignInPage;

export { SignInForm };
