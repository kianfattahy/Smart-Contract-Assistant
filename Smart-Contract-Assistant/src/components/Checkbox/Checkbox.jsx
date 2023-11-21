/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconCheck } from "../IconCheck";
import { IconHr } from "../IconHr";
import "./style.css";

export const Checkbox = ({ enabled, status, indeterminate, className }) => {
  return (
    <div className={`checkbox ${status} enabled-${enabled} ${className}`}>
      {indeterminate && <IconHr className="instance-node" iconHr="/img/icon-hr-1.png" />}

      {!indeterminate && status === "on" && <IconCheck className="instance-node" iconCheck="/img/icon-check-1.png" />}
    </div>
  );
};

Checkbox.propTypes = {
  enabled: PropTypes.bool,
  status: PropTypes.oneOf(["off", "on"]),
  indeterminate: PropTypes.bool,
};
