import { X } from 'lucide-react';

const FilePreview = ({ files, setFiles }) => {
  const handleRemoveImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-4xl mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Uploaded Images ({files.length})
        </h2>
        {files.length > 0 && (
          <button
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Image Container */}
      <div className="max-h-64 overflow-y-auto grid grid-cols-3 md:grid-cols-4 gap-4 p-2">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="w-32 h-32 object-cover rounded-lg border border-gray-700"
            />
            {/* Delete Icon */}
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded-full opacity-75 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;
