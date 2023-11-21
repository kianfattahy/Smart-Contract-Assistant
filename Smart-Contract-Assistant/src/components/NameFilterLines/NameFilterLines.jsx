/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameFilterLines = ({ className, nameFilterLines = "/img/name-filter-lines-color-default.png" }) => {
  return <img className={`name-filter-lines ${className}`} alt="Name filter lines" src={nameFilterLines} />;
};

NameFilterLines.propTypes = {
  nameFilterLines: PropTypes.string,
};
