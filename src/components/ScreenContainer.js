import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";

// import BackHandlerInterceptor from "./BackHandlerInterceptor";
import ErrorMessageV2 from "./common/ErrorMessageV2";
import ScreenLoader from "./ScreenLoader";
import BlurOverlay from "./BlurOverlay";

import { MEDIUM_GREY, WHITE } from "./../constants/colors";

const ScreenContainer = ({
  backgroundType,
  backgroundImage,
  backgroundColor,
  showLoaderModal,
  showErrorModal,
  errorTitle,
  errorMessage,
  onErrorModalDismissed,
  showOverlay,
  overlayType,
  overlayGradientColors,
  overlaySolidColor,
  children,
}) => {
  const [showError, setError] = useState(false);

  function handleCloseError() {
    setError(false);
    onErrorModalDismissed();
  }

  const _renderErrorModal = () => (
    <ErrorMessageV2
      title={errorTitle}
      onClose={handleCloseError}
      description={errorMessage}
    />
  );

  const _renderChildren = () =>
    backgroundType === "image" ? (
      <View style={[styles.container, { backgroundColor }]}>
        <ImageBackground
          resizeMode="cover"
          source={backgroundImage}
          style={styles.imageBackground}
        >
          {children}
          {showError ? _renderErrorModal() : null}
          <ScreenLoader showLoader={showLoaderModal} />
        </ImageBackground>
      </View>
    ) : (
      <View style={[styles.container, { backgroundColor }]}>
        {children}
        {showError ? _renderErrorModal() : null}
        <ScreenLoader showLoader={showLoaderModal} />
      </View>
    );

  useEffect(() => {
    if (showErrorModal && !showError) {
      setTimeout(() => {
        setError(true);
      }, 1000);
    }
  }, [showErrorModal, showError]);

  return (
    <>
      <BlurOverlay
        showOverlay={showOverlay}
        overlayType={overlayType}
        overlayGradientColors={overlayGradientColors}
        overlaySolidColor={overlaySolidColor}
      >
        {_renderChildren()}
      </BlurOverlay>
      {/* <BackHandlerInterceptor /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },
});

ScreenContainer.propTypes = {
  backgroundType: PropTypes.oneOf(["image", "color"]).isRequired,
  backgroundImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  backgroundColor: PropTypes.string,
  showLoaderModal: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  errorTitle: PropTypes.string,
  errorMessage: PropTypes.string,
  onErrorModalDismissed: PropTypes.func,
  showOverlay: PropTypes.bool,
  overlayType: PropTypes.oneOf(["solid", "gradient"]),
  overlayGradientColors: PropTypes.array,
  overlaySolidColor: PropTypes.string,
  children: PropTypes.node,
  analyticScreenName: PropTypes.string,
  analyticTabName: PropTypes.string,
};

ScreenContainer.defaultProps = {
  backgroundImage: 0,
  backgroundColor: MEDIUM_GREY,
  showLoaderModal: false,
  showErrorModal: false,
  errorTitle: "GYM",
  errorMessage: "",
  onErrorModalDismissed: () => {},
  showOverlay: false,
  overlayType: "solid",
  overlayGradientColors: ["transparent", "#1e3c60"],
  overlaySolidColor: WHITE,
};

export default ScreenContainer;
