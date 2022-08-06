import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors, StyledButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { GREY, LIGHT_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import Picker from "../components/common/Picker";
import { STATUS } from "../constants/strings";
import commonStyle from "./style/commonStyle";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function AddCategory(props) {
  const { addCategory, isCategoryAdded } = gymServices();

  const { navigation } = props;

  const onSubmit = async (values) => {
    console.log("Submit", values);
    addCategory(values);
  };

  useEffect(() => {
    if (isCategoryAdded) {
      navigation.navigate("Category");
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
          <View style={styles.appContainer}>
            <View style={styles.card}>
              <Formik
                initialValues={{ name: "", status: "" }}
                onSubmit={(values) => onSubmit(values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => (
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
                      onValueChange={(value) => setFieldValue("status", value)}
                      placeholder={{ label: "Select", value: null, key: null }}
                      items={STATUS}
                    />

                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>SUBMIT</ButtonText>
                    </StyledButton>
                  </View>
                )}
              </Formik>
            </View>
          </View>
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
