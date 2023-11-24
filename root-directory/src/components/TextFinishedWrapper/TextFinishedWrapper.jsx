

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
