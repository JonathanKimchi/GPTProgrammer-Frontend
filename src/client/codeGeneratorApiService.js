import axios from 'axios';

const isDevelopment = process.env.NODE_ENV == null || process.env.NODE_ENV === 'development';

export const baseUrl = isDevelopment ? 'http://localhost:4242' : 'https://appgpt-backend.com';

console.log('selecting baseUrl: ' + baseUrl);

export const generateCode = async (prompt, applyExtraStyling, generatedCodeFolder = null) => {
  try {
    const requestParams = {
      prompt: prompt,
      applyExtraStyling: applyExtraStyling,
    }
    if (generatedCodeFolder) {
      requestParams.generatedCodeFolder = generatedCodeFolder;
    }
    const response = await axios.get(baseUrl + '/generate-code', {
      params: requestParams,
    });
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editCode = async (prompt, code, generatedCodeFolder = null, pid = null) => {
  try {
    const requestParams = {
      prompt: prompt,
      code: code,
      applyExtraStyling: false,
    }
    if (generatedCodeFolder) {
      requestParams.generatedCodeFolder = generatedCodeFolder;
    }
    if (pid) {
      requestParams.pid = pid;
    }

    const response = await axios.get(baseUrl + '/edit-code', {
      params: requestParams,
    });
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
