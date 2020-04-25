import React from "react";
import Items from "../Items";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const navigation = useNavigation();
  return <Items navigation={navigation} />;
};

export default HomePage;
