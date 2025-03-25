import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImagesToGroup = async (imageData, groupId) => {
  try {
    const response = await await axios.post(
      `${API_URL}/group/${groupId}/image`,
      imageData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || 'Cannot fetch group data from the server'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
