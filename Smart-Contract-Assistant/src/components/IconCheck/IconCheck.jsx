/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const IconCheck = ({ className, iconCheck = "/img/icon-check.png" }) => {
  return <img className={`icon-check ${className}`} alt="Icon check" src={iconCheck} />;
};

IconCheck.propTypes = {
  iconCheck: PropTypes.string,
};
