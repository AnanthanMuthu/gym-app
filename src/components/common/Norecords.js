import React from "react";
import { View } from "react-native";
import { WHITE } from "../../constants/colors";
import commonStyle from "../../screens/style/commonStyle";
import Text from "./Text";

const Norecords = () => {
  return (
    <View style={commonStyle.noRecords}>
      <Text
        fontSize={14}
        lineHeight={60}
        color={WHITE}
        text="No Records found."
      />
    </View>
  );
};

export default Norecords;
