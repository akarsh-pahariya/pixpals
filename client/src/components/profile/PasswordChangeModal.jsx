// src/components/profile/PasswordChangeModal.jsx
import { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';

const PasswordChangeModal = ({ onClose, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onSubmit(passwordData);
    if (success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl relative">
        <div className="p-4 bg-gray-800/80 rounded-lg border border-gray-700 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 flex items-center">
            <Key className="w-5 h-5 mr-2 text-amber-400" />
            Change Password
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Confirm New Password
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-500/20"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
