import { useState } from 'react';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-6 text-blue-400">
          Create New Group
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Add Users
            </label>
            <div className="flex">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                placeholder="Enter username"
              />
              <button
                type="button"
                onClick={handleAddUser}
                className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-500 transition-all"
              >
                Add
              </button>
            </div>
          </div>

          {usersList.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {usersList.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-800 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm text-gray-200">{user}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveUser(user)}
                      className="ml-2 text-gray-400 hover:text-red-400"
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
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={groupName.trim() === ''}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
