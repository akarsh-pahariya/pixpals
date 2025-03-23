import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

const LeaveGroupModal = ({ groupName, onConfirm, onCancel }) => {
  useEffect(() => {
    // Disable scrolling & scroll to top when modal opens
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore scrolling when modal closes
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 h-screen">
      {/* Background Blur & Clickable Area */}
      <div
        className="absolute inset-0 backdrop-blur-lg bg-black/70"
        onClick={onCancel}
      ></div>

      {/* Modal Content */}
      <div
        className="relative z-10 bg-gray-900/90 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Header */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 mr-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Leave Group?</h3>
            <p className="text-gray-300 mt-1">
              You'll need an invitation to rejoin
            </p>
          </div>
        </div>

        {/* Confirmation Message */}
        <p className="text-white mb-6 text-center">
          Are you sure you want to leave{' '}
          <span className="text-pink-500 font-medium">{groupName}</span>?
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-lg text-white border border-gray-600 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all shadow-lg shadow-red-500/20"
          >
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveGroupModal;
