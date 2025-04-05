import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../services/authService';
import { addUserInfo } from '../store/slices/userSlice';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import { showErrorToast } from '../components/ui/Toast';

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      dispatch(setIsLoadingToTrue());
      try {
        const response = await authenticateUser();
        if (response?.data?.user) {
          dispatch(addUserInfo(response.data.user));

          if (location.pathname === '/login') {
            navigate('/dashboard');
          }
        }
      } catch (error) {
        if (location.pathname !== '/login') {
          navigate('/login');
          showErrorToast(
            `Please login to get access to the ${location.pathname} route`
          );
        }
      }
      dispatch(setIsLoadingToFalse());
    };

    if (!isLoggedIn) checkUserAuthentication();
  }, [dispatch, navigate, location]);
};

export default useAuth;
