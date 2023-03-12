import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd'; // replace with your preferred UI library

const PopupCard = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('dismissed');
    if (dismissed === 'true') {
      setShowPopup(false);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    localStorage.setItem('dismissed', event.target.checked);
  };

  const handleDismissClick = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
        }}
      />
      <div
        className="popup-card"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '90%',
          backgroundColor: 'white',
          zIndex: 9999,
        }}
      >
        <p>Welcome to AppGPT! Here's how to use it:</p>
        <ul>
          <li>
            Step 0: Make sure that you have Expo Go on your phone. This is what lets you download apps generated by AppGPT.
            You can download it from the App Store or Google Play. Relevant links:
            <ul>
                <li>
                    <a href="https://apps.apple.com/us/app/expo-go/id982107779">App Store</a>
                </li>
                <li>
                    <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US">Google Play</a>
                </li>
            </ul>
          </li>
          <li>Step 1: Enter your prompt in the input field</li>
          <li>Step 2: Click the 'Submit' button</li>
          <li>Step 3: Scan the QR code that appears</li>
        </ul>
        <p>
            This website also supports following up on requests. Simply 
            type what you want to change about the generated app and click 'Submit' 
            again to get a new QR code with your changes.
        </p>
        <p>Please note that this website is in early alpha and has certain limitations:</p>
        <ul>
          <li>The app may not always run perfectly.</li>
          <li>Apps aren't saved when you close your browser</li>
          <li>The service may occasionally be unavailable due to maintenance or other issues</li>
        </ul>
        <p>
            We intend to add the ability for users to download the apps generated permanently + source code
            in the future. Please be patient with us as we work on this project!
        </p>
        <Checkbox onChange={handleCheckboxChange}>Don't show this message again</Checkbox>
        <Button onClick={handleDismissClick}>Dismiss</Button>
      </div>
    </>
  );
};

export default PopupCard;
