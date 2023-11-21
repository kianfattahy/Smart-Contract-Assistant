/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameArrowNarrowUp = ({ className, nameArrowNarrowUp = "/img/name-arrow-narrow-up-color-default.png" }) => {
  return <img className={`name-arrow-narrow-up ${className}`} alt="Name arrow narrow up" src={nameArrowNarrowUp} />;
};

NameArrowNarrowUp.propTypes = {
  nameArrowNarrowUp: PropTypes.string,
};
