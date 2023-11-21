import React from "react";
import "./style.css";
import { Button } from "../Button";

export const Frame = () => {
  return (
    <div className="frame">
      <header className="header">
        <div className="text-wrapper">Active contracts</div>
        <div className="div">Edit contract</div>
      </header>
      <div className="actions">
        <button className="button">
          <div className="div-wrapper">
            <div className="text-wrapper-2">Cancel</div>
          </div>
        </button>
        <button className="frame-wrapper">
          <div className="div-wrapper">
            <div className="text-wrapper-3">Save</div>
          </div>
        </button>
      </div>
    </div>
  );
};
