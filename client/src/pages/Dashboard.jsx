import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import { authenticateUser } from '../services/authService';
import { addUserInfo } from '../store/slices/userSlice';
import { showErrorToast } from '../components/ui/Toast';

const Dashboard = () => {
  const userData = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData.isLoggedIn) {
          const user = await authenticateUser();
          dispatch(addUserInfo(user));
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
        showErrorToast(error.message);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return <div>{isLoading && <Spinner />}</div>;
};

export default Dashboard;
