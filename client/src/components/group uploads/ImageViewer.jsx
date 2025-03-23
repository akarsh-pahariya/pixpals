import { X, ArrowLeft, ArrowRight, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect } from 'react';

const ImageViewer = ({ images, currentIndex, onClose, onNavigate }) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen bg-black/90">
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/70"
        onClick={onClose}
      ></div>

      <div
        className="relative z-10 w-full h-screen flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 p-3 bg-gray-900/80 rounded-full hover:bg-gray-800 transition"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-800/80 text-white px-4 py-2 rounded-lg text-sm font-semibold">
          {currentIndex + 1} / {images.length}
        </div>

        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-gray-900/80 rounded-full hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-gray-900/80 rounded-full hover:bg-gray-800 transition"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        )}

        <div className="max-w-[95vw] max-h-[90vh] flex items-center justify-center">
          <img
            src={currentImage.secureURL}
            alt={`Posted by ${currentImage.userId.name}`}
            className="w-auto h-auto max-w-full max-h-full object-contain"
          />
        </div>

        <div className="absolute bottom-10 bg-gray-900/80 px-6 py-3 rounded-md flex items-center gap-6 text-white">
          <div className="flex items-center">
            <User className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="font-medium">{currentImage.userId.name}</span>
          </div>

          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-pink-400 mr-2" />
            <span className="text-sm">
              {format(new Date(currentImage.createdAt), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
