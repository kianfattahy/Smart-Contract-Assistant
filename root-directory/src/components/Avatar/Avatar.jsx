

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Avatar = ({ show6 = true, className, divClassName }) => {
  return (
    <div className={`avatar ${className}`}>{show6 && <div className={`text-wrapper-2 ${divClassName}`}>+6</div>}</div>
  );
};

Avatar.propTypes = {
  show6: PropTypes.bool,
};
