import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import ErrorBoundary from "./ErrorBoundary";

import SignIn from "./src/components/SignIn";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
  //  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5373ab",
    accent: "#f1c40f",
  },
};

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
}
//#5373ab
