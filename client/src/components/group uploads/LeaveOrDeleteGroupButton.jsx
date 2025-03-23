import { LogOut } from 'lucide-react';

const LeaveOrDeleteGroupButton = ({ isAdmin, handleAction }) => {
  return (
    <button
      className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105"
      onClick={handleAction}
    >
      <div className="flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" /> {isAdmin ? 'Delete' : 'Leave'} Group
      </div>
    </button>
  );
};

export default LeaveOrDeleteGroupButton;
