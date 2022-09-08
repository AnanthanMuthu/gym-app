import { StyleSheet, Dimensions } from "react-native";
import { BLACK, GREY, LIGHT_GREY, WHITE } from "../../constants/colors";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const btn = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 15,
};
const commonStyle = StyleSheet.create({
  appContainer: {
    flex: 7,
  },
  appContainer2: {
    flex: 6,
  },
  appContainer3: {
    flex: 1,
  },
  card: {
    marginTop: 20,
    backgroundColor: WHITE,
    borderRadius: 10,
    width: deviceWidth - 100,
    margin: 50,
    padding: 50,
  },
  card2: {
    marginTop: 20,
    width: deviceWidth - 20,
    padding: 40,
  },
  cardHead: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
    margin: 20,
  },
  input: {
    fontSize: 14,
    minHeight: 30,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    borderColor: GREY,
    textAlign: "left",
  },
  datePickerStyle: {
    fontSize: 14,
    minHeight: 30,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    borderColor: GREY,
    textAlign: "left",
    width: 200,
  },
  dateInner: {
    dateIcon: {
      display: "none",
      padding: 0,
      margin: 0,
    },
    dateInput: {
      padding: 0,
      margin: 0,
      borderWidth: 0,
      width: "100%",
    },
  },
  constantInput: {
    fontSize: 20,
    minWidth: 400,
    minHeight: 50,
    marginTop: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: WHITE,
    borderRadius: 20,
    textAlign: "center",
  },
  bottomButton: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  attachButton: {
    marginTop: 20,
  },
  submitBtn: {
    ...btn,
    backgroundColor: "#ae8f73",
    padding: 12,
    width: 400,
  },
  topRightBtn: {
    ...btn,
    backgroundColor: "#ae8f73",
    padding: 10,
    marginRight: 10,
    minWidth: 180,
  },
  fileBtn: {
    ...btn,
    backgroundColor: BLACK,
    padding: 12,
    width: 400,
  },
  addSession: {
    ...btn,
    backgroundColor: BLACK,
    padding: 12,
    width: 180,
  },
  smallBtn: {
    ...btn,
    backgroundColor: "#ae8f73",
    height: 30,
    fontSize: 12,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  noRecords: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default commonStyle;
