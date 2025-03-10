import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loginUser } from '../services/authService';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { addUserInfo } from '../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const Login = () => {
  useAuth();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const loading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingToTrue());

    try {
      const userData = await loginUser(username, password);
      dispatch(addUserInfo(userData.data.user));
      showSuccessToast('Login Successful !!');
      navigate('/dashboard');
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-gray-900 rounded-lg shadow-xl">
        <div>
          <h2 className="text-center text-2xl font-bold text-white">
            Welcome Back
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              className="appearance-none block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              className="appearance-none block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-400">
          Dont have an account?{' '}
          <Link to="/register" className="text-red-500 hover:text-red-400">
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
