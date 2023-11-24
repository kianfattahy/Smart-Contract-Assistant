

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const NameUploadCloud = ({ className, nameUploadCloud = "/img/name-upload-cloud-01-color-default.png" }) => {
  return <img className={`name-upload-cloud ${className}`} alt="Name upload cloud" src={nameUploadCloud} />;
};

NameUploadCloud.propTypes = {
  nameUploadCloud: PropTypes.string,
};
