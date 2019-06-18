import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {  Input } from "@material-ui/core";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  name,
  classes,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
console.log("error", error)||
  <div>
    <label >Users:</label>
    <select 
    name="user" 
    type="select-multiple"
    >
      {children}
    </select>
    {renderFromHelper({ touched, error })}
  </div>
)

export default renderSelectField;
