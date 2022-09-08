import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

import { Timer } from "react-native-stopwatch-timer";

const DisplayTimer = ({ time, timeEnded, duration }) => {
  console.log("### DisplayTimer", time, timeEnded, duration);
  const [isTimerStart, setIsTimerStart] = useState(true);
  const [timerDuration, setTimerDuration] = useState(duration);
  const [resetTimer, setResetTimer] = useState(false);

  const handleFinish = () => {
    setIsTimerStart(false);
  };
  const handleTime = (t) => {
    const tempTime = Math.round((timerDuration - t) / 1000);
    if (tempTime == time) {
      timeEnded();
    }
  };
  return (
    <View style={styles.sectionStyle}>
      <Timer
        totalDuration={timerDuration}
        //Time Duration
        start={isTimerStart}
        //To start
        reset={resetTimer}
        //To reset
        options={options}
        //options for the styling
        handleFinish={handleFinish}
        //can call a function On finish of the time
        // getTime={handleTime}
        getMsecs={handleTime}
      />
    </View>
  );
};

export default DisplayTimer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "v",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  sectionStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    // marginTop: 32,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    // backgroundColor: "#FF0000",
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 7,
  },
};
