import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';
import useGroups from '../hooks/useGroups';
import UserGroups from '../components/groups/userGroups';
import CreateGroupModal from '../components/groups/CreateGroupModal';
import { createGroup } from '../services/groupService';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const Dashboard = () => {
  useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshGroups, setRefreshGroups] = useState(0);
  const loading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.user.userInfo);
  const groupsList = useSelector((state) => state.group.groupsList);
  const dispatch = useDispatch();
  useGroups(refreshGroups);

  const handleCreateGroup = async (groupData) => {
    dispatch(setIsLoadingToTrue());
    try {
      await createGroup(groupData);
      showSuccessToast('Group has been created successfully !!');
      setRefreshGroups((prev) => prev + 1);
      setIsModalOpen(false);
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  if (loading || !user || !groupsList) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="max-w-4xl w-full p-8 bg-gray-950 bg-opacity-90 shadow-xl rounded-2xl backdrop-blur-md border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Hello, {user.name}</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            Create Group
          </button>
        </div>
        <UserGroups />
      </div>

      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
};

export default Dashboard;
