import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { Link } from 'react-router-dom';
import { UserCheck, Send, Mail } from 'lucide-react';
import { userForgetsPassword } from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await userForgetsPassword({ username, email });
      showSuccessToast('Password reset link sent to your email!');
    } catch (error) {
      showErrorToast(error.message);
    }
    setLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <div className="py-15 flex items-center justify-center bg-[#0C0C0C] p-4">
      <div className="max-w-md w-full p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter your details to reset password
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 font-bold rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Reset Link
            </div>
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-white transition-all"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
