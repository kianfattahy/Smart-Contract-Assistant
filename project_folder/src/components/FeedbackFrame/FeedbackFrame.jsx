// FeedbackFrame.js
import React from "react";
import "./style.css";

export const FeedbackFrame = ({ handleFeedbackFrameDelete, className, text, frameId }) => {

// Add a function to handle button click if needed
const handleButtonClick = () => {
  console.log("Button clicked, key: ", frameId);
  handleFeedbackFrameDelete(frameId);
};

  return (
    <div className={`feedback-frame ${className}`}>
      <p className="p">{text}</p>
      <button className="icon-button" onClick={handleButtonClick}>
        <img alt="Icon button" src="/img/icon-button-1@2x.png" />
      </button>
    </div>
  );
};

