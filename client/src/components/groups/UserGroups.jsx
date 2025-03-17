import { useSelector } from 'react-redux';
import GroupList from './GroupList';

const UserGroups = () => {
  const groups = useSelector((state) => state.group.groupsList);

  return (
    <div className="p-6 bg-gray-900 bg-opacity-80 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md">
      {/* Section Header */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 mb-4">
        My Groups {groups?.length > 0 ? `(${groups.length})` : ''}
      </h2>

      {/* Content */}
      {!groups || groups.length === 0 ? (
        <p className="text-gray-400 text-sm">
          You haven't joined any groups yet.
        </p>
      ) : (
        <GroupList groups={groups} />
      )}
    </div>
  );
};

export default UserGroups;
