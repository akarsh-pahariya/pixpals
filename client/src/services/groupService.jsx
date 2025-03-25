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

export const createGroup = async (groupDetails) => {
  try {
    const response = await axios.post(`${API_URL}/group`, groupDetails, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || 'Cannot create group, please try again'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const getGroupImages = async (groupId, pageNumber) => {
  try {
    const response = await axios.get(
      `${API_URL}/group/${groupId}/image?page=${pageNumber}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          'Cannot get group images at the moment, please try again'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const getGroupDetails = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/group/${groupId}/details`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          'Cannot get group details at the moment, please try again'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const sendInvitation = async (groupId, usernames) => {
  try {
    const response = await axios.post(
      `${API_URL}/invite/${groupId}`,
      {
        members: usernames,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          'Cannot send invitations at the moment, please try again'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${API_URL}/group/${groupId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          'Cannot delete group at the moment, please try again'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
