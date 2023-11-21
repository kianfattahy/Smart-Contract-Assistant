/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconEllipsisV } from "../IconEllipsisV";
import "./style.css";

export const RowCell = ({
  className,
  visible = true,
  hasText = true,
  visible1 = true,
  divClassName,
  text = "Primary Text",
  hasDiv = true,
  iconEllipsisVIconEllipsisVClassName,
  override = <IconEllipsisV className={iconEllipsisVIconEllipsisVClassName} />,
}) => {
  return (
    <div className={`row-cell ${className}`}>
      {visible && <>{override}</>}

      {hasText && (
        <div className="text-2">
          <div className={`primary-text ${divClassName}`}>{text}</div>
          {hasDiv && <div className="text-wrapper-7">Secondary Text</div>}
        </div>
      )}

      {visible1 && <IconEllipsisV className="icon-right" />}
    </div>
  );
};

RowCell.propTypes = {
  visible: PropTypes.bool,
  hasText: PropTypes.bool,
  visible1: PropTypes.bool,
  text: PropTypes.string,
  hasDiv: PropTypes.bool,
};
