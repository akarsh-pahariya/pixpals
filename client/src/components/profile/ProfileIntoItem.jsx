// src/components/profile/ProfileInfoItem.jsx
const ProfileInfoItem = ({ icon, label, children, isEditing, value }) => {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
      <div className="flex items-center mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-400">{label}</span>
      </div>
      {children}
    </div>
  );
};

export default ProfileInfoItem;
