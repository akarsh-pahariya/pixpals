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
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div
        className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-white backdrop-blur-sm bg-opacity-80 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Invite Members
          </h2>
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
              className="w-full pl-10 pr-12 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
            />
            <button
              onClick={onAddUser}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {inviteUsersList.length > 0 && (
            <div className="max-h-40 overflow-y-auto space-y-2 p-2">
              {inviteUsersList.map((username) => (
                <div
                  key={username}
                  className="flex items-center justify-between p-2 bg-gray-800 rounded-lg"
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
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={inviteUsersList.length === 0}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-all ${
                inviteUsersList.length === 0
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 transform hover:scale-105'
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
