import React from "react";
import { Store } from "./src/redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/themes";
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./src/navigation/RootNav";
// import "./ignoreWarnings";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <RootNav />
        </Provider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
