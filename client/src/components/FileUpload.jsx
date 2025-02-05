import { useState } from 'react';
import FileDropzone from './FileDropzone';
import FileUploadProgressBar from './FileUploadProgressBar';
import FilePreview from './FilePreview';

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = () => {
    console.log('Uploading files:', files);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">File Upload</h2>
      <FileDropzone setFiles={setFiles} />

      <div className="mt-4 min-h-[150px] border border-gray-700 rounded-lg p-4">
        {files.length > 0 ? (
          <FilePreview files={files} setFiles={setFiles} />
        ) : (
          <p className="text-gray-500 text-center">No files selected</p>
        )}
      </div>

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-all"
        >
          Upload Files
        </button>
      )}

      <FileUploadProgressBar />
    </div>
  );
};

export default FileUpload;
