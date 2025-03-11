import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loginUser } from '../services/authService';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { addUserInfo, setAuthChecked } from '../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import { LogIn } from 'lucide-react';

const Login = () => {
  useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingToTrue());

    try {
      const userData = await loginUser(username, password);
      dispatch(addUserInfo(userData.data.user));
      dispatch(setAuthChecked(true));
      showSuccessToast('Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="max-w-md w-full p-8 bg-gray-950 bg-opacity-90 shadow-xl rounded-2xl backdrop-blur-md border border-gray-800">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Welcome to PixPals</h2>
          <p className="text-gray-400 text-sm">Log in to continue</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <LogIn className="w-5 h-5" /> Login
          </button>
        </form>
        <div className="text-center text-sm text-gray-400 mt-4">
          Dont have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 transition-all"
          >
            Register
          </Link>
        </div>
        <ToastContainer />
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Login;
