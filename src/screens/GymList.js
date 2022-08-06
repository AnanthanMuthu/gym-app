import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors, StyledSmallButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";

let deviceHeight = Dimensions.get("window").height;

export default function GymList({ navigation }) {
  const {
    getGymList,
    getTimezoneList,
    gymList,
    cityList,
    getCityList,
  } = gymServices();
  useEffect(() => {
    getGymList();
    getCityList();
    getTimezoneList();
  }, []);
  
  if (gymList?.length <= 0) {
    return null;
  }

  const getCity = (value) => {
    const modCity = cityList.find((city) => city.key === value);
    return modCity ? modCity.label : value;
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
              <View style={commonStyle.cardHead}>
                {gymList?.map((el, key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("View Gym Details", {
                        gymDetails: el,
                      })
                    }
                  >
                    <View style={styles.row}>
                      <View style={styles.firstItem}>
                        <Text
                          fontSize={14}
                          fontWeight={"800"}
                          lineHeight={20}
                          textAlign="left"
                          text={el.name}
                          backgroundColor="black"
                        />
                      </View>
                      <TouchableOpacity
                        style={commonStyle.smallBtn}
                        onPress={(e) => {
                          e.preventDefault();
                          navigation.navigate("Edit Gym Details", {
                            gymDetails: el,
                          });
                        }}
                      >
                        <Ionicons name="md-pencil" size={20} color="white" />
                        <ButtonText>Edit</ButtonText>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.firstItem}>
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="ID"
                          color={DARK_GREY}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="bold"
                          lineHeight={20}
                          textAlign="left"
                          text={String(el.id)}
                        />
                      </View>
                      <View>
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="Mobile"
                          color={DARK_GREY}
                        />
                        <Text
                          fontSize={14}
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
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="Address"
                          color={DARK_GREY}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="bold"
                          lineHeight={20}
                          textAlign="left"
                          text={el.address}
                        />
                      </View>
                      <View>
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="City"
                          color={DARK_GREY}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="bold"
                          lineHeight={20}
                          textAlign="left"
                          text={getCity(el.city)}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={commonStyle.bottomButton}>
            <TouchableOpacity
              style={commonStyle.submitBtn}
              onPress={() => navigation.navigate("Add Gym")}
            >
              <Ionicons name="md-add" size={20} color="white" />
              <ButtonText>Add Gym</ButtonText>
            </TouchableOpacity>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 10,
    width: 330,
    height: 190,
    margin: 10,
    paddingVertical: 8,
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
