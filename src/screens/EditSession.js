import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { GREY, LIGHT_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import Picker from "../components/common/Picker";
import { STATUS } from "../constants/strings";
import commonStyle from "./style/commonStyle";
import DraggableList from "../components/DraggableList";

export default function EditSession(props) {
  const {
    categoryList,
    catPlayList,
    updateSession,
    isSessionUpdated,
    isSessionAdded,
    getSessionPlayList,
    sessionPlayList,
  } = gymServices();
  const [dataList, setDataList] = useState([]);
  const {
    navigation,
    route: { params },
  } = props;

  const onSubmit = async (values) => {
    const formValues = { ...values, sessionid: values.id, playlist: dataList };
    console.log("Submit", values, formValues);
    updateSession(formValues);
  };

  useEffect(() => {
    const scheduleData = params?.scheduleData;
    const sessionDetails = params?.sessionDetails;
    console.log("### scheduleData", params, categoryList, catPlayList);
    if (sessionDetails) {
      getSessionPlayList(sessionDetails.id);
    }
    if (scheduleData) {
      const playDetail = catPlayList?.find(
        (el) => el.key === scheduleData?.play
      );
      const categoryDetail = categoryList?.find(
        (el) => el.id === scheduleData?.category
      );
      if (playDetail?.label && categoryDetail?.name) {
        let data = {
          ...scheduleData,
          name: playDetail.label,
          catname: categoryDetail.name,
          orderid: dataList.length + 1,
        };
        let arr = [...dataList];
        arr.push(data);
        setDataList(arr);
      }
    }
  }, [params?.scheduleData, params?.sessionDetails]);
  useEffect(() => {
    if (sessionPlayList) {
      let arr = [...sessionPlayList];
      setDataList(arr);
    }
  }, [sessionPlayList]);
  useEffect(() => {
    return () => setDataList([]);
  }, []);
  useEffect(() => {
    console.log("### isSessionAdded", isSessionAdded);
    if (isSessionUpdated) {
      navigation.navigate("Session");
    }
  }, [isSessionUpdated]);

  const updateList = (values) => {
    setDataList(values);
  };
  console.log("### dataList", dataList);
  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <Formik
            initialValues={{ ...params.sessionDetails }}
            onSubmit={(values) => onSubmit(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <>
                <View style={styles.column}>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Name"
                    color={WHITE}
                  />
                  <TextInput
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    style={commonStyle.input}
                  />
                  <View style={styles.addBtn}>
                    <TouchableOpacity
                      style={commonStyle.addSession}
                      onPress={() =>
                        navigation.navigate("Assign Schedule", {
                          routeFrom: "Edit Session",
                        })
                      }
                    >
                      <ButtonText>Add</ButtonText>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sessionItem}>
                    <DraggableList
                      scheduleList={dataList ?? []}
                      updateList={updateList}
                    />
                  </View>
                  <View>
                    <Text
                      fontSize={14}
                      fontWeight="normal"
                      lineHeight={20}
                      textAlign="left"
                      text="Status"
                      color={WHITE}
                    />
                    <Picker
                      value={values.status}
                      onValueChange={(value) => setFieldValue("status", value)}
                      placeholder={{
                        label: "Select",
                        value: null,
                        key: null,
                      }}
                      items={STATUS}
                    />
                  </View>
                  <View style={commonStyle.bottomButton}>
                    <TouchableOpacity
                      style={commonStyle.submitBtn}
                      onPress={handleSubmit}
                    >
                      <ButtonText>Save</ButtonText>
                    </TouchableOpacity>
                  </View>
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
  sessionItem: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  childItem: {
    backgroundColor: WHITE,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  childItem2: {
    flexDirection: "row",
  },
  addBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    // flexDirection: "column",
    padding: 10,
    // justifyContent: "space-between",
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
  gymName: {
    backgroundColor: Colors.secondaryLight,
    padding: 5,
    borderRadius: 10,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  input: {
    fontSize: 20,
    minHeight: 30,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    borderColor: GREY,
    textAlign: "center",
  },
});
