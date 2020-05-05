import React from "react";
import { useDispatch } from "react-redux";

import { Appbar, Button, useTheme, IconButton } from "react-native-paper";
import { logout } from "../actions/firebase";

export default Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const dispatch = useDispatch();
  return (
    <Appbar.Header theme={theme}>
      {scene.route.name === "Detailed" || scene.route.name === "User" ? (
        <IconButton
          icon="arrow-left"
          color={"white"}
          size={20}
          onPress={() => navigation.popToTop()}
        />
      ) : null}

      <Appbar.Content title={options.headerTitle} />

      {scene.route.name === "Detailed" ||
      scene.route.name === "User" ||
      scene.route.name === "HomePage" ? (
        <Button
          color="white"
          icon="logout"
          mode="text"
          onPress={() => {
            dispatch(logout());
          }}
        >
          Log Out
        </Button>
      ) : null}

      {scene.route.name === "SignIn" ? (
        <Button
          color="white"
          icon="account-plus"
          mode="text"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          Sign Up
        </Button>
      ) : null}

      {scene.route.name === "SignUp" ? (
        <Button
          color="white"
          icon="login"
          mode="text"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          Sign In
        </Button>
      ) : null}
    </Appbar.Header>
  );
};
