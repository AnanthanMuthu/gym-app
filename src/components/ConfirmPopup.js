import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { BLACK, DARK_GREY, GREY } from "../constants/colors";

const ConfirmPopup = ({ onConfirm, showConfirm, setModalVisible }) => {
  const onClickConfirm = () => {
    onConfirm(false);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirm}
        onRequestClose={() => {
          setModalVisible(!showConfirm);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete?</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={onClickConfirm}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginLeft: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#ae8f73",
  },
  buttonClose: {
    borderColor: GREY,
    backgroundColor: DARK_GREY,
    color: BLACK,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ConfirmPopup;
