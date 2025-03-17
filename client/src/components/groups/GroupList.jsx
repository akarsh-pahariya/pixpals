import GroupItem from './GroupItem';

const GroupList = ({ groups }) => {
  return (
    <div className="p-4 sm:p-6 bg-gray-950 bg-opacity-70 rounded-lg shadow-md border border-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-gray-700/70">
      {/* Group Counter */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-gray-400 font-medium">
          Showing {groups.length} group{groups.length !== 1 ? 's' : ''}
        </p>
        <div className="h-1 w-16 bg-gradient-to-r from-pink-500/40 to-cyan-500/40 rounded-full"></div>
      </div>

      {/* Group Items */}
      <div className="space-y-4">
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
