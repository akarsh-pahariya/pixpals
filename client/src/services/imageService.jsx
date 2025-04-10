import axios from 'axios';

const IMAGE_API_URL = `${import.meta.env.VITE_API_URL}/group`;

export const uploadImagesToGroup = async (imageData, groupId) => {
  try {
    const response = await axios.post(
      `${IMAGE_API_URL}/${groupId}/image`,
      imageData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error uploading images');
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const deleteImagesFromGroup = async (imageIds, groupId) => {
  try {
    const response = await axios.post(
      `${IMAGE_API_URL}/${groupId}/image/user/delete`,
      { imagesId: imageIds },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || 'Cannot delete image from the server'
      );
    } else if (error.request) {
      throw new Error('Unable to reach the server. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
