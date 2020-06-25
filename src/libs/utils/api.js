import axios from 'axios';

const callAPI = async (method, url, data) => {
  try {
    const URL = process.env.REACT_APP_BASE_URL + url;
    const response = await axios({
      method,
      url: URL,
      ...data,
    });
    return response.data;
  } catch (error) {
    return { message: error.message, status: 'error' };
  }
};
export default callAPI;
