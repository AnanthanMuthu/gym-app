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
import { MEDIUM_GREY, WHITE } from "../constants/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import gymServices from "../services/gymServices";
import commonStyle from "./style/commonStyle";
import Picker from "../components/common/Picker";
import Norecords from "../components/common/Norecords";
import ConfirmPopup from "../components/ConfirmPopup";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const halfWidth = deviceWidth / 2;

export default function SessionList({ navigation }) {
  const {
    getSessionList,
    getGymList,
    cloneSession,
    deleteSession,
    sessionList,
    modGymList,
  } = gymServices();
  useEffect(() => {
    getSessionList();
    getGymList();
  }, []);
  const [searchText, setSearchText] = useState("");
  const [modSessionList, setSessionList] = useState([]);

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
      deleteSession({ id: delleteId });
    }
  };
  const setModalVisible = () => {
    setShowPopup(!showPopup);
  };
  //end
  const { darkLight } = Colors;
  useEffect(() => {
    if (sessionList) {
      setSessionList(sessionList);
    }
  }, [sessionList]);
  const handleTextChange = (text) => {
    setSearchText(text);
    console.log("### text", text);
    const temp = text
      ? sessionList?.filter((el) => {
          const name = el?.name?.toLowerCase();
          const tempText = text?.toLowerCase();

          return name?.includes(tempText);
        })
      : [];
    setSessionList(text ? temp : sessionList);
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
                {modSessionList?.length <= 0 ? (
                  <Norecords />
                ) : (
                  modSessionList?.map((el, key) => (
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
                          <Text
                            fontSize={14}
                            fontWeight="normal"
                            lineHeight={20}
                            textAlign="left"
                            text={`Duration : ${el.duration ?? "-"}`}
                            style={styles.duration}
                          />
                        </View>
                      </View>

                      <View style={styles.row}>
                        <View>
                          <TouchableOpacity
                            style={commonStyle.smallBtn}
                            onPress={() => ondelete(el.id)}
                          >
                            <Ionicons name="trash" size={20} color="white" />
                            <ButtonText>Delete</ButtonText>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={commonStyle.smallBtn}
                            onPress={() => cloneSession({ id: el.id })}
                          >
                            <Ionicons name="md-copy" size={20} color="white" />
                            <ButtonText>Clone</ButtonText>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={commonStyle.smallBtn}
                            onPress={(e) => {
                              e.preventDefault();
                              navigation.navigate("Edit Session", {
                                sessionDetails: el,
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
                      </View>
                    </View>
                  ))
                )}
              </View>
              {showPopup ? (
                <ConfirmPopup
                  onConfirm={ondelete}
                  showConfirm={showPopup}
                  setModalVisible={setModalVisible}
                />
              ) : null}
            </ScrollView>
          </View>
          <View style={commonStyle.bottomButton}>
            <TouchableOpacity
              style={commonStyle.submitBtn}
              onPress={() => navigation.navigate("Session Create")}
            >
              <Ionicons name="add" size={24} color="white" />
              <ButtonText fontSize={18}>Create Session</ButtonText>
            </TouchableOpacity>
          </View>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gymSelect: {
    flex: 3,
    marginRight: 10,
    justifyContent: "center",
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 22,
    width: halfWidth - 40,
    minHeight: 140,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    textAlign: "left",
    alignItems: "baseline",
  },
  icon: {
    height: 15,
  },
  duration: {
    padding: 5,
    justifyContent: "flex-start",
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
