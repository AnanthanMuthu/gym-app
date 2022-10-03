import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText, Colors } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import { getStatus } from "./helper";
import Norecords from "../components/common/Norecords";
import ConfirmPopup from "../components/ConfirmPopup";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const halfWidth = deviceWidth / 2;

export default function CategoryList({ navigation }) {
  const { getCategoryList, categoryList, deleteCategory } = gymServices();
  useEffect(() => {
    getCategoryList();
  }, []);
  const [searchText, setSearchText] = useState("");
  const [modCategoryList, setCategoryList] = useState([]);

  //delete
  const [showPopup, setShowPopup] = useState(false);
  const [delleteId, setId] = useState(null);
  const ondelete = (id) => {
    console.log("### showPopup", showPopup);
    setShowPopup(false);
    if (id) {
      setShowPopup(true);
      setId(id);
    } else {
      deleteCategory({ id: delleteId });
    }
  };
  const setModalVisible = () => {
    setShowPopup(!showPopup);
  };
  //end

  const { darkLight } = Colors;
  useEffect(() => {
    if (categoryList) {
      setCategoryList(categoryList);
    }
  }, [categoryList]);
  const handleTextChange = (text) => {
    setSearchText(text);
    console.log("### text", text);
    const temp = text
      ? categoryList?.filter((el) => {
          const name = el?.name?.toLowerCase();
          const tempText = text?.toLowerCase();

          return name?.includes(tempText);
        })
      : [];
    setCategoryList(text ? temp : categoryList);
  };

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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 20,
                  marginLeft: 20,
                }}
              >
                <TextInput
                  placeholder="Search by Name"
                  placeholderTextColor={darkLight}
                  value={searchText}
                  onChangeText={handleTextChange}
                  keyboardType="email-address"
                  style={commonStyle.constantInput3}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    right: 130,
                    top: 52,
                  }}
                  onPress={() => handleTextChange(searchText)}
                >
                  <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={commonStyle.cardHead}>
                {modCategoryList?.length <= 0 ? (
                  <Norecords />
                ) : (
                  modCategoryList?.map((el, key) => (
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
                            color={el.status === 1 ? "green" : "red"}
                            text={el.status === 1 ? "Active" : "Inactive"}
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
                            <FontAwesome5
                              name="pencil-alt"
                              size={16}
                              color="white"
                            />
                            <ButtonText>Edit</ButtonText>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={commonStyle.smallBtn}
                            onPress={() => ondelete(el.id)}
                          >
                            <Ionicons name="trash" size={18} color="white" />
                            <ButtonText>Delete</ButtonText>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                )}
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
          {showPopup ? (
            <ConfirmPopup
              onConfirm={ondelete}
              showConfirm={showPopup}
              setModalVisible={setModalVisible}
            />
          ) : null}
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 22,
    width: halfWidth - 40,
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
