import React from "react";

import { withFirebase } from "../../services/Firebase";
import Button from "@material-ui/core/Button";


const SignOutButton = ({ firebase }) => (
  <Button color="primary" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
