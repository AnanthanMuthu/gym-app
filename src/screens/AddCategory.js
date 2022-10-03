import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { GREY, LIGHT_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import Picker from "../components/common/Picker";
import { REQUIRED_FILEDS, STATUS } from "../constants/strings";
import commonStyle from "./style/commonStyle";
import { Ionicons } from "@expo/vector-icons";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
});

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function AddCategory(props) {
  const { addCategory, isCategoryAdded, categoryList } = gymServices();
  const [showInfo, setShowInfo] = useState(false);
  const [showText, setShowText] = useState("");

  const onSubmit = async (values, resetForm) => {
    const found = categoryList?.findIndex((el) => el.name === values?.name);
    if (found >= 0) {
      setShowInfo(true);
      setShowText("Category already exist! ");
    } else {
      addCategory(values);
      resetForm();
    }
  };

  useEffect(() => {
    if (isCategoryAdded) {
      // navigation.navigate("Category");
      setShowInfo(true);
      setShowText("Successfully Created.");
    }
  }, [isCategoryAdded]);

  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <Formik
            initialValues={{ name: "", status: "" }}
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
                  {showInfo ? (
                    <View
                      style={
                        showText === "Successfully Created."
                          ? commonStyle.success
                          : commonStyle.error
                      }
                    >
                      <Text
                        fontSize={24}
                        fontWeight="bold"
                        lineHeight={25}
                        textAlign="center"
                        text={showText}
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
                        text="Status"
                      />
                      <Picker
                        value={values.status}
                        onValueChange={(value) =>
                          setFieldValue("status", value)
                        }
                        placeholder={{
                          label: "Select",
                          value: null,
                          key: null,
                        }}
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
                    <ButtonText>SUBMIIT</ButtonText>
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
    borderRadius: 22,
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
