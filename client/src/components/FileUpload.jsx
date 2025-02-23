import { useState } from 'react';
import FileDropzone from './FileDropzone';
import FileUploadProgressBar from './FileUploadProgressBar';
import FilePreview from './FilePreview';
import useImageUpload from '../hooks/useImageUpload';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const { uploadImages, percentage, response, error } = useImageUpload();

  return (
    <div className="max-w-3xl w-full mx-auto p-8 bg-[#1C1C1C] rounded-2xl shadow-2xl border border-[#2A2A2A]">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Upload Images
      </h2>
      <FileDropzone setFiles={setFiles} />

      <div className="mt-6 min-h-[150px] bg-[#141414] rounded-xl p-4 border border-[#2A2A2A]">
        {files.length > 0 ? (
          <FilePreview files={files} setFiles={setFiles} />
        ) : (
          <p className="text-gray-400 text-center">No files selected</p>
        )}
      </div>

      {files.length > 0 && percentage === 0 && (
        <button
          onClick={() => uploadImages(files)}
          className="mt-6 w-full bg-[#6D28D9] hover:bg-[#7C3AED] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 ease-in-out"
        >
          Upload Files
        </button>
      )}

      {percentage > 0 && <FileUploadProgressBar percentage={percentage} />}
    </div>
  );
};

export default FileUpload;
