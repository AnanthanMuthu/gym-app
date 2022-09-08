import React, { useEffect } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors, StyledSmallButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function ViewDisplayDetails({ navigation, route }) {
  const { isDisplayDeleted, deleteDisplay } = gymServices();
  useEffect(() => {
    if (isDisplayDeleted) {
      navigation.navigate("Display");
    }
  }, [isDisplayDeleted]);
  const {
    params: { displayDetails },
  } = route;

  console.log("### displayDetails", route, displayDetails);
  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <View style={styles.appContainer}>
            <View style={styles.card}>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Name"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={displayDetails.name}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Gym"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={displayDetails.modGym}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Type"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={displayDetails.modType}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="User Name"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={displayDetails.username}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Password"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text="Reset"
                  />
                </View>
              </View>

              <View style={styles.row2}>
                <StyledSmallButton
                  onPress={() =>
                    deleteDisplay({
                      gym: displayDetails.gym,
                      displayid: displayDetails.id,
                    })
                  }
                >
                  <Ionicons name="md-close" size={20} color="white" />
                  <ButtonText>Delete</ButtonText>
                </StyledSmallButton>
                <StyledSmallButton
                  onPress={() =>
                    navigation.navigate("Schedule", {
                      selectedDisplay: displayDetails,
                    })
                  }
                >
                  <ButtonText>Schedule</ButtonText>
                </StyledSmallButton>
              </View>
            </View>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    margin: 20,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 10,
    width: deviceWidth - 100,
    height: deviceHeight - 200,
    margin: 10,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  row2: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  icon: {
    height: 15,
  },
  gymName: {
    backgroundColor: Colors.secondaryLight,
    padding: 5,
    borderRadius: 10,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
});
