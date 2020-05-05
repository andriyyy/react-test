import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Input } from "@material-ui/core";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  onChangeAction,
  user,
  classes,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) =>
  console.log("error", input) || (
    <FormControl className={classes.formControl} error={touched && error}>
      <InputLabel htmlFor="user">Users:</InputLabel>

      <Select
        multiple
        {...input}
        input={<Input type="text" name="user" id="user" />}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );

export default renderSelectField;
