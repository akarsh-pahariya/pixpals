import GroupItem from './GroupItem';

const GroupList = ({ groups }) => {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
