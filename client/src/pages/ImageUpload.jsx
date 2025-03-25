import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageDropzone from '../components/image upload/ImageDropzone';
import ImagePreview from '../components/image upload/ImagePreview';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import axios from 'axios';

const ImageUpload = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const { groupId } = useParams();
  const [loading, setLoading] = useState(false);

  const uploadImages = async (files) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.status === 'success') {
      showSuccessToast('Image has been successfully uploaded in the group');
      setFiles([]);
    }
  }, [response]);

  useEffect(() => {
    if (error?.status === 'fail') {
      showErrorToast(
        error.message ||
          'Image cannot be uploaded in the group for unknown reasons, please try again'
      );
      setFiles([]);
    }
  }, [error]);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full mx-auto p-8 bg-[#1C1C1C] rounded-2xl shadow-2xl border border-[#2A2A2A]">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Upload Images
        </h2>
        <ImageDropzone setFiles={setFiles} />

        <div className="mt-6 min-h-[150px] bg-[#141414] rounded-xl p-4 border border-[#2A2A2A]">
          {files.length > 0 ? (
            <ImagePreview files={files} setFiles={setFiles} />
          ) : (
            <p className="text-gray-400 text-center">No files selected</p>
          )}
        </div>

        {files.length > 0 && (
          <button
            onClick={() => uploadImages(files)}
            className="mt-6 w-full bg-[#6D28D9] hover:bg-[#7C3AED] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 ease-in-out"
          >
            Upload Files
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
