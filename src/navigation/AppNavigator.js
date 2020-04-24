import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { onAuthUserListener } from "../actions/firebase";
import { itemsFetchData } from "../actions/items";
import { usersFetchData } from "../actions/users";

import { SignInNavigator } from "./RootNavigator";
import { useSelector, useDispatch } from "react-redux";

const useFetching = (someFetchActionCreator) => {
  //const dispatch = useDispatch();
  useEffect(() => {
    dispatch(someFetchActionCreator());
  }, []);
};

const AppNavigator = ({ dispatch }) => {
  //const dispatch = useDispatch();
  //useFetching(onAuthUserListener);
  //useFetching(itemsFetchData);
  // useFetching(usersFetchData);
  console.log("jjjjjjjjjjjjj", dispatch);

  useEffect(() => {
    dispatch(itemsFetchData());
  }, []);
  useEffect(() => {
    dispatch(usersFetchData());
  }, []);
  useEffect(() => {
    dispatch(onAuthUserListener());
  }, []);

  return (
    <NavigationContainer>
      <SignInNavigator />
    </NavigationContainer>
  );
};
const mapStateToProps = (state) => ({
  signUpSubmitted: getSignUpSubmitted(state),
  onGetRetriaved: getRetriaved(state),
  isItemsLoading: getItemsIsLoading(state),
  isItemsEnrolmentsAllLoading: getItemsEnrolmentsAllIsLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
  authUserListener: () => dispatch(onAuthUserListener()),
  fetchUsers: () => dispatch(usersFetchData()),
  fetchItems: () => dispatch(itemsFetchData()),
});

export default connect()(AppNavigator);
