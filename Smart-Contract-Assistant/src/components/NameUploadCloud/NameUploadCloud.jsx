/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameUploadCloud = ({ className, nameUploadCloud = "/img/name-upload-cloud-01-color-default.png" }) => {
  return <img className={`name-upload-cloud ${className}`} alt="Name upload cloud" src={nameUploadCloud} />;
};

NameUploadCloud.propTypes = {
  nameUploadCloud: PropTypes.string,
};
