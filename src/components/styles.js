import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

// Colors
export const Colors = {
  primary: "#ffffff",
  secondary: "#ae8f73",
  secondaryLight: "#f6deca",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
  black: "black",
};

const { primary, secondary, tertiary, darkLight, brand, green, red, black } =
  Colors;

// Doesn't work need fix it padding-top: ${Constants.StatusBarHeight + 30}px;
export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${primary};
  padding-top: 50px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageLogo = styled.Image`
  width: 230px;
  height: 200px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100%;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
  font-family: "Montserrat-Regular";
  ${(props) =>
    props.welcome &&
    `
      font-size='35px'
    `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
  font-family: "Montserrat-Regular";

  ${(props) =>
    props.welcome &&
    `
      margin-bottom: 5px;
      font-weight: normal;
    `}
`;

// Form Input Field
export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  font-family: "Montserrat-Regular";
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
  font-family: "Montserrat-Regular";
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
  background-color: ${secondary};
  color:${primary}
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-right: 10px;
  height: 50px;
  width: 200px;
  font-weight : bold;
  border-radius: 10px;
  
  ${(props) =>
    props.round == true &&
    `  border-radius: 20px;
    `}
  ${(props) =>
    props.width &&
    `  width: ${props.width}px;
    `}
  ${(props) =>
    props.google == true &&
    ` flex-direction: row;
      background-color: ${green};
      justify-content: center;
    `}
`;
export const StyledSmallButton = styled.TouchableOpacity`
  flex-direction:row;
  margin-right: 10px;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  background-color: ${secondary};
  color:${primary}
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight : bold;
  
  ${(props) =>
    props.google == true &&
    `background-color: ${green};
     flex-direction: row;
     justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-weight: bold;
  padding-left: 5px;
  font-family: "Montserrat-Bold";
  ${(props) =>
    props.fontSize &&
    `
  font-size: ${props.fontSize}px;
    `};
  ${(props) =>
    props.google == true &&
    `
    padding-right: 15px;
    `};
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  font-family: "Montserrat-Regular";
  color: ${(props) => (props.type == "SUCCESS" ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
  font-family: "Montserrat-Regular";
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
  font-family: "Montserrat-Regular";
`;
