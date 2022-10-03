import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors, StyledButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import ConfirmPopup from "../components/ConfirmPopup";
import commonStyle from "./style/commonStyle";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function ViewDisplayDetails({ navigation, route }) {
  const {
    isDisplayDeleted,
    deleteDisplay,
    resetGymPassword,
    isPasswordUpdated,
  } = gymServices();
  useEffect(() => {
    if (isDisplayDeleted) {
      navigation.navigate("Display");
    }
  }, [isDisplayDeleted]);
  //delete
  const [showPopup, setShowPopup] = useState(false);
  const [delleteId, setId] = useState(null);

  const [passInfo, setPassInfo] = useState(null);
  useEffect(() => {
    if (isPasswordUpdated) {
      setPassInfo(`Password : ${isPasswordUpdated?.password ?? ""}`);
    }
  }, [isPasswordUpdated]);
  useEffect(() => {
    return () => {
      setPassInfo(false);
    };
  }, []);
  const ondelete = (id) => {
    console.log("### showPopup", showPopup);
    setShowPopup(false);
    if (id) {
      setShowPopup(true);
      setId(id);
    } else {
      deleteDisplay(delleteId);
    }
  };
  const setModalVisible = () => {
    setShowPopup(!showPopup);
  };
  //end
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
          {passInfo ? (
            <View style={commonStyle.success}>
              <Text
                fontSize={24}
                fontWeight="bold"
                lineHeight={25}
                textAlign="center"
                text="Password reset successfully."
              />
              <Text
                fontSize={14}
                fontWeight="normal"
                lineHeight={20}
                textAlign="center"
                text={passInfo}
              />
            </View>
          ) : null}
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
                  <TouchableOpacity
                    onPress={() => resetGymPassword({ id: displayDetails.gym })}
                    style={{ flexDirection: "row" }}
                  >
                    <MaterialCommunityIcons
                      name="restart"
                      size={22}
                      color="#ae8f73"
                    />

                    <Text
                      fontSize={18}
                      fontWeight="bold"
                      lineHeight={20}
                      textAlign="left"
                      color="#ae8f73"
                      text="Reset"
                      style={{ paddingLeft: 3 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.row2}>
                <StyledButton
                  onPress={() =>
                    ondelete({
                      gym: displayDetails.gym,
                      displayid: displayDetails.id,
                    })
                  }
                >
                  <Ionicons name="trash" size={20} color="white" />
                  <ButtonText fontSize={18} fontWeight="normal">
                    Delete
                  </ButtonText>
                </StyledButton>
                <StyledButton
                  onPress={() =>
                    navigation.navigate("Schedule", {
                      selectedDisplay: displayDetails,
                    })
                  }
                >
                  <ButtonText fontSize={18} fontWeight="normal">
                    Schedule
                  </ButtonText>
                </StyledButton>
              </View>
            </View>
            {showPopup ? (
              <ConfirmPopup
                onConfirm={ondelete}
                showConfirm={showPopup}
                setModalVisible={setModalVisible}
              />
            ) : null}
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 7,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    margin: 20,
  },
  card: {
    justifyContent: "center",
    backgroundColor: WHITE,
    borderRadius: 22,
    width: deviceWidth - 220,
    height: deviceHeight - 500,
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
    justifyContent: "flex-start",
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
