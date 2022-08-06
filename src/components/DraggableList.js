import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View, ScrollView } from "react-native";
import DragSortableView from "./DragSortableView";
import { Ionicons } from "@expo/vector-icons";
import { BLACK, WHITE } from "../constants/colors";
import Text from "../components/common/Text";

const { width, height } = Dimensions.get("window");

const parentWidth = width;
const childrenWidth = width - 50;
const childrenHeight = 48;

function DraggableList(props) {
  const { scheduleList, updateList } = props;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const onDragEnd = (s, e) => {
    const tempArr = JSON.parse(JSON.stringify(scheduleList));
    let newArr = JSON.parse(JSON.stringify(scheduleList));
    newArr[s] = tempArr[e];
    newArr[e] = tempArr[s];
    newArr[s].orderid = scheduleList[e].orderid;
    newArr[e].orderid = scheduleList[s].orderid;
    console.log(
      "### drag end",
      s,
      e,
      newArr[s].orderid,
      newArr[e].orderid,
      newArr,
      tempArr
    );
    updateList(newArr);
    setScrollEnabled(true);
  };

  const renderItem = (item, index) => {
    return (
      <View style={styles.item} key={index}>
        <View style={styles.item_children}>
          <View style={styles.childItem2}>
            <Ionicons name="play" size={20} color="black" />
            <Text
              fontSize={14}
              fontWeight="normal"
              lineHeight={20}
              textAlign="left"
              color={BLACK}
              text={item.name}
            />
          </View>
          <View style={styles.childItem2}>
            <Ionicons name="hourglass-outline" size={20} color="black" />
            <Text
              fontSize={14}
              fontWeight="normal"
              lineHeight={20}
              textAlign="left"
              text={item.duration}
            />
          </View>
          <Text
            fontSize={14}
            fontWeight="normal"
            lineHeight={20}
            textAlign="left"
            text={item.catname}
            color="black"
          />

          <Ionicons name="trash-outline" size={20} color="black" />
        </View>
      </View>
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
        onDragEnd={(s, e) => onDragEnd(s, e)}
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

export default DraggableList;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    // height: height - 450,
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
