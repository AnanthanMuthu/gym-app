import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScreenContainer from "./../components/ScreenContainer";
import ScreenLayout from "./../components/ScreenLayout";
import { MEDIUM_GREY } from "./../constants/colors";
import { CATEGORIES } from "./../constants/strings";

export default function Welcome({ navigation }) {
  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <View style={styles.appContainer}>
            {CATEGORIES?.map((el, key) => (
              <TouchableOpacity
                key={key}
                style={[styles.imgView, el.id % 2 === 0 ? styles.imgView2 : ""]}
                onPress={() => navigation.navigate(el.route)}
              >
                <Image
                  style={styles.tinyLogo}
                  source={el.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
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
  imgView: {
    // marginTop: 5,
    width: 330,
    height: 290,
  },
  imgView2: {
    marginLeft: 15,
  },
  tinyLogo: {
    width: "100%",
  },
});
