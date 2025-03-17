// src/components/profile/ProfileForm.jsx
import { Key, Mail, Save, UserIcon } from 'lucide-react';
import ProfileInfoItem from './ProfileIntoItem';

const ProfileForm = ({
  user,
  formData,
  isEditing,
  handleChange,
  handleSubmit,
  setIsEditing,
  showPasswordModal,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <ProfileInfoItem
          icon={<UserIcon className="w-5 h-5 text-purple-400 mr-2" />}
          label="Username"
          isEditing={isEditing}
          value={user.username}
        >
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              required
            />
          ) : (
            <p className="text-lg font-medium">{user.username}</p>
          )}
        </ProfileInfoItem>

        <ProfileInfoItem
          icon={<UserIcon className="w-5 h-5 text-cyan-400 mr-2" />}
          label="Full Name"
          isEditing={isEditing}
          value={user.name}
        >
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              required
            />
          ) : (
            <p className="text-lg font-medium">{user.name}</p>
          )}
        </ProfileInfoItem>

        <ProfileInfoItem
          icon={<Mail className="w-5 h-5 text-pink-400 mr-2" />}
          label="Email Address"
          isEditing={isEditing}
          value={user.email}
        >
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              required
            />
          ) : (
            <p className="text-lg font-medium">{user.email}</p>
          )}
        </ProfileInfoItem>

        {!isEditing && (
          <button
            type="button"
            onClick={showPasswordModal}
            className="w-full p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-colors text-left"
          >
            <div className="flex items-center">
              <Key className="w-5 h-5 text-amber-400 mr-2" />
              <span className="font-medium">Change Password</span>
            </div>
          </button>
        )}

        {isEditing && (
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
              }}
              className="px-5 py-3 rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
