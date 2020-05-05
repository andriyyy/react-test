import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { onAuthUserListener } from "../actions/firebase";
import { itemsFetchData } from "../actions/items";
import { usersFetchData } from "../actions/users";

import { SignInNavigator, HomeNavigator } from "./RootNavigator";
import { useSelector, useDispatch } from "react-redux";
import StartupScreen from "../components/Home/StartupScreen";

const AppNavigator = ({ dispatch }) => {
  useEffect(() => {
    //dispatch(itemsFetchData());
  }, []);
  useEffect(() => {
    //dispatch(usersFetchData());
  }, []);
  useEffect(() => {
    // dispatch(onAuthUserListener());
  }, []);

  const isAuth = useSelector((state) => state.authState.token);
  const didTryAutoLogin = useSelector(
    (state) => state.authState.didTryAutoLogin
  );

  console.log(
    "==isAuth===================================================>",
    isAuth
  );
  console.log(
    "==didTryAutoLogin==========================================>",
    didTryAutoLogin
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
