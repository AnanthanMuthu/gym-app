import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors, StyledSmallButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import { Ionicons } from "@expo/vector-icons";
import ConfirmPopup from "../components/ConfirmPopup";
import commonStyle from "./style/commonStyle";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function ViewGymDetails(props) {
  const {
    deleteGym,
    getGymList,
    isGymDeleted,
    cityList,
    timezoneList,
    resetGymPassword,
    isPasswordUpdated,
  } = gymServices();

  const {
    navigation,
    route: {
      params: { gymDetails },
    },
  } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [delleteId, setId] = useState(null);
  const [passInfo, setPassInfo] = useState(null);

  useEffect(() => {
    if (isGymDeleted) {
      getGymList();
      console.log("### isGymDeleted", isGymDeleted);
      navigation.navigate("Gym List");
    }
  }, [isGymDeleted]);
  useEffect(() => {
    if (isPasswordUpdated) {
      setPassInfo(`Password : ${isPasswordUpdated?.password ?? ""}`);
    }
  }, [isPasswordUpdated]);
  useEffect(() => {
    if (showPopup) {
      console.log("### hange", showPopup);
    }
  }, [showPopup]);
  const getCity = (value) => {
    const modCity = cityList.find((city) => city.key === value);
    return modCity?.label?.length > 1 ? modCity.label : "-";
  };
  const getTimezone = (value) => {
    const modTZ = timezoneList.find((zone) => zone.key === value);
    return modTZ?.label?.length > 1 ? modTZ.label : "-";
  };
  const ondelete = (id) => {
    console.log("### showPopup", showPopup);
    setShowPopup(false);
    if (id) {
      setShowPopup(true);
      setId(gymDetails.id);
    } else {
      deleteGym({ id: delleteId });
    }
  };
  const setModalVisible = () => {
    setShowPopup(!showPopup);
  };
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
                <View style={styles.gymName}>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.name}
                    style={styles.gymName}
                    isUppercase={true}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.firstItem}>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="ID"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={String(gymDetails?.id ?? "")}
                  />
                </View>
                <View>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="TimeZone"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={getTimezone(gymDetails.timezone)}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.firstItem}>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Address"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.address}
                  />
                </View>
                <View>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Status"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails?.status === 1 ? "Active" : "Inactive"}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.firstItem}>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="User Name"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.name}
                  />
                </View>
                <View>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Mobile"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.mobile}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.firstItem}>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="City"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={getCity(gymDetails.city)}
                  />
                </View>
                <View>
                  <Text
                    fontSize={18}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Password"
                    color={DARK_GREY}
                  />
                  <Pressable
                    style={{ flexDirection: "row" }}
                    onPress={() => resetGymPassword({ id: gymDetails.id })}
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
                  </Pressable>
                </View>
              </View>
              <View style={styles.row2}>
                <StyledSmallButton
                  onPress={(e) => {
                    navigation.navigate("Edit Gym Details", {
                      gymDetails: gymDetails,
                    });
                  }}
                >
                  <FontAwesome5 name="pencil-alt" size={12} color="white" />
                  <ButtonText>Edit</ButtonText>
                </StyledSmallButton>
                <StyledSmallButton onPress={() => ondelete(gymDetails?.id)}>
                  <Ionicons name="trash" size={18} color="white" />
                  <ButtonText>Delete</ButtonText>
                </StyledSmallButton>
              </View>
            </View>
          </View>
          {showPopup ? (
            <ConfirmPopup
              onConfirm={ondelete}
              showConfirm={showPopup}
              setModalVisible={setModalVisible}
            />
          ) : null}
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
  btn: {
    flexDdirection: "row",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#ae8f73",
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 22,
    width: deviceWidth - 100,
    height: deviceHeight - 400,
    margin: 10,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    textAlign: "left",
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
  firstItem: {
    width: "50%",
    paddingLeft: 10,
  },
  gymName: {
    backgroundColor: Colors.secondaryLight,
    padding: 5,
    borderRadius: 10,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
});
