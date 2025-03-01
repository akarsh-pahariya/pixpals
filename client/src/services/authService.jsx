import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
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

export const registerUser = async (userInfo) => {
  console.log(userInfo);
  try {
    const response = await axios.post(`${API_URL}/user/register`, userInfo, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
