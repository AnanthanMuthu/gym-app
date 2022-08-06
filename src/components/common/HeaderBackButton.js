import React from "react";
import GenericImageButton from "./GenericImageButton";
import PropTypes from "prop-types";

const icBackWhite = require("./../../assets/icon_back_white.png");
const icBackBlack = require("./../../assets/icon_back.png");
const HeaderBackButton = ({ onPress, isWhite, ...props }) => (
  <GenericImageButton
    hitSlop={{ top: 11, left: 11, bottom: 11, right: 11 }}
    width={22}
    height={22}
    onPress={onPress}
    image={isWhite ? icBackWhite : icBackBlack}
    {...props}
  />
);

HeaderBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  isWhite: PropTypes.bool,
};

HeaderBackButton.defaultProps = {
  isWhite: true,
};

export default React.memo(HeaderBackButton);
