

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameDotsVertical = ({ className, nameDotsVertical = "/img/name-dots-vertical-color-default.png" }) => {
  return <img className={`name-dots-vertical ${className}`} alt="Name dots vertical" src={nameDotsVertical} />;
};

NameDotsVertical.propTypes = {
  nameDotsVertical: PropTypes.string,
};
