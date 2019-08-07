import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../services/Firebase";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field, reduxForm } from "redux-form";
import { validate } from "../../validation/signUpValidation";
import renderTextField from "../Items/AddItem/Field";
import { signUpFormBaseFetchData } from "../../actions/forms";
import { getSignUpHasErrored } from "../../selectors/Selectors";

const styles = theme => ({
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
});

class SignUpFormBase extends Component {
  render() {
    const { classes, pristine, handleSubmit, submitting, isAuthUserErrored } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(submit)}>
            <FormControl margin="normal" required fullWidth>
              <Field
                data-field-name={"username"}
                name="username"
                autoComplete="username"
                component={renderTextField}
                label="Full Name"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                data-field-name={"email"}
                name="email"
                autoComplete="email"
                component={renderTextField}
                label="Email Address"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                data-field-name={"passwordOne"}
                name="passwordOne"
                autoComplete="passwordOne"
                type="password"
                component={renderTextField}
                label="Password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                data-field-name={"passwordTwo"}
                name="passwordTwo"
                autoComplete="passwordTwo"
                type="password"
                component={renderTextField}
                label="Confirm Password"
              />
            </FormControl>
            {isAuthUserErrored && (
              <div className="input-feedback">
                <p>{isAuthUserErrored}</p>
              </div>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
              disabled={pristine || submitting}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const submit = (values, dispatch, props) => {
  dispatch(signUpFormBaseFetchData(values, props));
};

const mapStateToProps = (state, ownProps) => ({
  isAuthUserErrored: getSignUpHasErrored(state)
});

export default withStyles(styles)(
  compose(
    withRouter,
    connect(
      mapStateToProps,
      null
    ),
    withFirebase,
    reduxForm({
      form: "SignUpFormBase",
      validate
    })
  )(SignUpFormBase)
);
