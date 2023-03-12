import axios from 'axios';

export const generateCode = async (prompt, applyExtraStyling, generatedCodeFolder = null) => {
  try {
    const response = await axios.get('http://localhost:4242/generate-code', {
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
    const response = await axios.get('http://localhost:4242/edit-code', {
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
