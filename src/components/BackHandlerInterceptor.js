import { BackHandler, Platform } from "react-native";

export function handleRequestClose() {
  if (Platform.OS === "android") {
    console.log("back press");
  }

  return true;
}

export default function BackHandlerInterceptor() {
  BackHandler.addEventListener("hardwareBackPress", () => handleRequestClose());

  return () =>
    BackHandler.removeEventListener("hardwareBackPress", () =>
      handleRequestClose()
    );
}
