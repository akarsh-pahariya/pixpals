import { useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { isLoading } = useAuth();
  const user = useSelector((state) => state.user.userInfo);

  if (isLoading) return <Spinner />;

  return <h1>Hello, {user.name}</h1>;
};

export default Dashboard;
