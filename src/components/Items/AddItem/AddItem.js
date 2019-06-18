import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../../../services/Firebase";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Select, Input, MenuItem, InputLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getUsersKey, getAuthUser } from "../../../selectors/Selectors";
import { Field, reduxForm } from "redux-form";
import renderTextField from './Field';
import renderUploadField from './Upload';
import renderSelectField from './Select';
import renderSelectFieldNew from './SelectNew';
import { validate } from "../../../validation/Validation";


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
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      picture: "uuu",
      pictureUrl: "",
      attendee: "",
      user: [],
      open: false
    };
  }

  componentDidMount() {
    this.setState({ open: false });
  }

  onChangeTitle = event => {
    console.log("fff",event.target.value );
    this.setState({ title: event.target.value });
    console.log("state", this.state.title );
  };

  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onChangePicture = event => {

    this.setState({
      picture: event.target.files[0]
    });
  };

  onCreateItem = (event, authUser) => {
    event.preventDefault();
    if (this.state.picture === "") {
      event.preventDefault();
      return false;
    }

    this.props.firebase.onSaveItems(
      this.state.picture,
      downloadURL => {
        const lastKey = this.props.firebase.items().push({
          userId: authUser.uid,
          title: this.state.title,
          description: this.state.description,
          pictureUrl: downloadURL,
          attendee: JSON.stringify(this.state.attendee),
          createdAt: this.props.firebase.serverValue.TIMESTAMP
        }).key;
        this.state.attendee.map(item => {
          let updates = {
            [`items_enrolments/${lastKey}/${item.i}`]: true,
            [`users_enrolments/${item.i}/${lastKey}`]: true
          }
          return this.props.firebase.update(updates);
        });

        this.setState({ title: "", description: "", pictureUrl: "", picture: ""  });
      },
      this.saveItemsToState
    );
  };

  saveItemsToState = () => {
    this.props.firebase
      .items()
      .once("value")
      .then(snapshot => {
        this.props.onSetItems(snapshot.val());
        this.setState({ user: [] });
      });
  };

  onAttendeeChange = event => {
    this.setState({ user: event.target.value });
    const attendee = [];
    for (var i = 0, l = event.target.value.length; i < l; i++) {
      attendee.push({ i: event.target.value[i] });
    }
    this.setState({ attendee });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { pristine, handleSubmit, submitting} = this.props;
    
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
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit}>
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

            <div>
                <Field 
                style={{ height: '100px' }} 
                name="favoriteColor" 
                component={renderSelectField}
                type="select-multiple"
                multiple>
                  <option value="">Select a color...</option>
                          {this.props.users.map(user => (
                            <option key={user.uid} value={user.uid}>
                              {user.username}
                            </option>

                  ))}
                </Field>
            </div>

            <div>
                <Field 
                style={{ height: '100px' }} 
                name="favoriteColor" 
                component="select"
                type="select-multiple"
                 multiple>
                        <option value="">Select a color...</option>
                                {this.props.users.map(user => (
                                  <option key={user.uid} value={user.uid}>
                                    {user.username}
                                  </option>
                        ))}
                      </Field>
             </div>

                  <Field
                    name = "user"
                    component = {renderSelectFieldNew}
                    user={this.state.user}
                    onChange={this.onAttendeeChange}
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
              <Button type="submit" disabled={pristine || submitting}  color="primary">
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

const mapStateToProps = state => ({
  authUser: getAuthUser(state),
  users: getUsersKey(state)
});

const mapDispatchToProps = dispatch => ({
  onSetItems: items => dispatch({ type: "ITEMS_SET", items })
});

const onSubmit = (values, dispatch) => {
  dispatch(    alert("jjj")    );
};

export default withStyles(styles)(
  compose(
    withFirebase,
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    reduxForm({
      form: 'AddItem',
      onSubmit, 
      validate
    })
  )(AddItem)
);
