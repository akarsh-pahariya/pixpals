import { X } from 'lucide-react';

const ImagePreview = ({ files, setFiles }) => {
  const handleRemoveImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  return (
    <div className="text-white w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-200">
          Uploaded Images ({files.length})
        </h2>
        {files.length > 0 && (
          <button
            className="text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors duration-200"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Image Container */}
      <div className="max-h-64 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover rounded-lg border border-[#2A2A2A]"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
