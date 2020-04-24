import React from "react";
import { TouchableOpacity } from "react-native";
import { Appbar, Button, useTheme } from "react-native-paper";

export default Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;

  return (
    <Appbar.Header theme={theme}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        ></TouchableOpacity>
      )}
      <Appbar.Content title={options.headerTitle} />
      <Button
        color="white"
        mode="text"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        Sign Up
      </Button>

      <Button
        color="white"
        icon="logout"
        mode="text"
        onPress={() => console.log("Pressed")}
      >
        Log Out
      </Button>
    </Appbar.Header>
  );
};
