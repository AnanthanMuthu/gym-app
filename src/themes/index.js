import { RFValue } from "react-native-responsive-fontsize";

const palette = {
  ebonyClay: "#232840",
  mySin: "#FFB726",
  white: "#ffffff",
  japaneseLaurel: "#04810F",
  alizarinCrimson: "#E52424",
  silver: "#C7C7C7",
  mystic: "#dce7ec",
};

export const theme = {
  colors: {
    primary: palette.ebonyClay,
    secondary: palette.mySin,
    background: palette.mystic,
    foreground: palette.ebonyClay,
    success: palette.japaneseLaurel,
    error: palette.alizarinCrimson,
    light: palette.white,
    disabled: palette.silver,
  },
  spacing: {
    xxs: 3,
    xs: 5,
    s: 15,
    m: 20,
    l: 25,
    xl: 30,
  },
  fonts: {
    sizes: {
      xs: RFValue(12),
      s: RFValue(14),
      m: RFValue(16),
      l: RFValue(18),
      xl: RFValue(28),
    },
  },
};
