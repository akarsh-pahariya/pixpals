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

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-[#181818] border border-[#2A2A2A] p-6 rounded-xl shadow-lg w-full max-w-md text-white relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Pending Invitations</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
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
                  className="p-4 bg-[#121212] rounded-lg border border-[#2A2A2A] shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-[#4C1D95]" />
                      <p className="text-white font-bold">{group.name}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-1">
                    Invited by{' '}
                    <span className="font-semibold text-[#4C1D95]">
                      {senderUsername}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    {format(new Date(invitationDate), 'dd MMM yyyy, hh:mm a')}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onAccept(id)}
                      className="flex-1 py-2 px-3 bg-[#4C1D95] text-white rounded-lg hover:bg-[#5B21B6] transition-all shadow-lg shadow-[#4C1D95]/30 flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => onReject(id)}
                      className="flex-1 py-2 px-3 bg-[#D32F2F] text-white rounded-lg hover:bg-[#B71C1C] transition-all shadow-lg shadow-[#D32F2F]/30 flex items-center justify-center gap-1"
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
          className="mt-6 w-full py-3 font-bold rounded-lg text-white bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PendingInvitationsModal;
