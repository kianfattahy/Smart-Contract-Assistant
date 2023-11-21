/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Avatar } from "../Avatar";
import "./style.css";

export const AvatarGroup = ({
  size,
  className,
  avatarClassName,
  avatarClassNameOverride,
  divClassName,
  divClassNameOverride,
  avatarClassName1,
  avatarClassName2,
  avatarAvatarClassName,
}) => {
  return (
    <div className={`avatar-group ${size} ${className}`}>
      <div className={`avatar-3 ${avatarClassName}`} />
      <div className={`avatar-4 ${avatarClassNameOverride}`} />
      <div className={`avatar-5 ${divClassName}`} />
      <div className={`avatar-6 ${divClassNameOverride}`} />
      <div className={`avatar-7 ${avatarClassName1}`} />
      <div className={`avatar-8 ${avatarClassName2}`} />
      <Avatar className={avatarAvatarClassName} divClassName={`${size === "small" && "class"}`} />
    </div>
  );
};

AvatarGroup.propTypes = {
  size: PropTypes.oneOf(["large", "small"]),
};
