

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NamePlusColor = ({ className, namePlusColor = "/img/name-plus-color-default.png" }) => {
  return <img className={`name-plus-color ${className}`} alt="Name plus color" src={namePlusColor} />;
};

NamePlusColor.propTypes = {
  namePlusColor: PropTypes.string,
};
