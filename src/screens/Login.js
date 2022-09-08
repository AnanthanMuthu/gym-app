import { Formik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScreenContainer from "./../components/ScreenContainer";
import ScreenLayout from "./../components/ScreenLayout";
import { BLACK, MEDIUM_GREY, WHITE } from "./../constants/colors";
import { StyledButton, ButtonText, Colors } from "./../components/styles";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";

export default function Login({ navigation }) {
  const { loginAPI, user } = gymServices();
  const { darkLight } = Colors;
  const onSubmit = async (values) => {
    loginAPI(values);
  };
  useEffect(() => {
    if (user?.userid) {
      if (user?.type === 3 || user?.type === 4) {
        navigation.navigate("     ");
      } else {
        navigation.navigate("Welcome");
      }
    }
  }, [user]);
  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/login_bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout>
          <View style={styles.appContainer}>
            <Formik
              initialValues={{
                username: "106Yard",
                password: "2021",
              }}
              onSubmit={(values) => onSubmit(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                  <TextInput
                    placeholder="xxxx@xxx.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    keyboardType="email-address"
                    style={commonStyle.constantInput}
                  />

                  <TextInput
                    placeholder="Xxxxxxxxx"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    isPassword={true}
                    style={commonStyle.constantInput}
                  />
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>SIGN IN</ButtonText>
                  </StyledButton>
                </View>
              )}
            </Formik>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  imgBackground: {
    width: "100%",
    flex: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: BLACK,
    minWidth: 400,
    minHeight: 50,
    color: WHITE,
    alignItems: "center",
  },
});
