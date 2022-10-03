import { Formik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScreenContainer from "./../components/ScreenContainer";
import ScreenLayout from "./../components/ScreenLayout";
import { BLACK, MEDIUM_GREY, WHITE } from "./../constants/colors";
import { INAVLID_USER, REQUIRED_FILEDS } from "./../constants/strings";
import { StyledButton, ButtonText, Colors } from "./../components/styles";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as yup from "yup";
import Text from "../components/common/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/gym";

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const logoImage = require("./../assets/logo_white.png");

export default function Login({ navigation }) {
  const { loginAPI, user } = gymServices();
  const { darkLight } = Colors;
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    loginAPI(values);
  };
  useEffect(() => {
    if (user?.userid) {
      if (user?.type === 3 || user?.type === 4) {
        navigation.navigate("     ", { displayid: user.userid });
      } else {
        navigation.navigate("Welcome");
      }
    }
  }, [user]);
  async function getItem(item) {
    try {
      //  await AsyncStorage.removeItem(item);
      const value = await AsyncStorage.getItem(item);
      console.log(JSON.parse(value), typeof JSON.parse(value));
      const temp = JSON.parse(value);
      console.log("### user", temp?.gym, temp);
      if (temp?.gym) {
        dispatch(setUser(temp));
        navigation.navigate("Welcome");
      }
      return JSON.parse(value);
    } catch (error) {
      // Handle errors here
    }
  }

  useEffect(() => {
    getItem("userInfo");
  }, []);
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
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => onSubmit(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                isValid,
              }) => (
                <View style={styles.container}>
                  <Image
                    style={styles.logoImage}
                    source={logoImage}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      // height: 40,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        left: 20,
                        top: 24,
                      }}
                    >
                      <Ionicons name="person" size={24} color="grey" />
                    </View>
                    <TextInput
                      placeholder="User Name"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      keyboardType="email-address"
                      style={commonStyle.constantInput}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      // height: 40,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        left: 20,
                        top: 24,
                      }}
                    >
                      <MaterialIcons name="lock" size={24} color="grey" />
                    </View>

                    <TextInput
                      placeholder="Password"
                      secureTextEntry={true}
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      isPassword={true}
                      style={commonStyle.constantInput}
                    />
                  </View>
                  {user === "invalid" && (
                    <View style={styles.errorBg}>
                      <Text
                        fontSize={16}
                        color={WHITE}
                        text={INAVLID_USER}
                        textAlign="center"
                      />
                    </View>
                  )}
                  {!isValid && (
                    <View style={styles.errorBg}>
                      <Text
                        fontSize={16}
                        color={WHITE}
                        text={REQUIRED_FILEDS}
                        textAlign="center"
                      />
                    </View>
                  )}
                  <StyledButton onPress={handleSubmit} width={400} round={true}>
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
    fontFamily: "Montserrat-Regular",
  },
  errorBg: {
    backgroundColor: "red",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: 30,
  },
  imgBackground: {
    width: "100%",
    flex: 1,
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 150,
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
