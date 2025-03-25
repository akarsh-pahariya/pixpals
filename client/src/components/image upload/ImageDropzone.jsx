import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
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
      className={`p-8 border-2 border-dashed rounded-xl cursor-pointer bg-[#141414] transition-all duration-300 ${
        isDragActive
          ? 'border-[#7C3AED]'
          : 'border-[#2A2A2A] hover:border-[#6D28D9]'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-[#7C3AED] text-center font-medium">
          Drop your images here...
        </p>
      ) : (
        <p className="text-gray-400 text-center">
          Drag & drop images here, or{' '}
          <span className="text-[#7C3AED] font-medium">browse files</span>
        </p>
      )}
    </div>
  );
};

export default ImageDropzone;
