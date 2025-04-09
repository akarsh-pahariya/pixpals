import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageDropzone from '../components/image upload/ImageDropzone';
import ImagePreview from '../components/image upload/ImagePreview';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { uploadImagesToGroup } from '../services/imageService';
import useAuth from '../hooks/useAuth';

const ImageUpload = () => {
  useAuth();
  const navigate = useNavigate();
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
      const res = await uploadImagesToGroup(formData, groupId);
      setResponse(res);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.status === 'success') {
      showSuccessToast('Images have been successfully uploaded in the group');
    }
    setFiles([]);
  }, [response]);

  useEffect(() => {
    if (error) {
      showErrorToast(
        error.message ||
          'Image cannot be uploaded in the group for unknown reasons, please try again'
      );
    }
    setFiles([]);
  }, [error]);

  if (loading) return <Spinner />;

  return (
    <div className="py-15 flex items-center justify-center bg-[#0C0C0C] ">
      <div className="w-full max-w-5xl p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-xl font-bold text-white">Upload Images</h1>
            <p className="text-gray-400 text-sm mt-2">
              Upload images to share with your group
            </p>
          </div>
          <button
            onClick={() => navigate(`/group/${groupId}`)}
            className="px-5 py-3 rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200"
          >
            ⬅️ Back to Group
          </button>
        </div>

        <ImageDropzone setFiles={setFiles} />

        <div className="mt-6 min-h-[200px] bg-[#121212] rounded-lg p-4 border border-[#2A2A2A]">
          {files.length > 0 ? (
            <ImagePreview files={files} setFiles={setFiles} />
          ) : (
            <p className="text-gray-400 text-center">No files selected</p>
          )}
        </div>

        {files.length === 0 && (
          <div className="mt-4 text-left text-red-500 text-sm">
            <p>* Do not upload images larger than 1 MB.</p>
            <p>* Do not upload more than 10 images at once.</p>
          </div>
        )}

        {files.length > 0 && (
          <button
            onClick={() => uploadImages(files)}
            className="mt-6 w-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
          >
            Upload Files
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
