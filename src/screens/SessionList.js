import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import Picker from "../components/common/Picker";

export default function SessionList({ navigation }) {
  const {
    getSessionList,
    getGymList,
    cloneSession,
    deleteSession,
    sessionList,
    modGymList,
  } = gymServices();
  useEffect(() => {
    getSessionList();
    getGymList();
  }, []);

  function setGym(gym) {
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
            <View style={styles.row}>
              <View style={styles.gymSelect}>
                <Picker
                  value={1}
                  onValueChange={(value) => setGym(value)}
                  placeholder={{ label: "Select Gym", value: "", key: "" }}
                  items={modGymList ?? []}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={commonStyle.topRightBtn}
                  onPress={() => navigation.navigate("Session Create")}
                >
                  <ButtonText>Create Session</ButtonText>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View style={commonStyle.cardHead}>
                {sessionList?.length <= 0 ? (
                  <Text
                    fontSize={14}
                    lineHeight={60}
                    style={commonStyle.noRecords}
                    color={WHITE}
                    text="No Records found"
                  />
                ) : (
                  sessionList?.map((el, key) => (
                    <View style={styles.card} key={key}>
                      <View style={styles.row}>
                        <View>
                          <Text
                            fontSize={14}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text={el.name}
                            style={styles.categoryName}
                          />
                          <Text
                            fontSize={14}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text={`Duration : ${el.duration ?? "-"}`}
                            style={styles.duration}
                          />
                        </View>
                      </View>

                      <View style={styles.row}>
                        <View>
                          <TouchableOpacity
                            style={commonStyle.smallBtn}
                            onPress={() => deleteSession({ id: el.id })}
                          >
                            <Ionicons name="md-close" size={20} color="white" />
                            <ButtonText>Delete</ButtonText>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={commonStyle.smallBtn}
                            onPress={() => cloneSession({ id: el.id })}
                          >
                            <Ionicons name="md-copy" size={20} color="white" />
                            <ButtonText>Clone</ButtonText>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={commonStyle.smallBtn}
                            onPress={(e) => {
                              e.preventDefault();
                              navigation.navigate("Edit Session", {
                                sessionDetails: el,
                              });
                            }}
                          >
                            <Ionicons
                              name="md-pencil"
                              size={20}
                              color="white"
                            />
                            <ButtonText>Edit</ButtonText>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gymSelect: {
    flex: 3,
    marginRight: 10,
    justifyContent: "center",
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 10,
    width: 330,
    height: 150,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    textAlign: "left",
    alignItems: "baseline",
  },
  icon: {
    height: 15,
  },
  duration: {
    padding: 5,
    justifyContent: "flex-start",
  },
  categoryName: {
    padding: 5,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },

  firstItem: {
    width: 135,
    paddingLeft: 10,
  },
});
