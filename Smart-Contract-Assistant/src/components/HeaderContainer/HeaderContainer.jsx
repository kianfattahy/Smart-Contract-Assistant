import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from "../Button";
import { NameUploadCloud } from "../NameUploadCloud";
export const HeaderContainer = ({ formErrors, onSave }) => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    // Navigate to the "contracts" page when "Cancel" is clicked
    navigate("/contracts");
  };

  const handleSaveClick = () => {
    // Navigate to the "contracts" page when "Save" is clicked

    onSave(); // Call the onSave function if needed
  };

  return (
    <div className="header-container">
    <header className="header">
      <div className="div">Contracts Manager</div>
      <div className="actions">

        <Button
          className="button-2"
          color="gray"
          divClassName="design-component-instance-node"
          override={<NameUploadCloud className="icons-2" nameUploadCloud="/img/name-x-close-color-default.png" />}
          showIconRight={false}
          text="Cancel"
          onClick={handleCancelClick}
        />
        <Button
          className="button-2"
          color="primary"
          override={<NameUploadCloud className="icons-2" nameUploadCloud="/img/icon-check-1.png" />}
          showIconRight={false}
          text="Save Contract"
          onClick={handleSaveClick}
        />
      </div>
    </header>
  </div>
    // <div className="header-container">
    //   <div className="frame">
    //     <header className="header">
    //       <div className="text-wrapper">Active contracts</div>
    //     </header>
    //     <div className="actions">
    //       <button className="button" onClick={handleCancelClick}>
    //         <div className="div-wrapper">
    //           <div className="text-wrapper-2">Cancel</div>
    //         </div>
    //       </button>
    //       <button className="frame-wrapper" onClick={handleSaveClick}>
    //         <div className="div-wrapper">
    //           <div className="text-wrapper-3">Save</div>
    //         </div>
    //       </button>
    //       <Button
    //         className="button-2"
    //         color="gray"
    //         divClassName="design-component-instance-node"
    //         override={<NameUploadCloud className="icons-2" nameUploadCloud="/img/icons-1.png" />}
    //         showIconRight={false}
    //         text="Import"
    //       />
    //       <Button
    //         className="button-2"
    //         color="primary"
    //         override={<NameUploadCloud className="icons-2" nameUploadCloud="/img/icons-1.png" />}
    //         showIconRight={false}
    //         text="Add contract"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};
