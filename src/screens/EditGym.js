import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { MEDIUM_GREY } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import Picker from "./../components/common/Picker";
import { STATUS } from "../constants/strings";
import commonStyle from "./style/commonStyle";
import { Ionicons } from "@expo/vector-icons";

export default function EditGym(props) {
  const { updateGym, isGymUpdated, cityList, timezoneList } = gymServices();
  const {
    navigation,
    route: {
      params: { gymDetails },
    },
  } = props;
  const onSubmit = async (values) => {
    console.log("Submit", values);
    updateGym(values);
  };
  useEffect(() => {
    if (isGymUpdated) {
      console.log("### isGymUpdated", isGymUpdated);
      navigation.navigate("Gym List");
    }
  }, [isGymUpdated]);
  console.log("### gymDetails", gymDetails);
  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <Formik
            initialValues={{ ...gymDetails }}
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
                <View style={commonStyle.appContainer2}>
                  <View style={commonStyle.card}>
                    <View style={styles.gymName}>
                      <Text
                        fontSize={14}
                        fontWeight="normal"
                        lineHeight={20}
                        textAlign="left"
                        text={gymDetails.id}
                        style={styles.gymName}
                      />
                    </View>
                    <View style={styles.column}>
                      <Text
                        fontSize={14}
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
                        fontSize={14}
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
                        fontSize={14}
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
                        fontSize={14}
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
                        // error={touched.city && errors.city}
                        placeholder={{ label: "Select", value: "", key: 0 }}
                        items={cityList ?? []}
                        style={commonStyle.input}
                      />

                      <Text
                        fontSize={14}
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
                        fontSize={14}
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
                        placeholder={{ label: "Select", value: 0, key: 0 }}
                        items={STATUS}
                      />
                    </View>
                  </View>
                </View>
                <View style={commonStyle.bottomButton}>
                  <TouchableOpacity
                    style={commonStyle.submitBtn}
                    onPress={handleSubmit}
                  >
                    <Ionicons name="md-add" size={20} color="white" />
                    <ButtonText>Save</ButtonText>
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
