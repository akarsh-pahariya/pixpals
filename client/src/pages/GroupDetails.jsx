import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGroupDetails from '../hooks/useGroupDetails';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import useIsAdmin from '../hooks/useIsAdmin';
import useAuth from '../hooks/useAuth';
import useGroups from '../hooks/useGroups';
import { sendInvitation } from '../services/groupService';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import InviteModal from '../components/group details/InviteModal';
import GroupMembersInfo from '../components/group details/GroupMembersInfo';
import AdminInfo from '../components/group details/AdminInfo';
import GroupInfo from '../components/group details/GroupInfo';
import GroupHeader from '../components/group details/GroupHeader';

const GroupDetailsPage = () => {
  useAuth();
  useGroups();
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const loading = useSelector((state) => state.loading.isLoading);
  const group = useSelector((state) => state.group);
  const [inviteUsername, setInviteUsername] = useState('');
  const [inviteUsersList, setInviteUsersList] = useState([]);
  const [groupData, setGroupData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const api_response = useGroupDetails(groupId);
  const currentGroup = group.groupsList
    ? group.groupsList.find(
        (group) => group.id === groupId || group.id === parseInt(groupId, 10)
      )
    : null;
  const isAdmin = useIsAdmin(currentGroup);

  useEffect(() => {
    if (api_response) {
      setGroupData(api_response.data.groupInfo);
      setAdminData(api_response.data.admin);
      setUsersData(api_response.data.groupMembers);
    }
  }, [api_response]);

  const handleSendInvite = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingToTrue());
    try {
      await sendInvitation(groupId, inviteUsersList);
      showSuccessToast('Invitations have been sent to all the valid usernames');
    } catch (error) {
      showErrorToast(error.message);
    }
    setInviteUsername('');
    setInviteUsersList([]);
    setIsInviteModalOpen(false);
    dispatch(setIsLoadingToFalse());
  };

  const handleBackdropClick = () => {
    setIsInviteModalOpen(false);
  };

  const handleAddUser = () => {
    if (
      inviteUsername.trim() !== '' &&
      !inviteUsersList.includes(inviteUsername.trim())
    ) {
      setInviteUsersList([...inviteUsersList, inviteUsername.trim()]);
      setInviteUsername('');
    }
  };

  const handleRemoveUser = (username) => {
    setInviteUsersList(inviteUsersList.filter((user) => user !== username));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddUser();
    }
  };

  if (loading || !groupData || !adminData || !usersData) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] p-4">
      <div className="w-full max-w-5xl p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <GroupHeader groupName={groupData.groupName} />
        <GroupInfo groupData={groupData} />
        <AdminInfo
          adminData={adminData}
          isAdmin={isAdmin}
          onInviteClick={() => setIsInviteModalOpen(true)}
        />
        <GroupMembersInfo users={usersData} />
      </div>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={handleBackdropClick}
        onSubmit={handleSendInvite}
        inviteUsername={inviteUsername}
        setInviteUsername={setInviteUsername}
        inviteUsersList={inviteUsersList}
        onAddUser={handleAddUser}
        onRemoveUser={handleRemoveUser}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default GroupDetailsPage;
