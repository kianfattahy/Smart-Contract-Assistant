/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { NameBellColor } from "../NameBellColor";
import { NameChatColor } from "../NameChatColor";
import { NameCheckColor } from "../NameCheckColor";
import { NameChevronColor } from "../NameChevronColor";
import { NameGridColor } from "../NameGridColor";
import { NameHomeColor } from "../NameHomeColor";
import { NameLayersColor } from "../NameLayersColor";
import { NamePieChartColor } from "../NamePieChartColor";
import { NameSettingsColor } from "../NameSettingsColor";
import { NameNotificationsColor } from "../NameNotificationsColor";
// import { Name}
import { NavBase } from "../NavBase";
import { Text } from "../Text";
import "./style.css";

// const navBase4 = <NavBase className="nav-base-instance" override={navBase4} property1="default" text="Home" />;
// const navBase = <NavBase className="nav-base-instance" override={navBase} property1="one" text="Contracts" to={to} />;
// const override = <NavBase className="nav-base-instance" override={override} property1="default" text="Prospects" />;
// const navBase1 = <NavBase className="nav-base-instance" override={navBase1} property1="default" text="Reporting" />;


export const Sidebar = ({
  className,
  navBase = <NameGridColor className="icons-2" />,
  override = <NameLayersColor className="icons-2" />,
  navBase1 = <NamePieChartColor className="icons-2" />,
  navBase2 = <NameSettingsColor className="icons-2" />,
  navBase5 = <NameNotificationsColor className="icons-2" />,
  navBase3 = <NameChatColor className="icons-2" />,
  navBase6 = <NameBellColor className="icons-2" />,

  nameBellColorNameBellColorClassName,
  nameChevronColorNameChevronColorClassName,
  navBase4 = <NameHomeColor className="icons-2" />,
  to,
  userData, // Add userData prop
}) => {

  const fullName = userData ? userData.fullName : 'Phoebe Pantazis';


  return (
    <div className={`sidebar ${className}`}>
      <div className="container">
        <div className="content-2">
          <div className="logo-action-items">
            <div className="logo">
              <div className="frame-2">
                <div className="ba-c-bd" alt="Ba c bd" src="../../../static/img/b6a88616-c461-4b5d-8836-52550dbd3d7f-1.png"/>
                <div className="text-wrapper-3">Smart Contract Assistant</div>
              </div>
            </div>
            <div className="action-items">
              <NavBase className="nav-base-instance" override={navBase4} property1="default" text="Home"/>
              <NavBase className="nav-base-instance" override={navBase} property1="one" text="Contracts" to={to} />
            </div>
          </div>
          <div className="action-items-2">
            <NavBase className="nav-base-instance" override={navBase2} property1="default" text="Settings" />
            <NavBase className="nav-base-instance" override={navBase3} property1="default" text="Support" />

          </div>
        </div>
        <div className="user-card">
          <div className="content-4">
            <div className="avatar-text">
              <div className="avatar-2" />
              <Text
                className="text-instance"
                divClassName="design-component-instance-node"
                text={fullName}
                text1=""
              />
            </div>
            <NameChevronColor className={nameChevronColorNameChevronColorClassName} />
          </div>
        </div>
      </div>
      <img className="separator" alt="Separator" />
    </div>
  );
};

Sidebar.propTypes = {
  to: PropTypes.string,
  userData: PropTypes.shape({
    fullName: PropTypes.string,
    emailAddress: PropTypes.string,
    company: PropTypes.string,
    missionStatement: PropTypes.string,
    companyMottos: PropTypes.string,
  }),};
