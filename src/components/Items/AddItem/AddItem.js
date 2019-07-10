import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../../../services/Firebase";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getUsersKey, getAuthUser,  getOpenPopUp } from "../../../selectors/Selectors";
import { Field, reduxForm } from "redux-form";
import renderTextField from './Field';
import renderUploadField from './Upload';
import renderSelectFieldNew from './SelectNew';
import { validate } from "../../../validation/Validation";
import { addItemFetchData, addOpenPopUp } from '../../../actions/forms';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class AddItem extends Component {

  handleClickOpen = () => {
       this.props.onOpenPopUp(true);
  };

  handleClose = () => {
       this.props.onOpenPopUp(false);
  };

  render() {
    const { classes, pristine, handleSubmit, submitting, valid } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          onClick={this.handleClickOpen}
        >
          Add event
        </Button>
        <Dialog
          open={this.props.openPopUp}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(submit)}  >
            <DialogTitle id="form-dialog-title"> Add event</DialogTitle>
            <DialogContent>
                <FormControl margin="normal" required fullWidth>
                  <Field
                    name="title"
                    component={renderTextField}
                    label="Title"
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <Field
                    name="description"
                    component={renderTextField}
                    label="Description"
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <Field
                    name="image"
                    component={renderUploadField}
                    label="image"
                    type="file"
                  />
                </FormControl>
                  <Field
                    name = "user"
                    component = {renderSelectFieldNew}
                    classes = {classes}
                  >
                    {this.props.users.map(user => (
                      <MenuItem key={user.uid} value={user.uid}>
                        {user.username}
                      </MenuItem>
                    ))}
                    </Field>
            </DialogContent>
            <DialogActions>
              <Button type="submit" disabled={pristine || submitting || !valid}  color="primary">
                Send
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const submit = (values, dispatch, props) => {
   props.onOpenPopUp(false);
   props.onSubmitForm(values, props);
};

const mapStateToProps = state => ({
  authUser: getAuthUser(state),
  users: getUsersKey(state),
  openPopUp: getOpenPopUp(state)
});

const mapDispatchToProps = dispatch => ({
  onOpenPopUp: (bool) => dispatch(addOpenPopUp(bool)),
  onSubmitForm: (values, props) => dispatch(addItemFetchData(values, props))
});


export default withStyles(styles)(
  compose(
    withFirebase,
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    reduxForm({
      form: 'AddItem',
       initialValues: {
            user: []
        },
      validate
    })
  )(AddItem)
);
