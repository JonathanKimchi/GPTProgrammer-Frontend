import axios from 'axios';

const isDevelopment = process.env.NODE_ENV == null || process.env.NODE_ENV === 'development';

const baseUrl = isDevelopment ? 'http://localhost:4242' : 'https://appgpt-backend:10000';

console.log('selecting baseUrl: ' + baseUrl);

export const generateCode = async (prompt, applyExtraStyling, generatedCodeFolder = null) => {
  try {
    const response = await axios.get(baseUrl + '/generate-code', {
      params: {
        prompt: prompt,
        applyExtraStyling: applyExtraStyling,
        generatedCodeFolder: generatedCodeFolder,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editCode = async (prompt, code, generatedCodeFolder = null, pid = null) => {
  try {
    const response = await axios.get(baseUrl + '/edit-code', {
      params: {
        prompt: prompt,
        code: code,
        applyExtraStyling: false,
        generatedCodeFolder: generatedCodeFolder,
        pid: pid,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
