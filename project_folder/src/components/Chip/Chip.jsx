

import PropTypes from "prop-types";
import React from "react";
import { NameArrowNarrowUp } from "../NameArrowNarrowUp";
import "./style.css";

export const Chip = ({
  showIcons = true,
  text,
  className,
  nameArrowNarrowUpNameArrowNarrowUp = "/img/icons-1.png",
  divClassName,
  text1 = "Customer",
}) => {
  return (
    <div className={`chip ${text} ${className}`}>
      {text === "churned" && <div className="text-wrapper-6">Churned</div>}

      {text === "customer" && (
        <>
          <>
            {showIcons && (
              <NameArrowNarrowUp
                className="name-arrow-narrow-up-color-default"
                nameArrowNarrowUp={nameArrowNarrowUpNameArrowNarrowUp}
              />
            )}
          </>
          <div className={`customer-2 ${divClassName}`}>{text1}</div>
        </>
      )}
    </div>
  );
};

Chip.propTypes = {
  showIcons: PropTypes.bool,
  text: PropTypes.oneOf(["churned", "customer"]),
  nameArrowNarrowUpNameArrowNarrowUp: PropTypes.string,
  text1: PropTypes.string,
};
