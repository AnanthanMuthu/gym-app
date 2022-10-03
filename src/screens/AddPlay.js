import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Text from "../components/common/Text";
import { ButtonText } from "../components/styles";
import ScreenContainer from "../components/ScreenContainer";
import ScreenLayout from "../components/ScreenLayout";
import { BLUE, MEDIUM_GREY } from "../constants/colors";
import { Formik } from "formik";
import gymServices from "../services/gymServices";
import * as DocumentPicker from "expo-document-picker";
import commonStyle from "./style/commonStyle";
import { Ionicons } from "@expo/vector-icons";
import { FILE_TYPES, REQUIRED_FILEDS, STATUS } from "../constants/strings";
import Picker from "../components/common/Picker";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  duration: yup.string().required(),
  type: yup.number().required(),
  imgfiles: yup.object().when("type", {
    is: 3,
    then: yup.object().required(),
  }),
  content: yup.string().when("type", {
    is: 1,
    then: yup.string().required(),
  }),
  status: yup.string().required(),
});

export default function AddPlay(props) {
  const { getCategoryList, modCategoryList, addPlay, isPlayAdded } =
    gymServices();
  const onSubmit = async (values, resetForm) => {
    console.log("onSubmit", values);
    if (values.type === 1) {
      values.imgfiles = null;
    }
    addPlay(values);
    resetForm();
  };
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (isPlayAdded) {
      // navigation.navigate("Plays");
      setShowInfo(true);
    }
  }, [isPlayAdded]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const pickDocument = async (setFieldValue) => {
    await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        const fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        console.log(fileToUpload, "...............file");
        setFieldValue("imgfiles", fileToUpload);
      }
    });
  };

  return (
    <SafeAreaProvider>
      <ScreenContainer
        backgroundType="image"
        backgroundImage={require("./../assets/bg.jpg")}
        backgroundColor={MEDIUM_GREY}
      >
        <ScreenLayout paddingHorizontal={0} paddingBottom={0} useSafeArea>
          <Formik
            initialValues={{
              name: "",
              status: "",
              category: "",
              description: "",
              duration: "",
              type: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              isValid,
              touched,
              submitCount,
            }) => {
              return (
                <>
                  <View style={commonStyle.appContainer2}>
                    {showInfo ? (
                      <View style={commonStyle.success}>
                        <Text
                          fontSize={24}
                          fontWeight="bold"
                          lineHeight={25}
                          textAlign="center"
                          text="Successfully Created."
                        />
                      </View>
                    ) : null}
                    <View style={commonStyle.card}>
                      <View style={styles.column}>
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="Name"
                        />
                        <TextInput
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          value={values.name}
                          style={commonStyle.input}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="Description"
                        />
                        <TextInput
                          onChangeText={handleChange("description")}
                          onBlur={handleBlur("description")}
                          value={values.description}
                          style={commonStyle.input}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="Category"
                        />
                        <Picker
                          value={values.category}
                          onValueChange={(value) =>
                            setFieldValue("category", value)
                          }
                          placeholder={{
                            label: "Select Category",
                            value: "",
                            key: "",
                          }}
                          items={modCategoryList}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="Status"
                        />
                        <Picker
                          value={values.status}
                          onValueChange={(value) =>
                            setFieldValue("status", value)
                          }
                          placeholder={{
                            label: "Select Status",
                            value: "",
                            key: "",
                          }}
                          items={STATUS}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="Duration(Seconds)"
                        />
                        <TextInput
                          onChangeText={handleChange("duration")}
                          onBlur={handleBlur("duration")}
                          value={values.duration}
                          style={commonStyle.input}
                          keyboardType="numeric"
                        />
                        <Text
                          fontSize={14}
                          fontWeight="normal"
                          lineHeight={20}
                          textAlign="left"
                          text="File Type"
                        />
                        <Picker
                          value={values.type}
                          onValueChange={(value) =>
                            setFieldValue("type", value)
                          }
                          placeholder={{
                            label: "Select File Type",
                            value: "",
                            key: "",
                          }}
                          items={FILE_TYPES}
                        />
                        {values.type === 3 ? (
                          <View style={commonStyle.attachButton}>
                            <TouchableOpacity
                              style={commonStyle.fileBtn}
                              onPress={() => pickDocument(setFieldValue)}
                            >
                              <ButtonText>Attach file</ButtonText>
                              <Ionicons
                                name="md-attach-outline"
                                size={20}
                                color="white"
                              />
                            </TouchableOpacity>
                          </View>
                        ) : values.type === 1 ? (
                          <>
                            <Text
                              fontSize={14}
                              fontWeight="normal"
                              lineHeight={20}
                              textAlign="left"
                              text="Video URL"
                            />
                            <TextInput
                              onChangeText={handleChange("content")}
                              onBlur={handleBlur("content")}
                              value={values.content}
                              style={commonStyle.input}
                            />
                          </>
                        ) : null}

                        {values?.imgfiles && values.type === 3 ? (
                          <View style={styles.file}>
                            <Image
                              style={styles.uploadedImage}
                              source={{
                                uri: values?.imgfiles?.uri,
                              }}
                              resizeMode="contain"
                            />
                          </View>
                        ) : null}
                        {!isValid && touched && submitCount > 0 && (
                          <View style={{ marginTop: 10 }}>
                            <Text
                              fontSize={16}
                              color="red"
                              text={REQUIRED_FILEDS}
                              textAlign="center"
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={commonStyle.bottomButton}>
                    <TouchableOpacity
                      style={commonStyle.submitBtn}
                      onPress={handleSubmit}
                    >
                      <ButtonText>SUBMIT</ButtonText>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          </Formik>
        </ScreenLayout>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  uploadedImage: {
    width: 200,
    height: 100,
    borderRadius: 20,
  },
  file: {
    fontSize: 20,
    minHeight: 30,
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: BLUE,
  },
});
