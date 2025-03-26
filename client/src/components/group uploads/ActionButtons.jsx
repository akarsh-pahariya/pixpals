// ActionButtons component
import { Upload, Info } from 'lucide-react';

const ActionButtons = ({ handlePostImage, handleViewGroupDetails }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <button
        className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200 shadow-lg shadow-[#4C1D95]/30"
        onClick={handlePostImage}
      >
        <div className="flex items-center justify-center gap-2">
          <Upload className="w-5 h-5" /> Post Image
        </div>
      </button>
      <button
        className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-all duration-200 shadow-lg shadow-[#2A2A2A]/30"
        onClick={handleViewGroupDetails}
      >
        <div className="flex items-center justify-center gap-2">
          <Info className="w-5 h-5" /> Group Details
        </div>
      </button>
    </div>
  );
};

export default ActionButtons;
