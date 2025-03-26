import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User, Plus, Mail } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';
import useGroups from '../hooks/useGroups';
import UserGroups from '../components/dashboard/UserGroups';
import CreateGroupModal from '../components/dashboard/CreateGroupModal';
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
import PendingInvitationsModal from '../components/dashboard/PendingInvitationsModal';
import useInvitations from '../hooks/useInvitations';
import {
  acceptInvitation,
  declineInvitation,
} from '../services/invitationService';
import { setRefreshGroupsToTrue } from '../store/slices/groupSlice';

const Dashboard = () => {
  useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInvitationsModalOpen, setIsInvitationsModalOpen] = useState(false);
  const { invitations, loadInvitations } = useInvitations();
  const loading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useGroups();

  const handleCreateGroup = async (groupData) => {
    dispatch(setIsLoadingToTrue());
    try {
      await createGroup(groupData);
      showSuccessToast('Group has been created successfully!');
      dispatch(setRefreshGroupsToTrue());
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
      if (!groupId) throw new Error('Group ID not found');
      const result = await acceptInvitation(groupId);
      showSuccessToast(result.message);
      loadInvitations();
      dispatch(setRefreshGroupsToTrue());
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
      if (!groupId) throw new Error('Group ID not found');
      const result = await declineInvitation(groupId);
      showDefaultToast(result.message);
      loadInvitations();
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  const handleOpenInvitationsModal = async () => {
    await loadInvitations();
    setIsInvitationsModalOpen(true);
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] p-4">
      <div className="w-full max-w-5xl p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Manage your groups and invitations here.
            </p>
          </div>
          <Link
            to="/user"
            className="px-5 py-3 rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200 shadow-lg shadow-[#4C1D95]/30"
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-5 h-5" /> View Profile
            </div>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200 shadow-lg shadow-[#4C1D95]/30"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Create Group
            </div>
          </button>
          <button
            className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-all duration-200 shadow-lg shadow-[#2A2A2A]/30"
            onClick={handleOpenInvitationsModal}
          >
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> View Invitations
            </div>
          </button>
        </div>

        <UserGroups />
      </div>

      {isCreateModalOpen && (
        <CreateGroupModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateGroup}
        />
      )}

      {isInvitationsModalOpen && (
        <PendingInvitationsModal
          isOpen={isInvitationsModalOpen}
          onClose={() => setIsInvitationsModalOpen(false)}
          invitations={invitations}
          onAccept={handleAcceptInvitation}
          onReject={handleRejectInvitation}
        />
      )}
    </div>
  );
};

export default Dashboard;
