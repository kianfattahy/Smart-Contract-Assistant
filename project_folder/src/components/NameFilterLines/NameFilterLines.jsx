

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameFilterLines = ({ className, nameFilterLines = "/img/name-filter-lines-color-default.png" }) => {
  return <img className={`name-filter-lines ${className}`} alt="Name filter lines" src={nameFilterLines} />;
};

NameFilterLines.propTypes = {
  nameFilterLines: PropTypes.string,
};
