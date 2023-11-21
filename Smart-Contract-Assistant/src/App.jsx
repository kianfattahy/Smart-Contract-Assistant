import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Onboarding } from "./screens/Onboarding";
import { Contracts } from "./screens/Contracts";
import { SendResponses } from "./screens/SendResponses";
import { ResponseScreen } from "./screens/ResponseScreen";

export const App = () => {
  // Define a state variable to store user inputs
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    emailAddress: "johndoe@gmail.com",
  });
  const initialContracts = [
    {
      location: "ERC-20 Token",
      status: "Moderate",
      dateCreated: "10/24/2023",
    },
    {
      location: "Sample NFT",
      status: "Strong",
      dateCreated: "11/25/2023",
    },
    {
      location: "Decentralized Exchange (DEX)",
      status: "Strong",
      dateCreated: "12/15/2023",
    },
    {
      location: "Yield Farming Protocol",
      status: "Moderate",
      dateCreated: "01/10/2023",
    },
    {
      location: "Governance Voting",
      status: "Strong",
      dateCreated: "02/21/2023",
    },
    {
      location: "Lending and Borrowing Platform",
      status: "Moderate",
      dateCreated: "03/05/2023",
    },
    {
      location: "Lottery System",
      status: "Moderate",
      dateCreated: "03/25/2023",
    },
    {
      location: "Insurance Smart Contract",
      status: "Strong",
      dateCreated: "04/12/2023",
    }
  ];
  

  const [contracts, setContracts] = useState(initialContracts);

    const [feedbackFramesGlobal, setFeedbackFramesGlobal] = useState({});

    const updateFeedbackFrames = (frames, contractIndex) => {
      setFeedbackFramesGlobal({
        ...feedbackFramesGlobal,
        [contractIndex]: frames
      });
    };
    useEffect(() => {
      // Define the backend URL
      const backendUrl = 'http://localhost:5000';
  
      // Make an API call to check if the user is onboarded
      fetch(`${backendUrl}/api/check_onboard`)
        .then((response) => response.json())
        .then((data) => {
          router.navigate("/");//no longer doing this
        })
        .catch((error) => {
          console.error("Error checking onboard status:", error);
        });
    }, []); // Run this effect only once on component mount


  // Create a function to update the state with user inputs
  const updateUserInput = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };
  const saveContract = (contract, contractIndex) => {
    if (typeof contractIndex !== "undefined" && contracts[contractIndex]) {
      // Update existing contract
      const updatedContracts = [...contracts];
      updatedContracts[contractIndex] = contract;
      setContracts(updatedContracts);
    } else {
      // Add a new contract
      setContracts([...contracts, contract]);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Onboarding updateUserInput={updateUserInput} />, // Pass updateUserInput here
    },
    {
      path: "/contracts",
      element: <Contracts userData={userData} contracts={contracts} feedbackFramesGlobal={feedbackFramesGlobal} />, // Pass userData to the Contracts component
    },
    {
      path: "/response",
      element: <ResponseScreen userData={userData} saveContract={saveContract} contracts={contracts} feedbackFramesGlobal={feedbackFramesGlobal}
      updateFeedbackFrames={updateFeedbackFrames}/>,
    },
    {
      path: "/response/:contractIndex",
      element: <ResponseScreen userData={userData} saveContract={saveContract} contracts={contracts} feedbackFramesGlobal={feedbackFramesGlobal}
      updateFeedbackFrames={updateFeedbackFrames}/>,
    },
  ]);

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
};
