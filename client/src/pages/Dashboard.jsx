import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';
import useGroups from '../hooks/useGroups';
import UserGroups from '../components/groups/UserGroups';
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
import { Link } from 'react-router-dom';
import { User, Plus, Mail } from 'lucide-react';

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
      showSuccessToast('Group has been created successfully!');
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
      if (!groupId) throw new Error('Group ID not found');
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

  if (loading || !user || !groupsList) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-purple-950 p-4">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div className="w-full max-w-5xl p-8 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl relative backdrop-blur-sm z-10 bg-opacity-80">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x mb-2">
              Welcome, {user.name}!{' '}
              <span className="inline-block animate-pulse">✨</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Manage your PixPals groups and invitations here 💯
            </p>
          </div>
          <Link
            to="/user"
            className="px-5 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-5 h-5" /> View Profile
            </div>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Create Group
            </div>
          </button>
          <button
            className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-500/20 transform hover:scale-105"
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
