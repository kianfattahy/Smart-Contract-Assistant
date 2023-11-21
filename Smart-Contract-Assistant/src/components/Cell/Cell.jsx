/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Checkbox } from "../Checkbox";
import { IconEllipsisV } from "../IconEllipsisV";
import { RowCell } from "../RowCell";
import "./style.css";

export const Cell = ({
  type,
  content,
  twoNdText,
  iconLeft,
  iconRight,
  className,
  rowCellText = "",
  rowCellDivClassName,
  rowCellIconEllipsisVIconEllipsisVClassName,
  rowCell = <IconEllipsisV className="icon-ellipsis-v-instance" />,
}) => {
  return (
    <div className={`cell type-${type} ${className}`}>
      {(content === "blank" ||
        content === "icon" ||
        content === "label" ||
        (content === "text" && !iconLeft && !iconRight && type === "header") ||
        (content === "text" && !iconRight && type === "row") ||
        (iconRight && type === "row")) && (
        <RowCell
          className="row-cell-instance"
          divClassName={rowCellDivClassName}
          hasDiv={content === "text" && !twoNdText ? false : undefined}
          hasText={["blank", "icon", "label"].includes(content) ? false : undefined}
          iconEllipsisVIconEllipsisVClassName={rowCellIconEllipsisVIconEllipsisVClassName}
          override={rowCell}
          text={rowCellText}
          visible={content === "blank" || (!iconLeft && content === "text") ? false : undefined}
          visible1={!iconRight ? false : undefined}
        />
      )}

      {(content === "button" ||
        content === "checkbox" ||
        (iconLeft && type === "header") ||
        (iconRight && type === "header")) && (
        <div className="row-cell-2">
          {content === "button" && (
            <div className="icon-left">
              <div className="text-3">Button</div>
            </div>
          )}

          {content === "checkbox" && (
            <Checkbox className="checkbox-instance" enabled indeterminate={false} status="off" />
          )}

          {content === "text" && (
            <>
              <div className={`icon-left-2 icon-right-${iconRight} icon-left-${iconLeft}`}>
                {(iconLeft || !twoNdText) && (
                  <div className="overlap-group">
                    {iconLeft && (
                      <>
                        <img className="icon-order-arrow" alt="Icon order arrow" src="/img/icon-order-arrow-down.png" />
                        <img
                          className="icon-order-arrow-up"
                          alt="Icon order arrow up"
                          src="/img/icon-order-arrow-up.png"
                        />
                      </>
                    )}

                    {!iconLeft && <>Header</>}
                  </div>
                )}

                {iconRight && twoNdText && (
                  <>
                    <div className="primary-text-2">Header</div>
                    <div className="text-wrapper-8">Secondary Text</div>
                  </>
                )}
              </div>
              <div className={`text-4 icon-right-0-${iconRight} icon-left-1-${iconLeft}`}>
                {(!twoNdText || !iconLeft) && (
                  <div className="primary-text-3">
                    {!iconRight && <>Header</>}

                    {iconRight && (
                      <>
                        <img className="icon-order-arrow" alt="Icon order arrow" src="/img/icon-order-arrow-down.png" />
                        <img
                          className="icon-order-arrow-up"
                          alt="Icon order arrow up"
                          src="/img/icon-order-arrow-up.png"
                        />
                      </>
                    )}
                  </div>
                )}

                {iconLeft && twoNdText && (
                  <>
                    <div className="primary-text-2">Header</div>
                    <div className="text-wrapper-8">Secondary Text</div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

Cell.propTypes = {
  type: PropTypes.oneOf(["row", "header"]),
  content: PropTypes.oneOf(["icon", "checkbox", "button", "blank", "text", "label"]),
  twoNdText: PropTypes.bool,
  iconLeft: PropTypes.bool,
  iconRight: PropTypes.bool,
  rowCellText: PropTypes.string,
};
