import { useEffect, useState } from 'react';
import { User, Mail, Plus, ArrowLeft, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
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
      showSuccessToast('Invitations has been sent to all the valid usernames');
    } catch (error) {
      showErrorToast(error.message);
    }
    setInviteUsername('');
    setInviteUsersList([]);
    setIsInviteModalOpen(false);
    dispatch(setIsLoadingToFalse());
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      setIsInviteModalOpen(false);
    }
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
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-purple-950 p-4">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div className="w-full max-w-5xl p-8 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl relative backdrop-blur-sm z-10 bg-opacity-80">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x mb-2">
              {groupData.groupName}{' '}
              <span className="inline-block animate-pulse">✨</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Group details and member information 📸
            </p>
          </div>
          <Link
            to="/dashboard"
            className="px-5 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5" /> Back to Dashboard
            </div>
          </Link>
        </div>

        {/* Group Information Section */}
        <div className="mb-8 p-6 border border-gray-800 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Group Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-gray-400 text-sm">Members</p>
              <p className="font-bold text-lg text-white">
                {groupData.membersCount}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-gray-400 text-sm">Images Posted</p>
              <p className="font-bold text-lg text-white">
                {groupData.imagesPosted}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-gray-400 text-sm">Invitations</p>
              <p className="font-bold text-lg text-white">
                {groupData.invitations} pending
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-6 border border-gray-800 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Admin Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-gray-400 text-sm">Username</p>
              <p className="font-bold text-lg text-white">
                {adminData.username}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-gray-400 text-sm">Name</p>
              <p className="font-bold text-lg text-white">{adminData.name}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-gray-400 text-sm">Group Creation Date</p>
              <p className="font-bold text-lg text-white">
                {format(new Date(adminData.groupCreatedAt), 'MMM d, yyyy')}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-gray-400 text-sm">Admin joining Date</p>
              <p className="font-bold text-lg text-white">
                {format(new Date(adminData.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          {/* Admin Action Button */}
          {isAdmin && (
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" /> Send Invitation
              </div>
            </button>
          )}
        </div>

        {/* Users List Section */}
        <div className="p-6 border border-gray-800 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
            Group Members
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Images Posted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {usersData.map((user, index) => (
                  <tr
                    key={user.username}
                    className={
                      index % 2 === 0
                        ? 'bg-gray-800 bg-opacity-50'
                        : 'bg-gray-900 bg-opacity-50'
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-cyan-400">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {format(new Date(user.joinedAt), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {user.imagesPosted}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div
          id="modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

          <div
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-white backdrop-blur-sm bg-opacity-80 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
                Send Invitation{' '}
                <span className="inline-block animate-pulse">✨</span>
              </h2>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInvite}>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Invite Users
                </label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={inviteUsername}
                      onChange={(e) => setInviteUsername(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white border-0 rounded-l-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all shadow-lg placeholder-gray-500"
                      placeholder="Enter username"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddUser}
                    className="px-4 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600 transition-all shadow-lg flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {inviteUsersList.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {inviteUsersList.map((username, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-800 px-3 py-1 rounded-full border border-gray-700"
                      >
                        <span className="text-sm text-gray-200">
                          {username}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(username)}
                          className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviteUsersList.length === 0}
                  className="px-5 py-3 font-bold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                >
                  Send Invites
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetailsPage;
