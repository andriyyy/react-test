import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field, reduxForm } from "redux-form";
import { validate } from "../../validation/signInValidation";
import renderTextField from "../Items/AddItem/Field";
import { signInFormBaseFetchData } from "../../actions/forms";
import { getAuthUserHasErrored } from "../../selectors/Selectors";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
});

class SignInFormBase extends Component {
  render() {
    const {
      classes,
      pristine,
      handleSubmit,
      submitting,
      isAuthUserErrored,
    } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(submit)} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <Field
                data-field-name={"email"}
                label="Email Address"
                autoComplete="email"
                component={renderTextField}
                name="email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                data-field-name={"password"}
                label="Password"
                name="password"
                autoComplete="password"
                type="password"
                component={renderTextField}
              />
            </FormControl>
            {isAuthUserErrored && (
              <div className="input-feedback">
                <p>Can not Sign In</p>
              </div>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
              disabled={pristine || submitting}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const submit = (values, dispatch, props) => {
  dispatch(
    signInFormBaseFetchData(values, () => {
      props.history.push(ROUTES.HOME);
    })
  );
};

const mapStateToProps = (state, ownProps) => ({
  isAuthUserErrored: getAuthUserHasErrored(state),
});

export default withStyles(styles)(
  compose(
    connect(mapStateToProps, null),
    reduxForm({
      form: "SignInFormBase",
      validate,
    })
  )(SignInFormBase)
);
