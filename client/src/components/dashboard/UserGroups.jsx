import { useSelector } from 'react-redux';
import GroupItem from './GroupItem';

const UserGroups = () => {
  const groups = useSelector((state) => state.group.groupsList);

  return (
    <div className="p-6 bg-[#181818] rounded-xl shadow-lg border border-[#2A2A2A]">
      {/* Section Header */}
      <h2 className="text-2xl font-bold text-white mb-4">
        My Groups {groups?.length > 0 ? `(${groups.length})` : ''}
      </h2>

      {/* Content */}
      {!groups || groups.length === 0 ? (
        <p className="text-gray-400 text-sm">
          You haven't joined any groups yet.
        </p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <GroupItem key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGroups;
