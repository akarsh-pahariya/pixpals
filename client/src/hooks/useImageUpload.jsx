import axios from 'axios';

const useImageUpload = () => {
  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/image-grouping`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { uploadImages };
};

export default useImageUpload;
