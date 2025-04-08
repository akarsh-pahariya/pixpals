import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { addUserInfo } from '../store/slices/userSlice';
import { registerUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, AtSign } from 'lucide-react';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const loading = useSelector((store) => store.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingToTrue());

    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match!');
      dispatch(setIsLoadingToFalse());
      return;
    }

    try {
      const userData = await registerUser({
        name,
        username,
        email,
        password,
        confirmPassword,
      });
      dispatch(addUserInfo(userData.data.user));
      showSuccessToast('Registration Successful!');
      navigate('/dashboard');
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  if (loading) <Spinner />;

  return (
    <div className="flex items-center justify-center bg-[#0C0C0C] p-15">
      <div className="max-w-3xl w-full p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="text-gray-400 text-sm mt-2">
            Join us and start your journey
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Full Name and Username Fields */}
          <div className="flex gap-6">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <AtSign className="w-5 h-5" />
              </div>
              <input
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password and Confirm Password Fields */}
          <div className="flex gap-6">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                className="w-full pl-10 pr-12 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
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

            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                className="w-full pl-10 pr-12 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {isConfirmPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-bold rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" /> Create Account
            </div>
          </button>
        </form>

        {/* Login Link */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <p className="text-gray-400 text-sm">Already have an account?</p>
          <Link
            to="/login"
            className="text-sm font-bold py-2 px-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white transition-all"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
