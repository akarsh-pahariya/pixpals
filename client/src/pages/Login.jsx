import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/authService';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { addUserInfo } from '../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Lock, LogIn, UserCheck } from 'lucide-react';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const Login = () => {
  useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loading = useSelector((state) => state.loading.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard');
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingToTrue());

    try {
      const userData = await loginUser(username, password);
      dispatch(addUserInfo(userData.data.user));
      showSuccessToast('Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (loading) <Spinner />;

  return (
    <div className="py-15 flex items-center justify-center bg-[#0C0C0C] p-4">
      <div className="max-w-md w-full p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
          <p className="text-gray-400 text-sm mt-2">
            Login to access your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
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
              <Lock className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-12 py-3 bg-[#121212] text-white border border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-[#4C1D95] focus:outline-none transition-all placeholder-gray-500"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
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

          <button
            type="submit"
            className="w-full py-3 mt-2 font-bold rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" /> Login
            </div>
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-6">
          <p className="text-gray-400 text-sm">New here?</p>
          <Link
            to="/register"
            className="text-sm font-bold py-2 px-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
