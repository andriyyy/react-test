import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";
import SignInScreen from "../components/SignIn";
import SignUpScreen from "../components/SignUp";
import HomePageScreen from "../components/Home";

const SignInStackNavigator = createStackNavigator();

export const SignInNavigator = () => {
  return (
    <SignInStackNavigator.Navigator
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <SignInStackNavigator.Screen
        name="HomePage"
        component={HomePageScreen}
        options={{ headerTitle: "Home Page" }}
      />
      <SignInStackNavigator.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerTitle: "Sign In" }}
      />
      <SignInStackNavigator.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "Sign Up" }}
      />
    </SignInStackNavigator.Navigator>
  );
};
