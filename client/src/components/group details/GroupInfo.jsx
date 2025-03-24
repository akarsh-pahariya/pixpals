const GroupInfo = ({ groupData }) => {
  return (
    <div className="mb-8 p-6 border border-gray-800 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Group Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Members" value={groupData.membersCount} />
        <StatCard label="Images Posted" value={groupData.imagesPosted} />
        <StatCard
          label="Invitations"
          value={`${groupData.invitations} pending`}
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="font-bold text-lg text-white">{value}</p>
  </div>
);

export default GroupInfo;
