import React from "react";
import RNPickerSelect from "react-native-picker-select";

import { PickerContainer, ErrorMessage, Container } from "./styles";

const Picker = ({ error, ...otherProps }) => (
  <Container>
    <PickerContainer>
      <RNPickerSelect {...otherProps} />
    </PickerContainer>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Container>
);

export default Picker;
