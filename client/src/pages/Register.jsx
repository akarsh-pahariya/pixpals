import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import Spinner from '../components/ui/Spinner';
import { addUserInfo, setAuthChecked } from '../store/slices/userSlice';
import { registerUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
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
      const userData = await registerUser({ name, username, email, password });
      dispatch(addUserInfo(userData.data.user));
      dispatch(setAuthChecked(true));
      showSuccessToast('Registration Successful !!');
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
          <h2 className="text-3xl font-bold text-white">Join PixPals</h2>
          <p className="text-gray-400 text-sm">
            Create an account to get started
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Name
            </label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <UserPlus className="w-5 h-5" /> Register
          </button>
        </form>
        <div className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 transition-all"
          >
            Login
          </Link>
        </div>
        <ToastContainer />
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Register;
