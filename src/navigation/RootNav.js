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

const Stack = createNativeStackNavigator();
const isAuthendicated = false;
const initialRouteName = isAuthendicated ? "Gym List" : " ";
export default RootNav = () => {
  return (
    <Stack.Navigator
      drawerContentOptions={(props) => {
        console.log("### route", props);
        const noHeader = props?.route?.name === "     ";
        return {
          drawerHideStatusBarOnOpen: noHeader ? true : false,
        };
      }}
      screenOptions={(props) => {
        const noHeader = props?.route?.name === "     ";
        return {
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: noHeader ? BLACK : WHITE,
          headerTransparent: true,
          headerLeftContainerStyle: noHeader
            ? {}
            : {
                paddingLeft: 20,
                fontSize: 20,
              },
          fontSize: 30,
          headerBackVisible: noHeader ? false : true,
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
