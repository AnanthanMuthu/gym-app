import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

export const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView stlye={{ flex: 1 }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
