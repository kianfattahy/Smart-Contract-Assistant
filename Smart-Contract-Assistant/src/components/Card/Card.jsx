/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Chip } from "../Chip";
import { NameDotsVertical } from "../NameDotsVertical";
import "./style.css";

export const Card = ({
  className,
  text = "Total Customers",
  divClassName,
  nameDotsVerticalNameDotsVertical = "/img/icons.png",
  chipDivClassName,
  chipNameArrowNarrowUpNameArrowNarrowUp = "/img/icons-1.png",
  chipTextChurnedClassName,
  text1 = "2,420",
  chipText = "20%",
  override = (
    <Chip
      className={chipTextChurnedClassName}
      divClassName={chipDivClassName}
      nameArrowNarrowUpNameArrowNarrowUp={chipNameArrowNarrowUpNameArrowNarrowUp}
      text="customer"
      text1={chipText}
    />
  ),
}) => {
  return (
    <div className={`card ${className}`}>
      <div className="content-5">
        <div className="total-customers">{text}</div>
        <div className={`element ${divClassName}`}>{text1}</div>
      </div>
      <div className="content-6">
        <NameDotsVertical
          className="name-dots-vertical-color-default"
          nameDotsVertical={nameDotsVerticalNameDotsVertical}
        />
        {override}
      </div>
    </div>
  );
};

Card.propTypes = {
  text: PropTypes.string,
  nameDotsVerticalNameDotsVertical: PropTypes.string,
  chipNameArrowNarrowUpNameArrowNarrowUp: PropTypes.string,
  text1: PropTypes.string,
  chipText: PropTypes.string,
};
