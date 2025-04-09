import { User, Calendar, Check } from 'lucide-react';
import { format } from 'date-fns';

const SelectableImageGrid = ({ imageData, selectedImages, onToggleSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {imageData.map((image) => (
        <div
          key={image._id}
          className={`relative bg-gray-800 rounded-lg overflow-hidden border ${
            selectedImages.has(image._id)
              ? 'border-purple-500'
              : 'border-gray-700'
          } shadow-lg shadow-purple-500/10 transform transition-all duration-300 hover:scale-102 hover:shadow-purple-500/20 cursor-pointer`}
          onClick={() => onToggleSelect(image._id)}
        >
          {selectedImages.has(image._id) && (
            <div className="absolute top-2 right-2 z-10 bg-purple-500 rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
          <div
            className={`${selectedImages.has(image._id) ? 'opacity-75' : ''}`}
          >
            <img
              src={image.secureURL}
              alt={`Posted by ${image.postedBy}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 text-sm font-medium">
                  {image.userId.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-400" />
                <span className="text-gray-400 text-xs">
                  {format(new Date(image.createdAt), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectableImageGrid;
