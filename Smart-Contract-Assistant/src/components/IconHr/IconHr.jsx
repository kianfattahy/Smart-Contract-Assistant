/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const IconHr = ({ className, iconHr = "/img/icon-hr.png" }) => {
  return <img className={`icon-hr ${className}`} alt="Icon hr" src={iconHr} />;
};

IconHr.propTypes = {
  iconHr: PropTypes.string,
};
