import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const useImageUpload = (groupId) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const uploadImages = async (files) => {
    dispatch(setIsLoadingToTrue());
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const res = await axios.post(
        `${API_URL}/group/${groupId}/image`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    } finally {
      dispatch(setIsLoadingToFalse());
    }
  };

  return { uploadImages, response, error };
};

export default useImageUpload;
