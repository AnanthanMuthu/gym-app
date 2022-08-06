import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, StyledSmallButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import { STATUS } from "../constants/strings";
import { getStatus } from "./helper";

export default function CategoryList({ navigation }) {
  const { getCategoryList, categoryList, deleteCategory } = gymServices();
  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {}, [categoryList]);
  if (categoryList?.length <= 0) {
    return null;
  }

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
                {categoryList?.map((el, key) => (
                  <View style={styles.card} key={key}>
                    <View style={styles.row}>
                      <View>
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
                          text="Status"
                          color={DARK_GREY}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="bold"
                          lineHeight={20}
                          textAlign="left"
                          color="green"
                          text={getStatus(el.status)}
                        />
                      </View>
                      <View>
                        <TouchableOpacity
                          style={commonStyle.smallBtn}
                          onPress={(e) => {
                            e.preventDefault();
                            navigation.navigate("Edit Category", {
                              categoryDetails: el,
                            });
                          }}
                        >
                          <Ionicons name="md-pencil" size={20} color="white" />
                          <ButtonText>Edit</ButtonText>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={commonStyle.smallBtn}
                          onPress={() => deleteCategory({ id: el.id })}
                        >
                          <Ionicons name="md-close" size={20} color="white" />
                          <ButtonText>Delete</ButtonText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={commonStyle.bottomButton}>
            <TouchableOpacity
              style={commonStyle.submitBtn}
              onPress={() => navigation.navigate("Add Category")}
            >
              <Ionicons name="md-add" size={20} color="white" />
              <ButtonText>Add category</ButtonText>
            </TouchableOpacity>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 10,
    width: 330,
    height: 120,
    margin: 10,
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
    width: 135,
    paddingLeft: 10,
  },
});
