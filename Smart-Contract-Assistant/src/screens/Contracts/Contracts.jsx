import React, { useEffect, useState } from "react";
import { AvatarGroup } from "../../components/AvatarGroup";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { FullTable } from "../../components/FullTable";
import { NameChatColor } from "../../components/NameChatColor";
import { NameFilterLines } from "../../components/NameFilterLines";
import { NameGridColor } from "../../components/NameGridColor";
import { NameLayersColor } from "../../components/NameLayersColor";
import { NamePieChartColor } from "../../components/NamePieChartColor";
import { NamePlusColor } from "../../components/NamePlusColor";
import { NameSearchColor } from "../../components/NameSearchColor";
import { NameSendColor } from "../../components/NameSendColor";
import { NameSettingsColor } from "../../components/NameSettingsColor";
import { NameUploadCloud } from "../../components/NameUploadCloud";
import { NameXCloseColor } from "../../components/NameXCloseColor";
import { NameHomeColor } from "../../components/NameHomeColor";
import { HeaderContainer } from "../../components/HeaderContainerJobs";
import { TableContainer } from "../../components/TableContainer";
import { Sidebar } from "../../components/Sidebar";
import "./style.css";
import { NameBellColor } from "../../components/NameBellColor";
import { NameCheckColor } from "../../components/NameCheckColor";
import { SendResponses } from '../SendResponses'; // make sure to import SendResponses
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Contracts = ({ userData, contracts, feedbackFramesGlobal }) => {
  const [showSendEmails, setShowSendEmails] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [analytics, setAnalytics] = useState({
    totalEmails: 0,
    totalReplies: 0,
    activeNow: 0,
  });
  const [selectedJobIndexes, setSelectedJobIndexes] = useState([]);
  //analytics should have totalEmails, totalReplies, and activeNow
  useEffect(() => {
    // Calculate analytics when the component mounts or when 'contracts' changes
    let totalEmails = 0;
    let totalReplies = 0;
    let activeNow = 0;

    // Loop through the 'contracts' array to calculate the values
    for (const contract of contracts) {
      totalEmails += contract.delivered;
      totalReplies += contract.reply;
      if (contract.status === "active") {
        activeNow++;
      }
    }
    // Define the backend URL
    const backendUrl = 'http://localhost:5000';

    // Make a POST request to notify the backend that the user is onboarded
    // Ideally, this would occur on the Onboarding page, but this is simpler to implement
    fetch(`${backendUrl}/api/onboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Read the response as text
      })
      .then((data) => console.log(data)) // Log the response text
      .catch((error) => console.error('Error:', error));

    setAnalytics({
      totalEmails,
      totalReplies,
      activeNow,
    });
  }, [contracts]);

  const toggleSendEmails = () => {
    setShowSendEmails(!showSendEmails);
  };


  return (
    <div className="contracts">
      <Sidebar
        className="sidebar-instance"
        nameBellColorNameBellColorClassName="design-component-instance-node-3"
        nameCheckColorNameCheckColorClassName="design-component-instance-node-3"
        nameChevronColorNameChevronColorClassName="sidebar-2"
        navBase={<NameGridColor className="design-component-instance-node-3" />}
        navBase1={<NamePieChartColor className="design-component-instance-node-3" />}
        navBase2={<NameSettingsColor className="design-component-instance-node-3" />}
        navBase3={<NameChatColor className="design-component-instance-node-3" />}
        navBase4={<NameHomeColor className="design-component-instance-node-3" />}
        navBase5={<NameBellColor className="design-component-instance-node-3" />}
        navBase6={<NameCheckColor className="design-component-instance-node-3" />}
        override={<NameLayersColor className="design-component-instance-node-3" />}
        userData={userData} // Pass the userData prop to Sidebar

      />
      <div className="main-wrap">
        <div className="header-container-but">
          <div className="header-2">
            <div className="text-wrapper-12">Saved Contracts</div>
            <div className="div-2">
              <Button
                color="gray"
                colorPrimaryClassName="button-7"
                divClassName="design-component-instance-node-4"
                override={<NameUploadCloud className="icons-3" nameUploadCloud="/img/icons-3.png" />}
                showIconRight={false}
                text="Import"
              />
              <Button
                color="primary"
                colorPrimaryClassName="button-7"
                override={<NamePlusColor className="icons-3" namePlusColor="/img/icons-4.png" />}
                showIconRight={false}
                text="Add Contract"
                to="/response"
              />
            </div>
          </div>
        </div>
        <div className="analytics-container">
          <div className="card-container">
            <Card
              chipDivClassName="card-2"
              chipNameArrowNarrowUpNameArrowNarrowUp="/img/icons-6.png"
              chipTextChurnedClassName="card-3"
              className="card-instance"
              divClassName="design-component-instance-node-4"
              nameDotsVerticalNameDotsVertical="/img/icons-5.png"
              text="Total Contracts"
              text1="8"
            />
          </div>
        </div>
        <TableContainer className="table-container-instance" contracts={contracts} setNumSelected={setNumSelected} selectedJobIndexes={selectedJobIndexes}
          setSelectedJobIndexes={setSelectedJobIndexes} />

      </div>
      {showSendEmails && <div className="overlay" ><SendResponses contracts={contracts} userData={userData} feedbackFramesGlobal={feedbackFramesGlobal} selectedJobIndexes={selectedJobIndexes} numSelected={numSelected} selectedJobIndexes={selectedJobIndexes} togglesendemails={toggleSendEmails} /></div>}

    </div>
  );
};
