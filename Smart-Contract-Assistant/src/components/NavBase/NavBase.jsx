/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { NameHomeColor } from "../NameHomeColor";
import "./style.css";

export const NavBase = ({
  property1,
  className,
  override = <NameHomeColor className="name-home-color-instance" />,
  text = "Home",
  to,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  // Add a condition to prevent changing property1 for "Contracts"
  const onMouseEnter = () => {
    if (text !== "Contracts") {
      dispatch("mouse_enter");
    }
  };

  // Add a condition to prevent changing property1 for "Contracts"
  const onMouseLeave = () => {
    if (text !== "Contracts") {
      dispatch("mouse_leave");
    }
  };

  return (
    <Link
      className={`nav-base ${state.property1} ${className}`}
      to={to}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="content">
        {override}
        <div className="home">{text}</div>
      </div>
    </Link>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "two",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

NavBase.propTypes = {
  property1: PropTypes.oneOf(["two", "one", "default"]),
  text: PropTypes.string,
  to: PropTypes.string,
};
