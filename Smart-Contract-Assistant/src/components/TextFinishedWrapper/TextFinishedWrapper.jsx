/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const TextFinishedWrapper = ({ showIcons = true, text, className }) => {
  return (
    <div className={`text-finished-wrapper ${text} ${className}`}>
      <div className="finished-2">
        {text === "finished" && <>Finished</>}

        {text === "Strong" && <>Strong</>}

        {text === "Moderate" && <>Moderate</>}

        {text === "created" && <>Created</>}

      </div>
    </div>
  );
};

TextFinishedWrapper.propTypes = {
  showIcons: PropTypes.bool,
  text: PropTypes.oneOf(["finished", "Strong", "Moderate", "created"]),
};
