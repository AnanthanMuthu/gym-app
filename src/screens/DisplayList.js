import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import gymServices from "../services/gymServices";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import commonStyle from "./style/commonStyle";
import { TYPES } from "../constants/strings";
import Picker from "../components/common/Picker";
import Norecords from "../components/common/Norecords";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const halfWidth = deviceWidth / 2;

export default function DisplayList({ navigation }) {
  const {
    getDisplayList,
    getGymList,
    displayList,
    modGymList,
    resetGymPassword,
    isPasswordUpdated,
  } = gymServices();
  useEffect(() => {
    getDisplayList();
    getGymList();
  }, []);
  const [selectedGym, setSelectedGym] = useState(null);

  const [passInfo, setPassInfo] = useState(null);
  useEffect(() => {
    if (isPasswordUpdated) {
      setPassInfo(`Password : ${isPasswordUpdated?.password ?? ""}`);
    }
  }, [isPasswordUpdated]);

  function getType(type) {
    const foundType = TYPES.find((el) => el.value === type);
    return foundType?.label ?? "";
  }
  function getGym(gymId) {
    const foundType = modGymList?.find((el) => el.value === gymId);
    return foundType?.label ?? "";
  }
  function setGym(gym) {
    setSelectedGym(gym);
    getDisplayList(gym);
    console.log("### selected gym", gym);
  }

  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <View style={commonStyle.appContainer}>
            <ScrollView>
              <View style={styles.gymSelect}>
                <Picker
                  value={selectedGym}
                  onValueChange={(value) => setGym(value)}
                  placeholder={{ label: "Select Gym", value: "", key: "" }}
                  items={modGymList ?? []}
                />
              </View>
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
              <View style={commonStyle.cardHead}>
                {displayList?.length <= 0 ? (
                  <Norecords />
                ) : (
                  displayList?.map((el, key) => (
                    <TouchableOpacity
                      style={styles.card}
                      key={key}
                      onPress={() => {
                        const params = {
                          ...el,
                          modGym: getGym(el.gym),
                          modType: getType(el.type),
                        };
                        navigation.navigate("View Display", {
                          displayDetails: params,
                        });
                      }}
                    >
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
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
                            text={el.name}
                          />
                        </View>
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
                            text={getType(el.type)}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
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
                            text={getGym(el.gym)}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
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
                            text={el.username}
                          />
                        </View>
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
                            style={{ flexDirection: "row" }}
                            onPress={(e) => {
                              e.preventDefault();
                              resetGymPassword({ id: el.gym });
                            }}
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
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
          <View style={commonStyle.bottomButton}>
            <TouchableOpacity
              style={commonStyle.submitBtn}
              onPress={() => navigation.navigate("Add Display")}
            >
              <Ionicons name="md-add" size={20} color="white" />
              <ButtonText>Add Display</ButtonText>
            </TouchableOpacity>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gymSelect: {
    flex: 1,
    width: "75%",
    paddingLeft: "25%",
    marginRight: 10,
    justifyContent: "center",
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 22,
    width: halfWidth - 40,
    height: 220,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    textAlign: "left",
  },
  icon: {
    height: 15,
  },

  firstItem: {
    width: 180,
    paddingLeft: 10,
  },
  bottomButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
