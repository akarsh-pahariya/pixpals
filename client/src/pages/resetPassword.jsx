import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, Save } from 'lucide-react';
import { userResetsPassword } from '../services/authService';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await userResetsPassword(token, {
        password,
        confirmPassword,
      });
      showSuccessToast('Password reset successful!');
      navigate('/login');
    } catch (error) {
      showErrorToast(error.message);
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (loading) return <Spinner />;

  return (
    <div className="py-15 flex items-center justify-center bg-[#0C0C0C] p-4">
      <div className="max-w-md w-full p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="text-gray-400 text-sm mt-2">Enter your new password</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-12 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {isPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-12 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 font-bold rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Save className="w-5 h-5" /> Reset Password
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
