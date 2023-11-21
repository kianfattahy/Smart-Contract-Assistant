/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NamePlusColor = ({ className, namePlusColor = "/img/name-plus-color-default.png" }) => {
  return <img className={`name-plus-color ${className}`} alt="Name plus color" src={namePlusColor} />;
};

NamePlusColor.propTypes = {
  namePlusColor: PropTypes.string,
};
