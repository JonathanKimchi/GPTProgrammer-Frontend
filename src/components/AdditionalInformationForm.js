import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { Spin } from 'antd';

const AdditionalInformationForm = ({ requestedAdditionalInformation, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Form data: ", formData);
    console.log("requestedAdditionalInformation: ", requestedAdditionalInformation);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const data = {};
    for (const key in requestedAdditionalInformation) {
      data[requestedAdditionalInformation[key]] = formData[key] || requestedAdditionalInformation[key];
    }
    console.log("Data: ", data);
    await onSubmit(data);
  };

  return (
    <div style={styles.container}>
      {console.log("requestedAdditionalInformation: ", requestedAdditionalInformation)}
      {
      Object.entries(requestedAdditionalInformation).map(([key, value]) => (
        <div key={key} style={styles.formRow}>
          <div style={styles.formLabel}>{key}</div>
          <input
            style={styles.formInput}
            type="text"
            name={key}
            onChange={handleInputChange}
            value={formData[key] || ''}
          />
        </div>
      ))}
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
      {loading && 
        <div style={styles.loadingContainer}>
          <Spin tip="This request may take up to two minutes to complete. Give us a moment while our elves work..." />
        </div>
      }
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 16,
      boxShadow: '0px 6px 24px rgba(93, 62, 188, 0.3)',
      padding: 32,
      maxWidth: 600,
      margin: '0 auto',
      marginTop: 64,
    },
    logo: {
      fontSize: 40,
      fontWeight: 'bold',
      margin: 20,
      color: '#5D3EBC',
    },
    textInput: {
      width: '100%',
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      resize: 'vertical', // allow vertical resizing
      outline: 'none',
      fontSize: 18,
      color: '#5D3EBC',
      fontFamily: 'Roboto',
    },
    button: {
      padding: 10,
      margin: 10,
      backgroundColor: '#5D3EBC',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      cursor: 'pointer',
      outline: 'none',
      fontSize: 18,
      fontFamily: 'Roboto',
      transition: 'background-color 0.2s ease-in-out',
    },
    displayLinebreak: {
      whiteSpace: "pre-line"
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20
    },
};

export default AdditionalInformationForm;