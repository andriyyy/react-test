import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withStyles } from "@material-ui/core/styles";
import SignOutButton from "../SignOut";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
});

const Navigation = props => {
  const { classes, authUser } = props;
  return (
    <div>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Event managment system
          </Typography>
          {authUser ? (
            <SignOutButton />
          ) : (
            <div>
              <Button
                color="primary"
                variant="outlined"
                component={Link}
                to={ROUTES.SIGN_IN}
              >
                Sign In
              </Button>
              <Button color="primary" component={Link} to={ROUTES.SIGN_UP}>
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navigation);
