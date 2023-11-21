import React, { useState } from "react";
import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Onboarding = ({ updateUserInput }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    company: '',
    missionStatement: '',
    companyMottos: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  // Function to validate response format
  const isValidEmail = (response) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(response);
  };

  // Function to handle input changes and update the state
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    updateUserInput(field, value);

    setIsButtonEnabled(formData.fullName && formData.company && isValidEmail(formData.emailAddress));
  };

  const handleContinue = (e) => {
    if (e) {
      e.preventDefault();
    }

    let errors = {};
    if (!formData.fullName) errors.fullName = "Name is required.";
    if (!isValidEmail(formData.emailAddress)) errors.emailAddress = "Valid Email Address is required.";


    setFormErrors(errors);
    console.log(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }
    navigate("/contracts");

    // Continue logic here (navigate or any other action)
  };


  return (
    <div className="onboarding">
      <div className="frame-5">
        <div className="frame-6">
          <div className="text-wrapper-10">Let’s get you started</div>
          <div className="frame-7">
            <div className="frame-8">
            <FormField
              className="first-name-field"
              text="Name"
              onChange={(value) => handleInputChange("fullName", value)}
              error={formErrors.fullName}
            />
            <FormField
              className="first-name-field"
              text="Email Address"
              onChange={(value) => handleInputChange("emailAddress", value)}
              error={formErrors.emailAddress}
            />

            </div>
            <Button
              color="primary"
              colorPrimaryClassName="button-3"
              divClassName="button-5"
              frameClassName="button-4"
              showIconLeft={false}
              showIconRight={false}
              onClick={handleContinue}
              text="Continue"
            />
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="frame-9">
            <img className="img" alt="Ba c bd" src="/img/b6a88616-c461-4b5d-8836-52550dbd3d7f-1.png" />
            <div className="text-wrapper-11">Smart Contract Assistant</div>
          </div>
        </div>
      </div>
      <img
        className="DALLE"
        alt="Dalle"
        src="/img/ethereum.png"
      />
    </div>
  );
};
