import React from "react";
import { Button } from "../../components/Button";
import { NamePlusColor } from "../../components/NamePlusColor";
import { NameSendColor } from "../../components/NameSendColor";
import { NameUploadCloud } from "../../components/NameUploadCloud";
import "./style.css";

export const HeaderContainer = () => {
  return (
    <div className="header-container">
      <header className="header">
        <div className="div">Active contracts</div>
        <div className="actions">
          <Button
            className="button-2"
            color="gray"
            divClassName="design-component-instance-node"
            override={<NameUploadCloud className="icons-2" nameUploadCloud="/img/icons-1.png" />}
            showIconRight={false}
            text="Import"
          />
          <Button
            className="button-2"
            color="primary"
            override={<NamePlusColor className="icons-2" namePlusColor="/img/icons.png" />}
            showIconRight={false}
            text="Add Contract"
          />
        </div>
      </header>
    </div>
  );
};
