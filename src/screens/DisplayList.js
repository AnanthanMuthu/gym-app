import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import gymServices from "../services/gymServices";
import { Ionicons } from "@expo/vector-icons";
import commonStyle from "./style/commonStyle";
import { TYPES } from "../constants/strings";

export default function DisplayList({ navigation }) {
  const { getDisplayList, getGymList, displayList, modGymList } = gymServices();
  useEffect(() => {
    getDisplayList();
    getGymList();
  }, []);
  function getType(type) {
    const foundType = TYPES.find((el) => el.value === type);
    return foundType?.label ?? "";
  }
  function getGym(gymId) {
    const foundType = modGymList?.find((el) => el.value === gymId);
    return foundType?.label ?? "";
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
              <View style={commonStyle.cardHead}>
                {displayList?.length <= 0 ? (
                  <Text
                    fontSize={14}
                    lineHeight={60}
                    style={commonStyle.noRecords}
                    color={WHITE}
                    text="No Records found"
                  />
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
                          <Text
                            fontSize={14}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            text="Reset"
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
  card: {
    backgroundColor: WHITE,
    borderRadius: 10,
    width: 330,
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
