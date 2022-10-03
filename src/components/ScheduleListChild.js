import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DragSortableView from "./DragSortableView";
import { Ionicons } from "@expo/vector-icons";
import { BLACK, WHITE } from "../constants/colors";
import Text from "./common/Text";
import gymServices from "../services/gymServices";

const { width, height } = Dimensions.get("window");

const parentWidth = width;
const childrenWidth = width - 50;
const childrenHeight = 48;

function formatTime(date) {
  date = new Date(date);
  if (date) {
    let hours = date?.getHours();
    let minutes = date?.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + ampm;
  }
  return "";
}

function ScheduleListChild(props) {
  const { scheduleList, navigation } = props;
  const { sessionList, user } = gymServices();
  const [scrollEnabled, setScrollEnabled] = useState(true);

  function getSessionName(id) {
    const foundType = sessionList?.find((el) => el.id === id);
    return foundType?.name ?? "";
  }

  const onItemPress = (item) => {
    navigation.navigate("     ", {
      date: item.sdatetime,
      displayid: item.displayid,
    });
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() => onItemPress(item)}
      >
        <View style={styles.item_children}>
          <View style={styles.childItem2}>
            <Ionicons name="play" size={20} color="black" />
            <Text
              fontSize={14}
              fontWeight="normal"
              lineHeight={20}
              textAlign="left"
              color={BLACK}
              text={
                formatTime(item.sdatetime) + " " + formatTime(item.edatetime)
              }
            />
          </View>

          <Text
            fontSize={14}
            fontWeight="normal"
            lineHeight={20}
            textAlign="left"
            text={item.displayname}
            color="black"
          />
          {user?.type === 1 ? (
            <Ionicons name="trash-outline" size={20} color="black" />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView scrollEnabled={scrollEnabled} style={styles.container}>
      <DragSortableView
        dataSource={scheduleList}
        parentWidth={parentWidth}
        childrenWidth={childrenWidth}
        childrenHeight={childrenHeight}
        scaleStatus={"scaleY"}
        onDragStart={(startIndex, endIndex) => setScrollEnabled(false)}
        onDragEnd={(startIndex) => setScrollEnabled(true)}
        onDataChange={(data) => {
          if (scheduleList.length != scheduleList.length) {
            this.setState({
              scheduleList: data,
            });
          }
        }}
        keyExtractor={(item, index) => item.txt}
        onClickItem={(data, item, index) => {}}
        renderItem={(item, index) => renderItem(item, index)}
      />
    </ScrollView>
  );
}

export default ScheduleListChild;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  item_children: {
    width: childrenWidth,
    height: childrenHeight - 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: WHITE,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  childItem2: {
    flexDirection: "row",
  },
  item_icon: {
    width: childrenHeight * 0.6,
    height: childrenHeight * 0.6,
    marginLeft: 15,
    resizeMode: "contain",
  },
  item_text: {
    marginRight: 15,
    color: "#2ecc71",
  },
});
