import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { Spin } from 'antd';
import AdditionalInformationForm from './components/AdditionalInformationForm';
import { generateCode , editCode } from './client/codeGeneratorApiService';
const App = () => {
  const [text, setText] = useState('');
  const [appOutput, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [applyExtraStyling, setApplyExtraStyling] = useState(false);
  const [requestedAdditionalInformation, setAdditionalInformation] = useState({});
  const [tempGeneratedCode, setTempGeneratedCode] = useState('');
  const [apiResponse, setApiResponse] = useState({});
  const [codeState, setCodeState] = useState('initial');

  const handleTextInput = (e) => {
    setText(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setApplyExtraStyling(e.target.checked);
  };

  const handleSubmit = async () => {
    setLoading(true);
    var response;
    console.log("Code State: ", codeState);
    var generatedCodeFolder;
    var pid;
    if (apiResponse && apiResponse.generatedCodeFolder) {
      generatedCodeFolder = apiResponse.generatedCodeFolder;
    }
    if (apiResponse && apiResponse.pid) {
      pid = apiResponse.pid;
    }
    switch (codeState) {
      case 'initial':
        response = await generateCode(text, applyExtraStyling, generatedCodeFolder);
        break;
      case 'edit':
        response = await editCode(text, tempGeneratedCode, generatedCodeFolder, pid);
        break;
      default:
        response = await generateCode(text, applyExtraStyling, generatedCodeFolder);
        break;
    }
    console.log("Response: ", response);
    if (response && response.requestedInformation) {
      setTempGeneratedCode(response.code);
      setApiResponse(response);
      setAdditionalInformation(response.requestedInformation);
    } else {
      setCodeState('edit');
      setTempGeneratedCode(response.code);
      if (appOutput === '') {
        setOutput(response.result);
      }
    }
    setLoading(false);
  };

  const handleAdditionalInformationSubmit = async (additionalInformation) => {
    setLoading(true);
    setAdditionalInformation({});
    const response = await axios.get('http://localhost:4242/generate-code', {
      params: {
        applyExtraStyling: applyExtraStyling,
        requestedInformation: additionalInformation,
        code: tempGeneratedCode,
      }
    });
    setCodeState('edit');
    setOutput(response.data.response.result);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>AppGPT</div>
      <textarea
        style={styles.textInput}
        placeholder="Enter a text prompt"
        value={text}
        onChange={handleTextInput}
        multiline
        rows={4}
      />
      <div style={styles.checkboxContainer}>
        <label>
          <input
            type="checkbox"
            checked={applyExtraStyling}
            onChange={handleCheckboxChange}
          />
          Apply extra styling
        </label>
      </div>
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
      {loading && 
        <div style={styles.loadingContainer}>
          <Spin tip="This request may take up to two minutes to complete. Give us a moment while our elves work..." />
        </div>
      }
      {Object.keys(requestedAdditionalInformation).length > 0 &&
        <AdditionalInformationForm requestedAdditionalInformation={requestedAdditionalInformation} onSubmit={handleAdditionalInformationSubmit}/>
      }
      {appOutput && <QRCode value={appOutput} />}
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

export default App;
