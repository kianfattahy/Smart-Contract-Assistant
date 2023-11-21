/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Cell } from "../Cell";
import { IconEllipsisV } from "../IconEllipsisV";
import { RowCell } from "../RowCell";
import { TextFinishedWrapper } from "../TextFinishedWrapper";
import "./style.css";

export const Row = ({
  className,
  cellRowCellIconEllipsisVIconEllipsisVClassName,
  cellRowCell = <IconEllipsisV className="icon-left-3" />,
  to,
  contract,
}) => {
  const { location, status, dateCreated } = contract;


  return (
    <Link className={`row ${className}`} to={to}>
  
      <div className="frame-3">
        
        <Cell
          className="cell-3"
          content="text"
          iconLeft={false}
          iconRight={false}
          rowCellText={location}
          twoNdText={false}
          type="row"
        />
        
        <div className="row-cell-wrapper">
          <div className="row-cell-3">
            <TextFinishedWrapper className="chip-instance" text={status} />
          </div>
        </div>
        
        <RowCell
          className="row-cell-4"
          divClassName="design-component-instance-node-2"
          hasDiv={false}
          text={dateCreated}
          visible={false}
          visible1={false}
        />
        {/* <Cell
          className="cell-instance"
          content="icon"
          iconLeft={false}
          iconRight={false}
          rowCell={cellRowCell}
          rowCellIconEllipsisVIconEllipsisVClassName={cellRowCellIconEllipsisVIconEllipsisVClassName}
          twoNdText={false}
          type="row"
        /> */}
      </div>
    </Link>
  );
};

Row.propTypes = {
  to: PropTypes.string,
};
