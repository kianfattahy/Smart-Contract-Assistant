/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

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
