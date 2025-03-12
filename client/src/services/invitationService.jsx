import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchInvitations = async () => {
  try {
    const response = await axios.get(`${API_URL}/invite`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          'Cannot fetch invitations from the server'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const acceptInvitation = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/invite/${groupId}/accept`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || 'Cannot accept the invitation for now'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const declineInvitation = async (groupId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/invite/${groupId}/decline`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          'Cannot decline the group invitation for now'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
