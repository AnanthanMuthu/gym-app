import PropTypes from "prop-types";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./../screens/Login";
import Welcome from "../screens/Welcome";
import { BLACK, WHITE } from "../constants/colors";
import GymList from "../screens/GymList";
import ViewGymDetails from "../screens/ViewGymDetails";
import EditGym from "../screens/EditGym";
import CategoryList from "../screens/CategoryList";
import PlayList from "../screens/PlayList";
import EditCategory from "../screens/EditCategory";
import DisplayList from "../screens/DisplayList";
import ViewDisplayDetails from "../screens/ViewDisplayDetails";
import EditPlay from "../screens/EditPlay";
import AddDisplay from "../screens/AddDisplay";
import AddGym from "../screens/AddGym";
import AddCategory from "../screens/AddCategory";
import SessionList from "../screens/SessionList";
import AddSession from "../screens/AddSession";
import AssignSchedule from "../screens/AssignSchedule";
import ScheduleList from "../screens/ScheduleList";
import AddPlay from "../screens/AddPlay";
import EditSession from "../screens/EditSession";
import AssignScheduleModule from "../screens/AssignScheduleModule";
import VideoPlayer from "../screens/VideoPlayer";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const isAuthendicated = false;
const initialRouteName = isAuthendicated ? "Gym List" : " ";
const logoImage = require("./../assets/logo_white.png");

const RootNav = (rootProp) => {
  return (
    <Stack.Navigator
      drawerContentOptions={(props) => {
        const noHeader = props?.route?.name === "     ";
        return {
          drawerHideStatusBarOnOpen: noHeader ? true : false,
        };
      }}
      screenOptions={(props) => {
        const noHeader =
          props?.route?.name === "     " || props?.route?.name === " ";
        const isWelcome = props?.route?.name === "Welcome";
        return {
          headerStyle: {
            backgroundColor: "transparent",
            height: 200,
          },
          headerTitleStyle: {
            fontSize: isWelcome ? 28 : 24,
            fontWeight: "bold",
          },
          headerTintColor: noHeader ? BLACK : WHITE,
          headerTransparent: true,
          headerLeftContainerStyle: noHeader
            ? {}
            : {
                paddingLeft: 20,
                fontSize: 24,
              },
          headerBackVisible: false,
          headerLeft: () =>
            noHeader ? null : (
              <TouchableOpacity
                onPress={() => {
                  isWelcome
                    ? AsyncStorage.removeItem("userInfo") &&
                      props.navigation.goBack()
                    : props.navigation.goBack();
                }}
              >
                <Ionicons name="arrow-back-sharp" size={28} color="white" />
              </TouchableOpacity>
            ),
          headerRight: () =>
            noHeader ? null : (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Welcome");
                }}
              >
                <Image
                  style={{
                    width: 53,
                    position: "absolute",
                    top: -200,
                    right: 20,
                  }}
                  source={logoImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ),
        };
      }}
      initialRouteName={initialRouteName}
      headerMode="none"
    >
      <Stack.Screen name=" " component={Login} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Gym List" component={GymList} />
      <Stack.Screen name="View Gym Details" component={ViewGymDetails} />
      <Stack.Screen name="Edit Gym Details" component={EditGym} />
      <Stack.Screen name="Add Gym" component={AddGym} />
      <Stack.Screen name="Category" component={CategoryList} />
      <Stack.Screen name="Plays" component={PlayList} />
      <Stack.Screen name="Add Category" component={AddCategory} />
      <Stack.Screen name="Edit Category" component={EditCategory} />
      <Stack.Screen name="Add Play" component={AddPlay} />
      <Stack.Screen name="Edit Play" component={EditPlay} />
      <Stack.Screen name="Display" component={DisplayList} />
      <Stack.Screen name="View Display" component={ViewDisplayDetails} />
      <Stack.Screen name="Add Display" component={AddDisplay} />
      <Stack.Screen name="Session" component={SessionList} />
      <Stack.Screen name="Session Create" component={AddSession} />
      <Stack.Screen name="Edit Session" component={EditSession} />
      <Stack.Screen name="Schedule" component={ScheduleList} />
      <Stack.Screen name="Assign Schedule" component={AssignSchedule} />
      <Stack.Screen name="Assign Schedule " component={AssignScheduleModule} />
      <Stack.Screen name="     " component={VideoPlayer} />
    </Stack.Navigator>
  );
};
RootNav.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default RootNav;
