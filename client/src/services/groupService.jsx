import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchGroupDetails = async (groupIds) => {
  try {
    const response = await axios.post(`${API_URL}/group`);
    return response;
  } catch (error) {}
};
