// ActionButtons component
import { Upload, Info, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ActionButtons = ({ handlePostImage, handleViewGroupDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
      <button
        className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-[#DC2626] hover:bg-[#EF4444] transition-all duration-200 shadow-lg shadow-[#DC2626]/30"
        onClick={() => navigate(`${location.pathname}/delete-images`)}
      >
        <div className="flex items-center justify-center gap-2">
          <Trash2 className="w-5 h-5" /> Delete Images
        </div>
      </button>
    </div>
  );
};

export default ActionButtons;
