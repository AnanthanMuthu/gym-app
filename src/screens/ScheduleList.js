import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ButtonText } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { MEDIUM_GREY, WHITE } from "../constants/colors";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import Picker from "../components/common/Picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ScheduleListChild from "../components/ScheduleListChild";

export default function ScheduleList({ navigation, route }) {
  const {
    getGymList,
    getSessionList,
    modGymList,
    getScheduleList,
    scheduleList,
    user,
  } = gymServices();
  const [gymData, setGymData] = useState(null);
  const [displayFromScheduleList, setDisplay] = useState([]);
  const [date1, setDate] = useState(new Date());
  useEffect(() => {
    getSessionList();
    getGymList();
  }, []);
  useEffect(() => {
    if (route?.params?.selectedDisplay) {
      console.log(
        "### route?.params?.selectedDisplay",
        route?.params?.selectedDisplay
      );
    }
  }, [route?.params?.selectedDisplay]);
  useEffect(() => {
    if (scheduleList?.length > 0) {
      let result = [];

      scheduleList.forEach(function (elem) {
        if (result.indexOf(elem.displayname) === -1) {
          result.push(elem.displayname);
        }
      });

      setDisplay(result);
    }
  }, [scheduleList]);
  useEffect(() => {
    if (date1) {
      console.log("### date1", date1);
    }
  }, [date1]);

  function setGym(gym) {
    setGymData(gym);
    getScheduleList({ gym, sdate: "01-08-2022" });
  }
  function onDateChange(d) {
    setDate(d);
    console.log("### onDateChange", d);
    getScheduleList({ gym, sdate: "01-08-2022" });
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
            {user?.type === 1 ? (
              <View style={styles.row}>
                <View style={styles.gymSelect}>
                  <Picker
                    value={gymData}
                    onValueChange={(value) => setGym(value)}
                    placeholder={{ label: "Select Gym", value: "", key: "" }}
                    items={modGymList ?? []}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={commonStyle.topRightBtn}
                    onPress={() =>
                      gymData
                        ? navigation.navigate("Assign Schedule ", {
                            gymData,
                            routeFrom: "Schedule",
                          })
                        : null
                    }
                  >
                    <ButtonText>Assign Schedule</ButtonText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            <View style={styles.row}>
              <View>
                <DateTimePicker
                  style={commonStyle.datePickerStyle}
                  value={date1} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      //display: 'none',
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={(d) => onDateChange(d)}
                />
              </View>
            </View>
            <View style={styles.row}>
              {displayFromScheduleList?.map((_el, index) =>
                _el ? (
                  <View key={index}>
                    <TouchableOpacity style={commonStyle.topRightBtn}>
                      <ButtonText>{_el}</ButtonText>
                    </TouchableOpacity>
                  </View>
                ) : null
              )}
            </View>

            <ScrollView>
              <View style={commonStyle.cardHead}>
                <ScheduleListChild
                  scheduleList={scheduleList ?? []}
                  navigation={navigation}
                />
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
