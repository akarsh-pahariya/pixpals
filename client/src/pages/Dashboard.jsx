import { useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';
import useGroups from '../hooks/useGroups';

const Dashboard = () => {
  useAuth();
  useGroups();
  const loading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.user.userInfo);

  if (loading || !user) return <Spinner />;

  return <h1>Hello, {user.name}</h1>;
};

export default Dashboard;
