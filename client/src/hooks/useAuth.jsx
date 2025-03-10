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
  const user = useSelector((state) => state.user.userInfo);

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
        console.log('User not authenticated', error);
        if (location.pathname !== '/login') {
          navigate('/login');
          showErrorToast(`Login to access the ${location.pathname} route`);
        }
      }
      dispatch(setIsLoadingToFalse());
    };

    if (!user) checkUserAuthentication();
  }, [dispatch, navigate, user, location]);
};

export default useAuth;
