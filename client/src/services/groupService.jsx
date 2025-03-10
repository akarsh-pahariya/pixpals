import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchGroupsList = async () => {
  try {
    const response = await axios.get(`${API_URL}/group`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
