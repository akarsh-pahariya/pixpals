import { useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';
import useGroups from '../hooks/useGroups';
import UserGroups from '../components/groups/userGroups';

const Dashboard = () => {
  useAuth();
  useGroups();
  const loading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.user.userInfo);
  const groupsList = useSelector((state) => state.group.groupsList);

  if (loading || !user || !groupsList) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Hello, {user.name}</h1>
      <UserGroups />
    </div>
  );
};

export default Dashboard;
