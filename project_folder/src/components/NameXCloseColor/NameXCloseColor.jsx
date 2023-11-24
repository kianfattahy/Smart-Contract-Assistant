

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameXCloseColor = ({ className, nameXCloseColor = "/img/name-x-close-color-default.png" }) => {
  return <img className={`name-x-close-color ${className}`} alt="Name x close color" src={nameXCloseColor} />;
};

NameXCloseColor.propTypes = {
  nameXCloseColor: PropTypes.string,
};
