import axios from 'axios';

const USER_API_URL = `${import.meta.env.VITE_API_URL}/user`;

export const updateUserInfo = async (userInfo) => {
  try {
    const response = await axios.patch(USER_API_URL, userInfo, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || 'Cannot update user data in the server'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
