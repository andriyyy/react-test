import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";

import { SignInNavigator, HomeNavigator } from "./RootNavigator";
import { useSelector } from "react-redux";
import StartupScreen from "../components/Home/StartupScreen";

const AppNavigator = () => {
  const isAuth = useSelector((state) => state.authState.token);
  const didTryAutoLogin = useSelector(
    (state) => state.authState.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <HomeNavigator />}
      {!isAuth && didTryAutoLogin && <SignInNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default connect()(AppNavigator);
