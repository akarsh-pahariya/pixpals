import { useState } from 'react';
import { Users, X, Plus, User } from 'lucide-react';

const CreateGroupModal = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const [usersList, setUsersList] = useState([]);

  const handleAddUser = () => {
    if (username.trim() !== '' && !usersList.includes(username.trim())) {
      setUsersList([...usersList, username.trim()]);
      setUsername('');
    }
  };

  const handleRemoveUser = (userToRemove) => {
    setUsersList(usersList.filter((user) => user !== userToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: groupName, members: usersList });

    setGroupName('');
    setUsername('');
    setUsersList([]);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddUser();
    }
  };

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create New Group</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Group Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Users className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all"
                placeholder="Enter group name"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Add Users
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-l-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all"
                  placeholder="Enter username"
                />
              </div>
              <button
                type="button"
                onClick={handleAddUser}
                className="px-4 bg-[#4C1D95] text-white rounded-r-lg hover:bg-[#5B21B6] transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {usersList.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {usersList.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#121212] px-3 py-1 rounded-full border border-[#2A2A2A]"
                  >
                    <span className="text-sm text-gray-300">{user}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveUser(user)}
                      className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-[#121212] text-gray-300 rounded-lg hover:bg-[#2A2A2A] transition-all border border-[#2A2A2A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={groupName.trim() === ''}
              className="px-5 py-3 font-bold rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all shadow-lg shadow-[#4C1D95]/30"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
