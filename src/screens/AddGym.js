import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { MEDIUM_GREY } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import Picker from "../components/common/Picker";
import { REQUIRED_FILEDS, STATUS } from "../constants/strings";
import commonStyle from "./style/commonStyle";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  mobile: yup.string().required(),
  timezone: yup.string().required(),
  city: yup.string().required(),
  status: yup.string().required(),
});

export default function AddGym({ navigation }) {
  const { addGym, isGymAdded, cityList, timezoneList } = gymServices();
  const [userInfo, setUserInfo] = useState(null);

  const onSubmit = async (values, resetForm) => {
    console.log("Submit", values);
    addGym(values);
    resetForm();
  };
  useEffect(() => {
    if (isGymAdded) {
      const userInfo = `User Name : ${isGymAdded?.username ?? ""} Password : ${
        isGymAdded?.password ?? ""
      }`;
      setUserInfo(userInfo);
    }
  }, [isGymAdded]);
  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <Formik
            initialValues={{
              name: "",
              email: "",
              mobile: "",
              timezone: "",
              city: "",
              status: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              isValid,
              touched,
              submitCount,
            }) => (
              <>
                <View style={commonStyle.appContainer2}>
                  {userInfo ? (
                    <View style={commonStyle.success}>
                      <Text
                        fontSize={24}
                        fontWeight="bold"
                        lineHeight={25}
                        textAlign="center"
                        text="Successfully Created."
                      />
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="center"
                        text={userInfo}
                      />
                    </View>
                  ) : null}

                  <View style={commonStyle.card}>
                    <View style={styles.column}>
                      <Text
                        fontSize={18}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Name"
                      />
                      <TextInput
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        style={commonStyle.input}
                      />

                      <Text
                        fontSize={18}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Email"
                      />
                      <TextInput
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        style={commonStyle.input}
                      />
                      <Text
                        fontSize={18}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Mobile"
                      />
                      <TextInput
                        onChangeText={handleChange("mobile")}
                        onBlur={handleBlur("mobile")}
                        value={values.mobile}
                        style={commonStyle.input}
                      />
                      <Text
                        fontSize={18}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Address"
                      />
                      <TextInput
                        onChangeText={handleChange("address")}
                        onBlur={handleBlur("address")}
                        value={values.address}
                        style={commonStyle.input}
                      />
                      <Text
                        fontSize={18}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="City"
                      />
                      <Picker
                        value={values.city}
                        onValueChange={(value) => {
                          console.log(value, values);
                          setFieldValue("city", value);
                        }}
                        placeholder={{ label: "Select", value: "", key: "" }}
                        items={cityList ?? []}
                      />

                      <Text
                        fontSize={18}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Time Zone"
                      />
                      <Picker
                        value={values.timezone}
                        onValueChange={(value) =>
                          setFieldValue("timezone", value)
                        }
                        placeholder={{ label: "Select", value: "", key: "" }}
                        items={timezoneList ?? []}
                      />
                      <Text
                        fontSize={18}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text="Status"
                      />
                      <Picker
                        value={values.status}
                        onValueChange={(value) =>
                          setFieldValue("status", value)
                        }
                        placeholder={{ label: "Select", value: "", key: "" }}
                        items={STATUS}
                      />
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
                    <Ionicons name="md-add" size={20} color="white" />
                    <ButtonText>Add Gym</ButtonText>
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
  gymName: {
    backgroundColor: Colors.secondaryLight,
    padding: 5,
    borderRadius: 10,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
});
