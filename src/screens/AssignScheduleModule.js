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
import { checkboxData, REQUIRED_FILEDS } from "../constants/strings";
import DatePicker from "react-native-datepicker";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  sessionid: yup.string().required(),
  display: yup.string().required(),
  time: yup.string().required(),
  sdate: yup.string().required(),
});

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
    modGymList,
  } = gymServices();
  const [daysList, setDaysList] = useState(checkboxData);
  const [gymData, setGymData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const { navigation, route } = props;

  const onSubmit = async (values) => {
    const selectedDays = [];
    daysList.forEach((el) => {
      if (el.isChecked) {
        selectedDays.push(el.txt);
      }
    });
    values.days = selectedDays?.join(",") ? selectedDays.join(",") : "";
    values.gym = gymData;
    console.log("Submit", values, daysList);
    assignSchedule(values);
  };

  useEffect(() => {
    getSessionList();
    // getDisplayList();
  }, []);
  useEffect(() => {
    if (isScheduleAdded) {
      // navigation.navigate(route?.params?.routeFrom);
      setShowInfo(true);
    }
  }, [isScheduleAdded]);

  function setGym(gym) {
    setGymData(gym);
    getDisplayList(gym);
  }

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
          <Formik
            initialValues={{}}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values)}
          >
            {({
              handleSubmit,
              setFieldValue,
              values,
              isValid,
              touched,
              submitCount,
            }) => (
              <>
                <View style={commonStyle.appContainer2}>
                  {showInfo ? (
                    <View style={commonStyle.success}>
                      <Text
                        fontSize={24}
                        fontWeight="bold"
                        lineHeight={25}
                        textAlign="center"
                        text="Schedule Assigned."
                      />
                    </View>
                  ) : null}
                  <View style={commonStyle.card}>
                    <View style={styles.column}>
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Gym"
                      />
                      <Picker
                        value={values.gym}
                        onValueChange={setGym}
                        placeholder={{
                          label: "Select Gym",
                          value: "",
                          key: "",
                        }}
                        items={modGymList ?? []}
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
                      {!isValid && touched && submitCount > 0 && (
                        <Text
                          fontSize={16}
                          color="red"
                          text={REQUIRED_FILEDS}
                          textAlign="center"
                        />
                      )}
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
    paddingHorizontal: 60,
    justifyContent: "space-between",
    // marginVertical: 20,
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
    paddingLeft: 20,
  },
  checkbox: {
    alignSelf: "center",
    padding: 5,
  },
  checkText: {
    marginLeft: 10,
  },
});
