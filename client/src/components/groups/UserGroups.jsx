import { useSelector } from 'react-redux';
import GroupList from './GroupList';

const UserGroups = () => {
  const groups = useSelector((state) => state.group.groupsList);

  if (!groups || groups.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Groups</h2>
        <p className="text-gray-600">You havent joined any groups yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          My Groups ({groups.length})
        </h2>
      </div>

      <GroupList groups={groups} />
    </div>
  );
};

export default UserGroups;
