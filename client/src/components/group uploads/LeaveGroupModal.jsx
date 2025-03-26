import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

const LeaveGroupModal = ({ groupName, onConfirm, onCancel }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 h-screen">
      <div
        className="absolute inset-0 backdrop-blur-lg bg-black/70"
        onClick={onCancel}
      ></div>

      <div
        className="relative z-10 bg-[#181818] border border-[#2A2A2A] rounded-xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#4C1D95]/20 mr-4">
            <AlertTriangle className="w-6 h-6 text-[#4C1D95]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Leave Group?</h3>
            <p className="text-gray-400 mt-1">
              You'll need an invitation to rejoin
            </p>
          </div>
        </div>

        <p className="text-gray-300 mb-6 text-center">
          Are you sure you want to leave{' '}
          <span className="text-[#4C1D95] font-medium">{groupName}</span>?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-lg text-white border border-gray-600 hover:bg-[#2A2A2A] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-lg text-white bg-[#D32F2F] hover:bg-[#B71C1C] transition-all shadow-lg shadow-[#D32F2F]/30"
          >
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveGroupModal;
