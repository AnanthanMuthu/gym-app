import styled from "styled-components/native";
import { GREY, LIGHT_GREY } from "../../../constants/colors";

export const Container = styled.View`
  align-items: "center";
  font-size: 18px;
`;

export const PickerContainer = styled.View`
  width: 100%;
  background-color: ${LIGHT_GREY};
  border: 1px solid ${GREY};
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  min-height: 40px;
  font-size: 18px;
  align-items: "center";
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-size: 18px;
`;
