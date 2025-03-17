// src/components/profile/ProfileTimestamps.jsx
import { Calendar } from 'lucide-react';

const ProfileTimestamps = ({ createdAt, updatedAt }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full space-y-2">
      <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center mb-1">
          <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
          <span className="text-xs font-medium text-gray-400">
            Member Since
          </span>
        </div>
        <p className="text-sm text-gray-300">{formatDate(createdAt)}</p>
      </div>

      <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center mb-1">
          <Calendar className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-xs font-medium text-gray-400">
            Last Updated
          </span>
        </div>
        <p className="text-sm text-gray-300">{formatDate(updatedAt)}</p>
      </div>
    </div>
  );
};

export default ProfileTimestamps;
