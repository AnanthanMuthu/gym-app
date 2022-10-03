import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Vimeo } from "react-native-vimeo-iframe";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import DisplayTimer from "../components/DisplayTimer";
import { BLACK } from "../constants/colors";
import gymServices from "../services/gymServices";
import { dateCheck, formatDate } from "./helper";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
let i = 0;
const logoImage = require("./../assets/login_bg.jpg");

const VideoPlayer = (props) => {
  const {
    scheduleDisplayList,
    scheduleDisplay,
    getScheduleDisplay,
    getScheduleDisplayList,
  } = gymServices();
  const baseUrl = "https://doonew.com/yard/";
  const [playItem, setPlayItem] = useState(true);
  const [totalDurationFromList, setTotalDuration] = useState(0);

  useEffect(() => {
    console.log("### player props", props);
    const date = props?.route?.params?.date
      ? new Date(props?.route?.params?.date)
      : new Date();
    getScheduleDisplay({
      display: props?.route?.params?.displayid,
      sdate: formatDate(date),
    });
  }, []);

  useEffect(() => {
    if (scheduleDisplay?.length > 0) {
      console.log("### scheduleDisplay", scheduleDisplay);
      scheduleDisplay.forEach((el) => {
        const isCurrent = dateCheck(
          new Date(el.sdatetime).toISOString(),
          new Date(el.edatetime).toISOString(),
          new Date().toISOString()
        );
        console.log(
          "### isCurrent",
          isCurrent,
          new Date(el.sdatetime).toISOString(),
          new Date(el.edatetime).toISOString(),
          new Date().toISOString()
        );
        if (isCurrent) {
          getScheduleDisplayList({
            scheduleid: el.scheduleid,
          });
        }
      });
    }
  }, [scheduleDisplay]);

  function add(accumulator, a) {
    console.log("accumulator, a", accumulator, a.duration);
    return accumulator + a.duration;
  }

  useEffect(() => {
    console.log("### scheduleDisplayList", scheduleDisplayList);
    if (scheduleDisplayList) {
      setPlayItem(scheduleDisplayList[0]);
      const sum = scheduleDisplayList.reduce(add, 0);

      setTotalDuration(sum);
    }
  }, [scheduleDisplayList]);

  const videoCallbacks = {
    // timeupdate: (data) => console.log("timeupdate: ", data),
    play: (data) => console.log("play: ", data),
    pause: (data) => console.log("pause: ", data),
    fullscreenchange: (data) => console.log("fullscreenchange: ", data),
    ended: (data) => {
      i++;
      setPlayItem(scheduleDisplayList[i]);
      console.log("ended: ", playItem, data);
    },
    controlschange: (data) => console.log("controlschange: ", data),
  };
  const timeEnded = () => {
    i++;
    setPlayItem(scheduleDisplayList[i]);
    console.log("### Ended", i, playItem, scheduleDisplayList[i]);
  };
  const r = /(videos|video|channels|\.com)\/([\d]+)/;
  let videoId = "";
  if (playItem?.type === 1) {
    videoId = playItem?.content?.match(r)[2];
    console.log("### videoId", videoId);
  }

  return (
    <SafeAreaProvider>
      <ScreenContainer backgroundType="color" backgroundColor={BLACK}>
        <ScreenLayout>
          {playItem?.duration ? (
            <DisplayTimer
              duration={totalDurationFromList * 1000}
              time={playItem?.duration}
              timeEnded={timeEnded}
            />
          ) : null}
          {playItem?.type === 3 ? (
            <Image
              style={styles.uploadedImage}
              source={{
                uri: baseUrl + playItem.content,
              }}
              resizeMode="stretch"
            />
          ) : videoId ? (
            <Vimeo
              videoId={videoId}
              params={"api=1&autoplay=1"}
              handlers={videoCallbacks}
              style={styles.video}
            />
          ) : (
            <Image
              style={styles.uploadedImage}
              source={logoImage}
              resizeMode="stretch"
            />
          )}
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  uploadedImage: {
    zIndex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
  video: {
    zIndex: 1,
  },
});
export default VideoPlayer;
