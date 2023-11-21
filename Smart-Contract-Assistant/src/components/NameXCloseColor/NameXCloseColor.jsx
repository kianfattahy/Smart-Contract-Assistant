/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameXCloseColor = ({ className, nameXCloseColor = "/img/name-x-close-color-default.png" }) => {
  return <img className={`name-x-close-color ${className}`} alt="Name x close color" src={nameXCloseColor} />;
};

NameXCloseColor.propTypes = {
  nameXCloseColor: PropTypes.string,
};
