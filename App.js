import React, { useCallback, useEffect, useState } from "react";
import { Store } from "./src/redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/themes";
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./src/navigation/RootNav";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import useFonts from "./useFonts";
import { Platform } from "react-native";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
export default function App() {
  const LoadFonts = async () => {
    await useFonts();
  };
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    changeScreenOrientation();
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await LoadFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const changeScreenOrientation = async () => {
    console.log("### orientation updated");
    await lockAsync(OrientationLock.PORTRAIT_UP);
  };
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  if (appIsReady) {
    onLayoutRootView();
  }

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
