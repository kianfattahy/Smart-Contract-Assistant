import React, { useState } from "react";
import { Button } from "../../components/Button";
import { NameSendColorWrapper } from "../../components/NameSendColorWrapper";
import { NameXCloseColor } from "../../components/NameXCloseColor";
import "./style.css";
import { BeatLoader } from 'react-spinners'; // import the spinner

export const SendResponses = ({ userData, feedbackFramesGlobal, selectedjobIndexes, numSelected, togglesendemails, contracts }) => {
  const [numberOfRecipients, setNumberOfRecipients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleOption, setScheduleOption] = useState("Normal Business Hours");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleScheduleClick = async () => {
    setIsLoading(true);
    const backendUrl = 'http://localhost:5000';

    const requestPayload = {
      contracts,
      userData,
      selectedjobIndexes,
      feedbackFramesGlobal,
      numberOfRecipients,
    };

    try {
      const response = await fetch(`${backendUrl}/api/generate_bulk_emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      setIsLoading(false);

      if (response.ok) {
        setIsSuccess(true);
        const data = await response.json();
        console.log(data);
      } else {
        const data = await response.json();
        console.log('Error:', data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleCancelClick = () => {
    togglesendemails();
  };
  const handleNewBatchClick = () => {
    setIsSuccess(false);
  };

  const renderSuccessView = () => (
    <div>
      <div className="text-wrapper-42">
        <h2>Emails sent successfully!</h2>

      </div>
      <div className="frame-12 sucess">
      <Button
                    color="primary"
                    colorPrimaryClassName="button-9"
                    override={<NameSendColorWrapper className="name-send-color-white" />}
                    showIconRight={false}
                    text="New Batch"
                    onClick={handleNewBatchClick} // Add onClick handler
                  />
          
          <Button
                    color="gray"
                    colorPrimaryClassName="button-9"
                    override={
                      <NameXCloseColor
                        className="name-x-close-color-default"
                        nameXCloseColor="/img/name-x-close-color-default.png"
                      />
                    }
                    showIconRight={false}
                    onClick={handleCancelClick}
                    text="Exit"
                  />
            </div>
    </div>
  );

  const renderSelectedInfo = () => {
    if (numSelected === 1) {
      return (
        <p className="role-software">
          <span className="span">Role:</span>
          <span className="text-wrapper-14"> Software Engineer</span>
          <br />
          <br />
          <span className="span">Level:</span>
          <span className="text-wrapper-14"> Junior</span>
        </p>
      );
    } else if (numSelected > 1) {
      return (
        <p className="role-software">
          <span className="span"># Selected:</span>
          <span className="text-wrapper-14"> {numSelected}</span>
          <br />
        </p>
      );
    }
  };
  const renderContent = () => {
    if (isSuccess) {
      return renderSuccessView();
    }
    else if (isLoading) {
      return (
        <div className="generating-view">
        <h2>Generating emails</h2>
        <p>This may take several minutes. Feel free to exit this panel.</p>
        <div className="loading">
          Loading... <BeatLoader size={10} color="black" />
        </div>
        <div className="frame-12">
          <Button
            color="gray"
            colorPrimaryClassName="button-9"
            override={
              <NameXCloseColor
                className="name-x-close-color-default"
                nameXCloseColor="/img/name-x-close-color-default.png"
              />
            }
            showIconRight={false}
            onClick={togglesendemails}
            text="Exit"
          />
        </div>
      </div>
      );
    } else {
      return (
        <div>
                <div>
                  {renderSelectedInfo()}
                  <p className="prospects-identified">
                    <span className="span">Prospects Identified: </span>
                    <span className="text-wrapper-14">250</span>
                    <br />
                    <span className="span">Prospects Contacted: </span>
                    <span className="text-wrapper-14">39 </span>
                    <span className="text-wrapper-15">(16%)</span>
                  </p>
                  <div className="contract-field">
                    <div className="text-wrapper-16"># of Recipients</div>
                    <input
                      className="frame-11"
                      value={numberOfRecipients}
                      onChange={(e) => setNumberOfRecipients(e.target.value)}
                    />            </div>
                  <div className="contract-field">
                    <div className="text-wrapper-16">Schedule</div>
                    <input className="frame-11" />
                  </div>
                  <div className="contract-field">
                    <div className="text-wrapper-16">Begin Delivery</div>
                    <input className="frame-11" />
                  </div>
                </div>
                <div className="frame-12">
                  <Button
                    color="primary"
                    colorPrimaryClassName="button-9"
                    override={<NameSendColorWrapper className="name-send-color-white" />}
                    showIconRight={false}
                    text="Schedule"
                    onClick={handleScheduleClick} // Add onClick handler
                  />
                  <Button
                    color="gray"
                    colorPrimaryClassName="button-9"
                    override={
                      <NameXCloseColor
                        className="name-x-close-color-default"
                        nameXCloseColor="/img/name-x-close-color-default.png"
                      />
                    }
                    showIconRight={false}
                    onClick={togglesendemails}
                    text="Cancel"
                  />
                </div>
                </div>
                );
              }
            };

return (
  <div className="send-emails-overlay">
    <div className="send-emails">
      <div className="div-3">
        <header className="header-3">
          <div className="text-wrapper-13">Prepare Batch</div>
        </header>
        <div className="form-container">
        {renderContent()}
        </div >
      </div >
      </div >
      </div >

      );
};
