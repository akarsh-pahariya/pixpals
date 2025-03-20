import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
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
      showSuccessToast('Registration Successful !!');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-purple-950 p-4">
      {/* Netflix-inspired blurred gradient background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div className="max-w-md w-full p-8 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl relative backdrop-blur-sm z-10 bg-opacity-80">
        {/* Logo with sparkle emoji */}
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x mb-2">
            PixPals{' '}
            <span className="inline-block animate-pulse text-amber-50">✨</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Join the squad today 🙌
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-0 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <AtSign className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-0 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-0 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-12 py-3 bg-gray-800 text-white border-0 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
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

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-10 pr-12 py-3 bg-gray-800 text-white border-0 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
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

          <button
            type="submit"
            className="w-full py-4 mt-2 font-bold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" /> Create Account
            </div>
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-6">
          <p className="text-gray-400 text-sm">Already have an account?</p>
          <Link
            to="/login"
            className="text-sm font-bold py-2 px-4 rounded-full bg-gray-800 hover:bg-gray-700 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 transition-all border border-gray-700 hover:border-gray-600"
          >
            Login 🚀
          </Link>
        </div>

        <ToastContainer />
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Register;
