import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../services/authService';
import { addUserInfo } from '../store/slices/userSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      if (!user) {
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
        }
      }
      setIsLoading(false);
    };

    checkUserAuthentication();
  }, [dispatch, navigate, user, location]);

  return { user, isLoading };
};

export default useAuth;
