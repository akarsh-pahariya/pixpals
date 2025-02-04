import { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <div>
          <p>File Name: {file.name}</p>
          <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>File Type: {file.type}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
