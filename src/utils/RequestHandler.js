import axios from "axios";

const RequestHandler = async (url, method = 'GET', data = {}, headers = {}) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error.response?.data || {
      success: false,
      message: 'An error occurred while making the request'
    };
  }
};

export default RequestHandler;
