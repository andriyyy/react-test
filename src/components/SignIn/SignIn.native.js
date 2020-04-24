import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Title, TextInput } from "react-native-paper";
import { signInFormBaseFetchData } from "../../actions/forms";
import { getAuthUserHasErrored } from "../../selectors/Selectors";
import renderTextField from "../Items/AddItem/Field";
import ErrorMessage from "../Items/AddItem/ErrorMessage";
import { Formik } from "formik";
import * as yup from "yup";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email field is required")
    .max(100, "Length Limitation. No more than 100 characters")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i,
      "Has to be a valid email"
    ),
  password: yup.string().required("Password field is required"),
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logginIn: false,
    };
  }

  redirectToAppCallBack(navigation) {
    navigation.navigate("HomePage");
  }

  setSubmittingCallBack(actions) {
    actions.setSubmitting(false);
  }

  render() {
    const { isAuthUserErrored, doSignIn, navigation } = this.props;

    handleOnLogin = (values, actions) => {
      actions.setSubmitting(true);
      doSignIn(
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
          } = props;

          return (
            <View style={styles.container}>
              <ScrollView style={styles.body}>
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
                  data-field-name={"password"}
                  label="Password"
                  name="password"
                  type="password"
                  component={renderTextField}
                  style={styles.textinput}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
                {isAuthUserErrored && (
                  <ErrorMessage errorValue={"Can not Sign In"} />
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
                  SIGN IN
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

export const screenOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  doSignIn: (values, redirectToAppCallBack, setSubmittingCallBack) =>
    dispatch(
      signInFormBaseFetchData(
        values,
        redirectToAppCallBack,
        setSubmittingCallBack
      )
    ),
});

const mapStateToProps = (state, ownProps) => ({
  isAuthUserErrored: getAuthUserHasErrored(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
