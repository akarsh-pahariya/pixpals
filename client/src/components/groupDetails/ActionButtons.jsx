// ActionButtons component
import { Upload, Info, LogOut } from 'lucide-react';

const ActionButtons = ({
  handlePostImage,
  handleViewGroupInfo,
  handleLeaveGroup,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <button
        className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
        onClick={handlePostImage}
      >
        <div className="flex items-center justify-center gap-2">
          <Upload className="w-5 h-5" /> Post Image
        </div>
      </button>
      <button
        className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-500/20 transform hover:scale-105"
        onClick={handleViewGroupInfo}
      >
        <div className="flex items-center justify-center gap-2">
          <Info className="w-5 h-5" /> Group Details
        </div>
      </button>
      <button
        className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105"
        onClick={handleLeaveGroup}
      >
        <div className="flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" /> Leave Group
        </div>
      </button>
    </div>
  );
};

export default ActionButtons;
