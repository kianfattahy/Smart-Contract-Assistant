

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameArrowNarrowUp = ({ className, nameArrowNarrowUp = "/img/name-arrow-narrow-up-color-default.png" }) => {
  return <img className={`name-arrow-narrow-up ${className}`} alt="Name arrow narrow up" src={nameArrowNarrowUp} />;
};

NameArrowNarrowUp.propTypes = {
  nameArrowNarrowUp: PropTypes.string,
};
