import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, StyledSmallButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { BLACK, DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";

export default function PlayList({ navigation }) {
  const { getPlayList, playList, deletePlay } = gymServices();
  useEffect(() => {
    getPlayList();
  }, []);

  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <View style={commonStyle.appContainer}>
            <ScrollView>
              <View style={commonStyle.cardHead}>
                {playList?.length <= 0 ? (
                  <Text
                    fontSize={14}
                    lineHeight={60}
                    style={commonStyle.noRecords}
                    color={WHITE}
                    text="No Records found"
                  />
                ) : (
                  playList?.map((el, key) => (
                    <TouchableOpacity style={styles.card} key={key}>
                      <View style={styles.row}>
                        <View style={styles.categoryName}>
                          <Text
                            fontSize={14}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text={el.name}
                            style={styles.categoryName}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
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
                            color={BLACK}
                            text={el.id}
                          />
                        </View>
                        <View>
                          <Text
                            fontSize={14}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Category"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={14}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            color={BLACK}
                            text={el.category}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
                          <Text
                            fontSize={14}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Type"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={14}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            color={BLACK}
                            text={el.type}
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
                            color={BLACK}
                            text="Active"
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem}>
                          <Text
                            fontSize={14}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Description"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={14}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            color={BLACK}
                            text={el.description}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <StyledSmallButton
                          onPress={(e) => {
                            e.preventDefault();
                            navigation.navigate("Edit Play", {
                              playDetails: el,
                            });
                          }}
                        >
                          <Ionicons name="md-pencil" size={20} color="white" />
                          <ButtonText>Edit</ButtonText>
                        </StyledSmallButton>
                        <StyledSmallButton
                          onPress={() => deletePlay({ id: el.id })}
                        >
                          <Ionicons name="md-close" size={20} color="white" />
                          <ButtonText>Delete</ButtonText>
                        </StyledSmallButton>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
          <View style={commonStyle.bottomButton}>
            <TouchableOpacity
              style={commonStyle.submitBtn}
              onPress={() => navigation.navigate("Add Play")}
            >
              <Ionicons name="md-add" size={20} color="white" />
              <ButtonText>Add Play</ButtonText>
            </TouchableOpacity>
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
    width: 330,
    height: 290,
    margin: 10,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    textAlign: "left",
  },
  icon: {
    height: 15,
  },
  categoryName: {
    padding: 5,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  firstItem: {
    width: 180,
    paddingLeft: 10,
  },
});
