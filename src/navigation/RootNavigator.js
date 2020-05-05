import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";
import SignInScreen from "../components/SignIn";
import SignUpScreen from "../components/SignUp";
import HomePageScreen from "../components/Home";
import DetailedPageScreen from "../components/Items/DetailedItem";
import UserPageScreen from "../components/Items/User";

const   SignInStackNavigator = createStackNavigator();

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

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <HomeStackNavigator.Screen
        name="HomePage"
        component={HomePageScreen}
        options={{ headerTitle: "Home Page" }}
      />
      <HomeStackNavigator.Screen
        name="Detailed"
        component={DetailedPageScreen}
        options={{ headerTitle: "Event detailed info" }}
      />
      <HomeStackNavigator.Screen
        name="User"
        component={UserPageScreen}
        options={{ headerTitle: "User detailed info" }}
      />
    </HomeStackNavigator.Navigator>
  );
};
