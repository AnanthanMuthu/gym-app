import React, { useEffect } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors, StyledSmallButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function ViewGymDetails(props) {
  const { deleteGym, getGymList, isGymDeleted } = gymServices();

  const {
    navigation,
    route: {
      params: { gymDetails },
    },
  } = props;

  useEffect(() => {
    if (isGymDeleted) {
      getGymList();
      console.log("### isGymDeleted", isGymDeleted);
      navigation.navigate("Gym List");
    }
  }, [isGymDeleted]);

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
              <View style={styles.row}>
                <View style={styles.gymName}>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.name}
                    style={styles.gymName}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="ID"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.id}
                  />
                </View>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="TimeZone"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.timezone}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Address"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.address}
                  />
                </View>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Status"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.status}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="User Name"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.name}
                  />
                </View>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Mobile"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.mobile}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="City"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={gymDetails.city}
                  />
                </View>
                <View>
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    lineHeight={20}
                    textAlign="left"
                    text="Password"
                    color={DARK_GREY}
                  />
                  <Text
                    fontSize={14}
                    fontWeight="bold"
                    lineHeight={20}
                    textAlign="left"
                    text={"reset"}
                  />
                </View>
              </View>
              <View style={styles.row2}>
                <StyledSmallButton
                  onPress={(e) => {
                    e.preventDefault();
                    navigation.navigate("Edit Gym Details", {
                      gymDetails: gymDetails,
                    });
                  }}
                >
                  <Ionicons name="md-pencil" size={20} color="white" />
                  <ButtonText>Edit</ButtonText>
                </StyledSmallButton>
                <StyledSmallButton
                  onPress={() => deleteGym({ id: gymDetails.id })}
                >
                  <ButtonText>Delete</ButtonText>
                </StyledSmallButton>
              </View>
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
    margin: 10,
    padding: 20,
  },
  row: {
    flexDirection: "row",
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
