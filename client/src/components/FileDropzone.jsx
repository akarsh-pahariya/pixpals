import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // Append new files
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 border-2 border-dashed rounded-lg cursor-pointer bg-gray-900 text-white border-gray-600 hover:border-blue-500 transition-all duration-300"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-400 font-semibold">Drop the files here...</p>
      ) : (
        <p className="text-gray-300">
          Drag & drop some files here, or{' '}
          <span className="text-blue-400 font-semibold">click to select</span>
        </p>
      )}
    </div>
  );
};

export default FileDropzone;
