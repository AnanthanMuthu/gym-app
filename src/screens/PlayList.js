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
import { ButtonText, Colors, StyledSmallButton } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { BLACK, DARK_GREY, MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import Norecords from "../components/common/Norecords";
import ConfirmPopup from "../components/ConfirmPopup";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const halfWidth = deviceWidth / 2;

export default function PlayList({ navigation }) {
  const { getPlayList, playList, deletePlay, playErrorMsg } = gymServices();
  useEffect(() => {
    getPlayList();
  }, []);
  const [searchText, setSearchText] = useState("");
  const [modplayList, setplayList] = useState([]);
  const [showError, setError] = useState(false);
  const { darkLight } = Colors;

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
      deletePlay({ id: delleteId });
    }
  };
  const setModalVisible = () => {
    setShowPopup(!showPopup);
  };
  //end

  useEffect(() => {
    setplayList(playList);
  }, [playList]);
  console.log("### playErrorMsg", playErrorMsg);
  useEffect(() => {
    if (playErrorMsg) setError(true);
    setTimeout(() => {
      setError(false);
    }, 30000);
  }, [playErrorMsg]);

  const handleTextChange = (text) => {
    setSearchText(text);
    console.log("### text", text);
    const temp = text
      ? playList?.filter((el) => {
          const name = el?.name?.toLowerCase();
          const tempText = text?.toLowerCase();

          return name?.includes(tempText);
        })
      : [];
    setplayList(text ? temp : playList);
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
                  placeholder="Search Category"
                  placeholderTextColor={darkLight}
                  value={searchText}
                  onChangeText={handleTextChange}
                  keyboardType="email-address"
                  style={commonStyle.constantInput2}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    right: 50,
                    top: 52,
                  }}
                  onPress={() => handleTextChange(searchText)}
                >
                  <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
              </View>
              {showError ? (
                <View style={commonStyle.error}>
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    lineHeight={25}
                    textAlign="center"
                    text="Please play remove from session!"
                  />
                </View>
              ) : null}
              <View style={commonStyle.cardHead}>
                {modplayList?.length <= 0 ? (
                  <Norecords />
                ) : (
                  modplayList?.map((el, key) => (
                    <TouchableOpacity style={styles.card} key={key}>
                      <View style={styles.row}>
                        <View style={styles.categoryName}>
                          <Text
                            fontSize={13}
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
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="ID"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            color={BLACK}
                            text={String(el?.id ?? "")}
                          />
                        </View>
                        <View>
                          <Text
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Category"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
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
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Type"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            color={BLACK}
                            text={el.type}
                          />
                        </View>
                        <View>
                          <Text
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Status"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="bold"
                            lineHeight={20}
                            textAlign="left"
                            color={el.status === 1 ? "green" : "red"}
                            text={el.status === 1 ? "Active" : "Inactive"}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.firstItem2}>
                          <Text
                            fontSize={13}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text="Description"
                            color={DARK_GREY}
                          />
                          <Text
                            fontSize={13}
                            fontWeight="normal"
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
                          <FontAwesome5
                            name="pencil-alt"
                            size={12}
                            color="white"
                          />
                          <ButtonText>Edit</ButtonText>
                        </StyledSmallButton>
                        <StyledSmallButton onPress={() => ondelete(el.id)}>
                          <Ionicons name="trash" size={20} color="white" />
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
    width: halfWidth - 40,
    height: 310,
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
    justifyContent: "flex-start",
    fontWeight: "bold",
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    maxWidth: halfWidth - 140,
  },
  firstItem: {
    width: 180,
    paddingLeft: 10,
  },
  firstItem2: {
    paddingLeft: 10,
  },
});
