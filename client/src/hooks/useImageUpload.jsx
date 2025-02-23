import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
  const [percentage, setPercentage] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/image-grouping',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.round((loaded / total) * 100);
            setPercentage(percent);
          },
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
      setResponse(null);
    }
  };

  return { uploadImages, percentage, response, error };
};

export default useImageUpload;
