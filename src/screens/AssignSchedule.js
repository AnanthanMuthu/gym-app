import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { GREY, LIGHT_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import Picker from "../components/common/Picker";
import commonStyle from "./style/commonStyle";
import * as yup from "yup";
import Text from "../components/common/Text";
import { REQUIRED_FILEDS } from "../constants/strings";

const validationSchema = yup.object().shape({
  category: yup.string().required(),
  play: yup.string().required(),
});

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function AssignSchedule(props) {
  const { getCatBasedPlayList, catPlayList, getCategoryList, modCategoryList } =
    gymServices();

  const { navigation, route } = props;

  const onSubmit = async (values) => {
    console.log("Submit", values, route);
    navigation.navigate(route?.params?.routeFrom, {
      scheduleData: values,
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  const onCategoryChange = (setFieldValue, value) => {
    getCatBasedPlayList({ cat: value });
    setFieldValue("category", value);
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
            initialValues={{ category: "", play: "" }}
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
                  <View style={commonStyle.card}>
                    <View style={styles.column}>
                      <Picker
                        value={values.category}
                        onValueChange={(value) =>
                          onCategoryChange(setFieldValue, value)
                        }
                        placeholder={{
                          label: "Select Category",
                          value: null,
                          key: null,
                        }}
                        items={modCategoryList ?? []}
                      />
                      <Picker
                        value={values.play}
                        onValueChange={(value) => setFieldValue("play", value)}
                        placeholder={{
                          label: "Select Play",
                          value: null,
                          key: null,
                        }}
                        items={catPlayList ?? []}
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
