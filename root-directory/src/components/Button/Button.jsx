import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { NameHomeColor } from "../NameHomeColor";
import "./style.css";

export const Button = ({
  text = "Button",
  showIconLeft = true,
  showIconRight = true,
  color,
  colorPrimaryClassName,
  frameClassName,
  divClassName,
  override = <NameHomeColor className="icons" />,
  override1 = <NameHomeColor className="name-home-color-default" />,
  to,
  onClick,
  disabled = false, // Add a disabled prop with default value false
}) => {
  return (
    <Link to={to}>
      <button className={`button ${color} ${colorPrimaryClassName}`} disabled={disabled} onClick={onClick}>
        <div className={`div ${frameClassName}`}>
          {showIconLeft && <>{override}</>}

          <div className={`text-wrapper ${divClassName}`}>{text}</div>
          {showIconRight && <>{override1}</>}
        </div>
      </button>
    </Link>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  showIconLeft: PropTypes.bool,
  showIconRight: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "gray", "secondary", "green"]),
  to: PropTypes.string,
  disabled: PropTypes.bool, // Add prop type for the disabled prop
};
