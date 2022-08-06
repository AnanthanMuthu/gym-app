import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { MEDIUM_GREY, WHITE } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import Picker from "../components/common/Picker";
import commonStyle from "./style/commonStyle";
import Text from "../components/common/Text";
import CheckBox from "expo-checkbox";
import { checkboxData } from "../constants/strings";
import DatePicker from "react-native-datepicker";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function AssignScheduleModule(props) {
  const {
    getSessionList,
    sessionModList,
    getDisplayList,
    assignSchedule,
    displayModList,
    isScheduleAdded,
  } = gymServices();
  const [daysList, setDaysList] = useState(checkboxData);

  const { navigation, route } = props;

  const onSubmit = async (values) => {
    console.log("Submit", values, daysList);
    const selectedDays = [];
    daysList.forEach((el) => {
      if (el.isChecked) {
        selectedDays.push(el.txt);
      }
    });
    values.days = selectedDays?.join(",") ? selectedDays.join(",") : "";
    values.gym = route?.params?.gymData ?? "";
    console.log("values", values, route?.params);
    assignSchedule(values);
  };

  useEffect(() => {
    getSessionList();
    getDisplayList();
  }, []);
  useEffect(() => {
    if (isScheduleAdded) {
      navigation.navigate(route?.params?.routeFrom);
    }
  }, [isScheduleAdded]);

  const handleChange = (id) => {
    console.log("### id", id, checkboxData);
    let temp = daysList.map((day) => {
      if (id === day.id) {
        return { ...day, isChecked: !day.isChecked };
      }
      return day;
    });
    console.log("### temp", temp);
    setDaysList(temp);
  };
  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <Formik initialValues={{}} onSubmit={(values) => onSubmit(values)}>
            {({ handleSubmit, setFieldValue, values }) => (
              <>
                <View style={commonStyle.appContainer2}>
                  <View style={commonStyle.card}>
                    <View style={styles.column}>
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Session"
                      />
                      <Picker
                        value={values.sessionid}
                        onValueChange={(value) =>
                          setFieldValue("sessionid", value)
                        }
                        placeholder={{
                          label: "Select Session",
                          value: null,
                          key: null,
                        }}
                        items={sessionModList ?? []}
                      />
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Display"
                      />
                      <Picker
                        value={values.display}
                        onValueChange={(value) =>
                          setFieldValue("display", value)
                        }
                        placeholder={{
                          label: "Select Display",
                          value: null,
                          key: null,
                        }}
                        items={displayModList ?? []}
                      />
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Start TIme"
                      />
                      <DatePicker
                        style={commonStyle.datePickerStyle}
                        date={values.time} //initial date from state
                        mode="time" //The enum of date, datetime and time
                        placeholder="select time"
                        format="hh:mm A"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={commonStyle.dateInner}
                        onDateChange={(time) => {
                          setFieldValue("time", time);
                        }}
                      />
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Start Date"
                      />
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
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="End Date"
                      />
                      <DatePicker
                        style={commonStyle.datePickerStyle}
                        date={values.edate}
                        mode="date"
                        placeholder="select end date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={commonStyle.dateInner}
                        onDateChange={(date) => {
                          setFieldValue("edate", date);
                        }}
                      />
                      <View style={styles.checkboxContainer}>
                        {daysList.map((el, key) => (
                          <View style={styles.row} key={key}>
                            <CheckBox
                              value={el.isChecked}
                              onValueChange={() => {
                                handleChange(el.id);
                              }}
                              style={styles.checkbox}
                              color={el.isChecked ? "#4630EB" : undefined}
                            />
                            <Text
                              fontSize={14}
                              fontWeight="normal"
                              lineHeight={20}
                              textAlign="left"
                              text={el.txt}
                              style={styles.checkText}
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={commonStyle.bottomButton}>
                  <TouchableOpacity
                    style={commonStyle.submitBtn}
                    onPress={handleSubmit}
                  >
                    <ButtonText>ADD</ButtonText>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
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
    margin: 50,
    padding: 50,
  },
  column: {
    flexDirection: "column",
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
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  gymName: {
    backgroundColor: Colors.secondaryLight,
    padding: 5,
    borderRadius: 10,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    padding: 5,
  },
  checkText: {
    marginLeft: 10,
  },
});
