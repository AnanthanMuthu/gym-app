import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  LogBox,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ButtonText } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { MEDIUM_GREY, WHITE } from "../constants/colors";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import Picker from "../components/common/Picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";

import ScheduleListChild from "../components/ScheduleListChild";
import { Formik } from "formik";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function ScheduleList({ navigation }) {
  const {
    getGymList,
    getSessionList,
    modGymList,
    getScheduleList,
    scheduleList,
  } = gymServices();
  const [gymData, setGymData] = useState(null);
  const [date1, setDate] = useState(new Date());
  useEffect(() => {
    LogBox.ignoreLogs([
      "DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.",
      "StatusBarIOS has been merged with StatusBar and will be removed in a future release.",
      "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.",
    ]);
    getSessionList();
    getGymList();
  }, []);

  function setGym(gym) {
    const founded = modGymList.find((el) => el.value === gym);
    console.log("### selected gym", gym, founded, modGymList);
    if (founded) {
      setGymData(founded);
      getScheduleList({ gym, sdate: "01-08-2022" });
    }
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
            <Formik initialValues={{}} onSubmit={(values) => onSubmit(values)}>
              {({ setFieldValue, values }) => (
                <>
                  <View style={styles.row}>
                    <View style={styles.gymSelect}>
                      <Picker
                        value={values?.gym}
                        onValueChange={(value) => setGym(value)}
                        placeholder={{
                          label: "Select Gym",
                          value: "",
                          key: "",
                        }}
                        items={modGymList ?? []}
                      />
                    </View>
                    {/* <View>
                      <TouchableOpacity
                        style={commonStyle.topRightBtn}
                        onPress={() =>
                          values?.gym
                            ? navigation.navigate("Assign Schedule ", {
                                gymData: values?.gym,
                                routeFrom: "Schedule",
                              })
                            : null
                        }
                      >
                        <ButtonText>Assign Schedule</ButtonText>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                  <View style={styles.row}>
                    <View>
                      <DatePicker
                        style={commonStyle.datePickerStyle}
                        date={values.sdate}
                        mode="date"
                        placeholder="select start date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={commonStyle.dateInner}
                        onDateChange={(date) => {
                          setFieldValue("sdate", date);
                        }}
                      />
                      {/* <DateTimePicker
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
                  onDateChange={(d) => setDate(d)}
                /> */}
                    </View>
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.row}>
              <View>
                <TouchableOpacity style={commonStyle.topRightBtn}>
                  <ButtonText>RIG</ButtonText>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={commonStyle.topRightBtn}>
                  <ButtonText>TURF</ButtonText>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View style={commonStyle.cardHead}>
                <ScheduleListChild scheduleList={scheduleList ?? []} />
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
