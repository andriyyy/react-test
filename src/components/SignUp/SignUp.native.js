import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Title, TextInput } from "react-native-paper";
import { signUpFormBaseFetchData } from "../../actions/forms";
import { getSignUpHasErrored } from "../../selectors/Selectors";
import renderTextField from "../Items/AddItem/Field";
import ErrorMessage from "../Items/AddItem/ErrorMessage";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .required("Email field is required")
    .max(100, "Length Limitation. No more than 100 characters")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i,
      "Has to be a valid email"
    ),
  passwordOne: yup.string().required("Password field is required"),
  passwordTwo: yup
    .string()
    .required("Password field is required")
    .test("passwords-match", "Passwords should be the same", function (value) {
      return this.parent.passwordOne === value;
    }),
});

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  redirectToAppCallBack(navigation) {
    navigation.navigate("SignIn");
  }

  setSubmittingCallBack(actions) {
    actions.setSubmitting(false);
  }

  render() {
    const { isAuthUserErrored, doSignUp, navigation } = this.props;

    handleOnLogin = (values, actions) => {
      actions.setSubmitting(true);
      doSignUp(
        values,
        () => {
          this.redirectToAppCallBack(navigation);
        },
        () => {
          this.setSubmittingCallBack(actions);
        }
      );
    };

    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          handleOnLogin(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const {
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setSubmitting,
          } = props;

          return (
            <View style={styles.container}>
              <ScrollView style={styles.body}>
                <TextInput
                  data-field-name={"username"}
                  label="Full Names"
                  component={renderTextField}
                  name="Full Name"
                  style={styles.textinput}
                  placeholder={"Full Names"}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />

                <ErrorMessage
                  errorValue={touched.username && errors.username}
                />
                <TextInput
                  data-field-name={"email"}
                  label="Email Address"
                  component={renderTextField}
                  name="email"
                  style={styles.textinput}
                  placeholder={"Email Address"}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />

                <ErrorMessage errorValue={touched.email && errors.email} />

                <TextInput
                  data-field-name={"passwordOne"}
                  label="Password"
                  name="passwordOne"
                  type="passwordOne"
                  component={renderTextField}
                  style={styles.textinput}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={handleChange("passwordOne")}
                  onBlur={handleBlur("passwordOne")}
                  value={values.passwordOne}
                />
                <ErrorMessage
                  errorValue={touched.passwordOne && errors.passwordOne}
                />

                <TextInput
                  data-field-name={"passwordTwo"}
                  label="Confirm Password"
                  name="passwordTwo"
                  type="passwordTwo"
                  component={renderTextField}
                  style={styles.textinput}
                  placeholder={"Confirm Password"}
                  secureTextEntry={true}
                  onChangeText={handleChange("passwordTwo")}
                  onBlur={handleBlur("passwordTwo")}
                  value={values.passwordTwo}
                />
                <ErrorMessage
                  errorValue={touched.passwordTwo && errors.passwordTwo}
                />

                {isAuthUserErrored && (
                  <ErrorMessage errorValue={isAuthUserErrored} />
                )}

                <ErrorMessage errorValue={errors.general} />
                <Button
                  style={styles.button}
                  icon="key"
                  mode="contained"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                  onPress={handleSubmit}
                >
                  SIGN UP
                </Button>
              </ScrollView>
            </View>
          );
        }}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "80%",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  textinput: {
    borderRadius: null,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
});

const mapDispatchToProps = (dispatch) => ({
  doSignUp: (values, redirectToAppCallBack, setSubmittingCallBack) =>
    dispatch(
      signUpFormBaseFetchData(
        values,
        redirectToAppCallBack,
        setSubmittingCallBack
      )
    ),
});

const mapStateToProps = (state) => ({
  isAuthUserErrored: getSignUpHasErrored(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
