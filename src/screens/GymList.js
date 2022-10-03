import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import Norecords from "../components/common/Norecords";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const halfWidth = deviceWidth / 2;

export default function GymList({ navigation }) {
  const { getGymList, getTimezoneList, gymList, cityList, getCityList } =
    gymServices();
  useEffect(() => {
    getGymList();
    getCityList();
    getTimezoneList();
  }, []);
  useEffect(() => {
    setGymList(gymList);
  }, [gymList]);
  const [searchText, setSearchText] = useState("");
  const [modGymList, setGymList] = useState([]);

  const { darkLight } = Colors;
  const handleTextChange = (text) => {
    setSearchText(text);
    console.log("### text", text);
    const temp = text
      ? gymList?.filter((el) => {
          const tempCity = getCity(el?.city);
          const name = el?.name?.toLowerCase();
          const id = String(el?.id)?.toLowerCase();
          const city = tempCity?.toLowerCase();
          const tempText = text?.toLowerCase();

          return (
            name?.includes(tempText) ||
            id?.includes(tempText) ||
            id === tempText ||
            city?.includes(tempText)
          );
        })
      : [];
    setGymList(text ? temp : gymList);
  };
  const getCity = (value) => {
    const modCity = cityList.find((city) => city.key === value);
    return modCity?.label?.length > 1 ? modCity.label : "-";
  };
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 20,
                  marginLeft: 20,
                }}
              >
                <TextInput
                  placeholder="Search by ID, Name, City"
                  placeholderTextColor={darkLight}
                  value={searchText}
                  onChangeText={handleTextChange}
                  keyboardType="email-address"
                  style={commonStyle.constantInput2}
                />
                <View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      right: 50,
                      top: 52,
                    }}
                    onPress={() => handleTextChange(searchText)}
                  >
                    <Ionicons name="search" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={commonStyle.cardHead}>
                {modGymList?.length <= 0 ? (
                  <Norecords />
                ) : (
                  modGymList?.map((el, key) => (
                    <TouchableOpacity
                      key={key}
                      style={styles.card}
                      onPress={() =>
                        navigation.navigate("View Gym Details", {
                          gymDetails: el,
                        })
                      }
                    >
                      <View style={styles.row2}>
                        <View style={styles.bg}>
                          <Text
                            fontSize={13}
                            fontWeight={"800"}
                            lineHeight={20}
                            textAlign="left"
                            text={el.name}
                            backgroundColor="black"
                            isUppercase={true}
                          />
                        </View>
                        <TouchableOpacity
                          style={commonStyle.smallBtn2}
                          onPress={(e) => {
                            e.preventDefault();
                            navigation.navigate("Edit Gym Details", {
                              gymDetails: el,
                            });
                          }}
                        >
                          <FontAwesome5
                            name="pencil-alt"
                            size={10}
                            color="white"
                          />
                          <ButtonText>Edit</ButtonText>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
                          <Text
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="ID"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            text={String(el.id)}
                          />
                        </View>
                        <View>
                          <Text
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Mobile"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            text={el.mobile}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
                          <Text
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Address"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            text={el.address}
                          />
                        </View>
                        <View>
                          <Text
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="City"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            text={getCity(el.city)}
                          />
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
              onPress={() => navigation.navigate("Add Gym")}
            >
              <Ionicons name="add" size={24} color="white" />
              <ButtonText fontSize={18}>Add Gym</ButtonText>
            </TouchableOpacity>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.secondaryLight,
    padding: 10,
    borderRadius: 7,
    maxWidth: halfWidth - 140,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 22,
    width: halfWidth - 40,
    minHeight: 210,
    height: "auto",
    margin: 10,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    textAlign: "left",
  },
  row2: {
    flexDirection: "row",
    padding: 10,
    textAlign: "left",
    justifyContent: "space-between",
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
  firstItem: {
    width: 180,
    paddingLeft: 10,
  },
  scrollHeight: {
    height: deviceHeight - 100,
  },
});
