// EmptyState component
import { Upload } from 'lucide-react';

const EmptyState = ({ handlePostImage }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-gray-400 mb-4 text-8xl opacity-30">📷</div>
      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
        No Images Yet
      </h3>
      <p className="text-gray-500 mb-6">
        Be the first to share an image with the group!
      </p>
      <button
        className="py-2 px-4 font-medium rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg transform hover:scale-105"
        onClick={handlePostImage}
      >
        <div className="flex items-center justify-center gap-2">
          <Upload className="w-4 h-4" /> Upload First Image
        </div>
      </button>
    </div>
  );
};

export default EmptyState;
