const validate = values => {
  const errors = {};
  const requiredFields = ["username", "email", "passwordOne", "passwordTwo"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (values.passwordOne !== values.passwordTwo) {
      errors.passwordTwo = "Passwords should be the same";
    }
  });

  return errors;
};
export { validate };
