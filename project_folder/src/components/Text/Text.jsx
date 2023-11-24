

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Text = ({ className, divClassName, text = "Catalog", text1 = "catalogapp.io" }) => {
  return (
    <div className={`text ${className}`}>
      <div className={`catalog ${divClassName}`}>{text}</div>
      <div className="catalogapp-io">{text1}</div>
    </div>
  );
};

Text.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
};
