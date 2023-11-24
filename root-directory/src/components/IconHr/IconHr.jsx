

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const IconHr = ({ className, iconHr = "/img/icon-hr.png" }) => {
  return <img className={`icon-hr ${className}`} alt="Icon hr" src={iconHr} />;
};

IconHr.propTypes = {
  iconHr: PropTypes.string,
};
