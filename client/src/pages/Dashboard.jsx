import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';
import useGroups from '../hooks/useGroups';
import UserGroups from '../components/groups/userGroups';
import CreateGroupModal from '../components/groups/CreateGroupModal';
import { createGroup } from '../services/groupService';
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from '../components/ui/Toast';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import PendingInvitationsModal from '../components/invitations/PendingInvitationsModal';
import useInvitations from '../hooks/useInvitations';
import {
  acceptInvitation,
  declineInvitation,
} from '../services/invitationService';

const Dashboard = () => {
  useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInvitationsModalOpen, setIsInvitationsModalOpen] = useState(false);
  const [refreshGroups, setRefreshGroups] = useState(0);
  const { invitations, loadInvitations } = useInvitations();
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
      setIsCreateModalOpen(false);
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  const handleAcceptInvitation = async (id) => {
    dispatch(setIsLoadingToTrue());
    try {
      const invitation = invitations.find((invite) => invite.id === id);
      const groupId = invitation?.group?.id;

      if (!groupId) {
        throw new Error('Group ID not found');
      }

      const result = await acceptInvitation(groupId);
      showSuccessToast(result.message);
      loadInvitations();
      setRefreshGroups((prev) => prev + 1);
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  const handleRejectInvitation = async (id) => {
    dispatch(setIsLoadingToTrue());
    try {
      const invitation = invitations.find((invite) => invite.id === id);
      const groupId = invitation?.group?.id;

      if (!groupId) {
        throw new Error('Group ID not found');
      }

      const result = await declineInvitation(groupId);
      showDefaultToast(result.message);
      loadInvitations();
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  const handleOpenInvitationsModal = async () => {
    loadInvitations();
    setIsInvitationsModalOpen(true);
  };

  if (loading || !user || !groupsList) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="max-w-4xl w-full p-8 bg-gray-950 bg-opacity-90 shadow-xl rounded-2xl backdrop-blur-md border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Hello, {user.name}</h1>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Group
            </button>
            <button
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-all"
              onClick={handleOpenInvitationsModal}
            >
              View Invitations
            </button>
          </div>
        </div>
        <UserGroups />
      </div>

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateGroup}
      />

      <PendingInvitationsModal
        isOpen={isInvitationsModalOpen}
        onClose={() => setIsInvitationsModalOpen(false)}
        invitations={invitations}
        onAccept={handleAcceptInvitation}
        onReject={handleRejectInvitation}
      />
    </div>
  );
};

export default Dashboard;
