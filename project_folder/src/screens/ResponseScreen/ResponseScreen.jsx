import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AutoFixNormal } from "../../components/AutoFixNormal";
import { Edit } from "../../components/Edit";
import { Response } from "../../components/Response";
import { FeedbackFrame } from "../../components/FeedbackFrame";
import { FormField } from "../../components/FormField";
import { NameChatColor } from "../../components/NameChatColor";
import { NameGridColor } from "../../components/NameGridColor";
import { NameHomeColor } from "../../components/NameHomeColor";
import { NameLayersColor } from "../../components/NameLayersColor";
import { NamePieChartColor } from "../../components/NamePieChartColor";
import { NameSettingsColor } from "../../components/NameSettingsColor";
import { NameBellColor } from "../../components/NameBellColor";
import { NameCheckColor } from "../../components/NameCheckColor";
import { Sidebar } from "../../components/Sidebar";
import { Button } from "../../components/Button";
import { NameUploadCloud } from "../../components/NameUploadCloud";
import { NamePlusColor } from "../../components/NamePlusColor";
import { Frame } from "../../components/Frame";
import "./style.css";
import { HeaderContainer } from "../../components/HeaderContainer";
import { Link, useParams } from "react-router-dom"; // Import useParams
import { NameSendColor } from "../../components/NameSendColor";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export const ResponseScreen = ({ userData, savejob, contracts, feedbackFramesGlobal, updateFeedbackFrames }) => {
  const navigate = useNavigate();
  const defaultEmailText = `Click generate to analyze your contract and receive insights.`;
  const [emailText, setEmailText] = useState(defaultEmailText.replace(/\n/g, '<br>')); // Define a state variable to store the response text
  const [jobFormData, setJobFormData] = useState({
    jobTitle: "",
    location: "",
    seniority: "",
    skills: "",
    jobResponsibilities: "",
    lastGeneratedEmail: "", // <-- Added
    status: "created",
    delivered: 0,
    reply: 0,
    dateCreated: new Date().toLocaleDateString(), // Set to today's date
  });
  const { contractIndex } = useParams(); // Get contractIndex from the URL parameters
   const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [inputText, setInputText] = useState(""); // Stateto capture input text
  const [feedbackFrames, setFeedbackFrames] = useState([]); // State to hold feedback frames
  const [formErrors, setFormErrors] = useState({});


  const handleFeedbackFrameDelete = (frameId) => {
    // Filter out the feedback frame with the given frameId
    const updatedFeedbackFrames = feedbackFrames.filter(
      (frame) => frame.id !== frameId
    );
    setFeedbackFrames(updatedFeedbackFrames);

    // Update the feedback frames in the state
    updateFeedbackFrames(updatedFeedbackFrames, contractIndex);
  };


  // Handler to update the form field values in the state
  const handleFormFieldChange = (fieldName, value) => {

    setJobFormData({
      ...jobFormData,
      [fieldName]: value
    });

    // console.log(jobFormData)
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create a new feedback frame with the input text
    const newFeedbackFrame = {
      id: feedbackFrames.length + 1, // You can use a unique ID here
      text: inputText,
    };
    const newFeedbackFrames = [...feedbackFrames, newFeedbackFrame];
    setFeedbackFrames(newFeedbackFrames);

    // Add the new feedback frame to the state
    updateFeedbackFrames(newFeedbackFrames, contractIndex);

    setInputText(""); // Clear the input field after submission
  };


  const handleRegenerateClick = () => {
    setIsLoading(true);
    // Define the URL for the backend endpoint
    const apiUrl = "http://localhost:5000/api/generate_preview_response"; // Update the URL as needed
    // Prepare the payload data
    const payload = {
      jobFormData,
      userData,
      feedbackFrames: feedbackFrames.map((frame) => frame.text), // Include feedback frame message
    };

    // Make the API GET request
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),  // Include the payload
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend here
        // console.log(data); // You can log the response data for now
        const formattedEmailText = data.message.replace(/\n/g, '<br>');
        setJobFormData(prevJobFormData => ({
          ...prevJobFormData,
          lastGeneratedEmail: formattedEmailText,
        }));
        // setEmailText(formattedEmailText);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error making API request:", error);
        setIsLoading(false);
      });

  };

  const handleSaveJob = (e) => {
    if (e) {
      e.preventDefault();
    }

    let errors = {};
    if (!jobFormData.jobTitle) errors.jobTitle = "Contract Title is required.";
    if (!jobFormData.location) errors.location = "Location is required.";
    if (!jobFormData.seniority) errors.seniority = "Seniority is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const updatedjobFormData = {
      ...jobFormData,
      delivered: jobFormData.delivered || 0,  // Make sure 'delivered' is defined
      reply: jobFormData.reply || 0            // Make sure 'reply' is defined
    };

    // Call savejob to update state
    if (contractIndex !== undefined) {
      saveJob(updatedjzobFormData, contractIndex);
    } else {
      saveJob(updatedjobFormData);
    }
    navigate("/contracts");

  };

  useEffect(() => {
    if (jobFormData && typeof jobFormData === 'object') {
      // If lastGeneratedEmail is available, use it to populate the response text
      if (jobFormData.lastGeneratedEmail) {
        setEmailText(jobFormData.lastGeneratedEmail.replace(/\n/g, '<br>'));
      }
    }
  }, [jobFormData]);

  // Populate jobFormData based on contractIndex
  useEffect(() => {
    if (contracts && contracts[contractIndex]) {
      setJobFormData(contracts[contractIndex]);
      setFeedbackFrames(feedbackFramesGlobal[contractIndex] || []); // Populate feedback frames for the current contract
      if (contracts[contractIndex].lastGeneratedEmail){
        setEmailText(contracts[contractIndex].lastGeneratedEmail.replace(/\n/g, '<br>'));
      }
    
    }
    else{
      handleRegenerateClick();
    }
  }, [contracts, contractIndex, feedbackFramesGlobal]); // Ad


  return (
    <>
      <div className="response-screen">
        <Sidebar
          className="sidebar-instance contracts"
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
          to="/contracts"
        />
        <div className="main-wrap-2">

          <HeaderContainer formErrors={formErrors} className="header-container-instance" onSave={handleSaveJob} />

          <div className="outer-container">
            <div className="left-container">
                  
              <div className="AI-feedback">
                <div className="header-5">
                  <div className="text-wrapper-22">Insert Contract and Info for Assistant</div>
                  <AutoFixNormal
                    className="design-component-instance-node-7"
                    style="outlined"
                    styleOutlined="/img/auto-fix-normal.png"
                  />
                </div>
                <div className="body">
                  <div className="feedback-cards">
                    {feedbackFrames.map((frame) => (
                      <FeedbackFrame
                      handleFeedbackFrameDelete={handleFeedbackFrameDelete}
                        key={frame.id} // Use the unique ID as the key
                        frameId={frame.id} // Pass the frame ID as a prop
                        className="feedback-frame-instance"
                        text={frame.text} // Pass the request text as a prop
                      />
                    ))}
                  </div>
                  <div className="message-padding">
                    <form className="fix-form" onSubmit={handleSubmit}>
                      <div className="message-bar">
                        <div className="ex-use-a-more-wrapper">
                          <input
                            className="ex-use-a-more"
                            type="text"
                            placeholder="Type your message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)} />

                        </div>
                        <button
                          type="submit"
                          className="chatgpt-button" // Apply the chatgpt-button class to the button
                        />
                      </div>
                    </form>

                  </div>

                </div>
              </div>
            </div>
            <div className="response-draft">
              <div className="header-5">
                <div className="text-wrapper-22">Generate Insights</div>
                <Response className="design-component-instance-node-7" style="outlined" styleOutlined="/img/response.png" />
              </div>
              
              <div className="response-padding">
              <div className="button-container">
                  <Button
                    color="green"

                    colorPrimaryClassName="button-84"
                    frameClassName="design-component-instance-node-84"
                    override1={<NameUploadCloud className="icons-3" nameUploadCloud="/img/6808239-white-cropped-1.png" />}
                    showIconRight={true}
                    showIconLeft={false}
                    text="Regenerate"
                    onClick={handleRegenerateClick}
                  />
                  
                </div>
                <div className="response-background">
                  {isLoading ? (
                    <div className="loading-container">
                      <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                    </div>
                  ) : (
                    <div>
                      <div className="br">{""}</div>
                      <br></br>
                      <div>
                        <p className="dear-prospect-name-i" dangerouslySetInnerHTML={{ __html: emailText }} />
                      </div>                  </div>
                  )}

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
