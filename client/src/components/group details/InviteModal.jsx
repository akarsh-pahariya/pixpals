import { User, Plus, X } from 'lucide-react';

const InviteModal = ({
  isOpen,
  onClose,
  onSubmit,
  inviteUsername,
  setInviteUsername,
  inviteUsersList,
  onAddUser,
  onRemoveUser,
  onKeyDown,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#181818] border border-[#2A2A2A] p-6 rounded-xl shadow-lg w-full max-w-md text-white relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Invite Members</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Enter username"
              className="w-full pl-10 pr-12 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:border-[#4C1D95] focus:outline-none transition-all"
            />
            <button
              onClick={onAddUser}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4C1D95] hover:text-[#5B21B6] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {inviteUsersList.length > 0 && (
            <div className="max-h-40 overflow-y-auto space-y-2 p-2">
              {inviteUsersList.map((username) => (
                <div
                  key={username}
                  className="flex items-center justify-between p-2 bg-[#121212] rounded-lg"
                >
                  <span className="text-sm text-gray-300">{username}</span>
                  <button
                    onClick={() => onRemoveUser(username)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-[#121212] rounded-lg border border-[#2A2A2A] hover:bg-[#2A2A2A] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={inviteUsersList.length === 0}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-all ${
                inviteUsersList.length === 0
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-[#4C1D95] hover:bg-[#5B21B6] shadow-lg shadow-[#4C1D95]/30'
              }`}
            >
              Send Invitations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
