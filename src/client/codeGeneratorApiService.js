import axios from 'axios';

export const generateCode = async (prompt, applyExtraStyling) => {
  try {
    const response = await axios.get('http://localhost:4242/generate-code', {
      params: {
        prompt: prompt,
        applyExtraStyling: applyExtraStyling,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editCode = async (prompt, code) => {
  try {
    const response = await axios.get('http://localhost:4242/edit-code', {
      params: {
        prompt: prompt,
        code: code,
        applyExtraStyling: false,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
