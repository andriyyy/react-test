import React from "react";
import { TextInput } from "react-native-paper";

const renderTextField = ({
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextInput
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

export default renderTextField;
