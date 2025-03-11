import { useSelector } from 'react-redux';
import GroupList from './GroupList';

const UserGroups = () => {
  const groups = useSelector((state) => state.group.groupsList);

  if (!groups || groups.length === 0) {
    return (
      <div className="p-6 bg-gray-950 bg-opacity-90 rounded-2xl shadow-xl border border-gray-800 backdrop-blur-md">
        <h2 className="text-xl font-semibold text-white mb-4">My Groups</h2>
        <p className="text-gray-400">You havent joined any groups yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-950 bg-opacity-90 rounded-2xl shadow-xl border border-gray-800 backdrop-blur-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          My Groups ({groups.length})
        </h2>
      </div>
      <GroupList groups={groups} />
    </div>
  );
};

export default UserGroups;
