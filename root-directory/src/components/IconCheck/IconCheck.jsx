

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const IconCheck = ({ className, iconCheck = "/img/icon-check.png" }) => {
  return <img className={`icon-check ${className}`} alt="Icon check" src={iconCheck} />;
};

IconCheck.propTypes = {
  iconCheck: PropTypes.string,
};
