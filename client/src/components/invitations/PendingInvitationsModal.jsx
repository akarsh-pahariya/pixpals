import { format } from 'date-fns';
import { X, Bell, UserPlus, Check, X as XIcon } from 'lucide-react';

const PendingInvitationsModal = ({
  isOpen,
  onClose,
  invitations,
  onAccept,
  onReject,
}) => {
  if (!isOpen) return null;

  // Close modal only when clicking the backdrop, NOT inside the modal
  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      {/* Radial Gradient Overlay for Effect */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div
        className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-white backdrop-blur-sm bg-opacity-80 relative z-10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
            <div className="flex items-center gap-2">Pending Invitations</div>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {invitations.length === 0 ? (
          <div className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <Bell className="w-12 h-12 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">No pending invitations.</p>
            <p className="text-gray-500 text-sm mt-2">Check back later!</p>
          </div>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {invitations.map(
              ({ id, group, senderUsername, invitationDate }) => (
                <li
                  key={id}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-cyan-400" />
                      <p className="text-white font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                        {group.name}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-1">
                    Invited by{' '}
                    <span className="font-semibold text-cyan-300">
                      {senderUsername}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    {format(new Date(invitationDate), 'dd MMM yyyy, hh:mm a')}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onAccept(id)}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => onReject(id)}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center gap-1"
                    >
                      <XIcon className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 font-bold rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PendingInvitationsModal;
