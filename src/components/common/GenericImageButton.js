import React from "react";
import PropTypes from "prop-types";
import BaseImageButton from "./BaseImageButton";

const GenericImageButton = ({ width, height, radius, image, ...props }) => {
  return (
    <BaseImageButton
      image={image}
      style={{ width, height, borderRadius: radius }}
      {...props}
    />
  );
};

GenericImageButton.defaultProps = {
  width: 45,
  height: 45,
  radius: 0,
};

GenericImageButton.propTypes = {
  image: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
};

const Memoized = React.memo(GenericImageButton);

export default Memoized;
