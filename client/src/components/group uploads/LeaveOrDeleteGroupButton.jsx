import { LogOut } from 'lucide-react';

const LeaveOrDeleteGroupButton = ({ isAdmin, handleAction }) => {
  return (
    <button
      className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-[#c72d2d] hover:bg-[#B71C1C] transition-all duration-200 shadow-lg shadow-[#D32F2F]/30"
      onClick={handleAction}
    >
      <div className="flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" /> {isAdmin ? 'Delete' : 'Leave'} Group
      </div>
    </button>
  );
};

export default LeaveOrDeleteGroupButton;
