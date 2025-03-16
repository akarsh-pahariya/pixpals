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
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div
        className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-white backdrop-blur-sm bg-opacity-80 relative z-10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
            Create New Group{' '}
            <span className="inline-block animate-pulse">✨</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
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
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-0 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-0 rounded-l-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
                  placeholder="Enter username"
                />
              </div>
              <button
                type="button"
                onClick={handleAddUser}
                className="px-4 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600 transition-all shadow-lg flex items-center justify-center"
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
                    className="flex items-center bg-gray-800 px-3 py-1 rounded-full border border-gray-700"
                  >
                    <span className="text-sm text-gray-200">{user}</span>
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
              className="px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={groupName.trim() === ''}
              className="px-5 py-3 font-bold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
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
