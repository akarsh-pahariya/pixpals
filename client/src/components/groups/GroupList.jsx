import GroupItem from './GroupItem';

const GroupList = ({ groups }) => {
  return (
    <div className="space-y-4 p-6 bg-gray-950 bg-opacity-90 rounded-2xl shadow-xl border border-gray-800 backdrop-blur-md">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
