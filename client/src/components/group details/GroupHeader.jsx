import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const GroupHeader = ({ groupName }) => {
  const { groupId } = useParams();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <div className="mb-4 sm:mb-0 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x mb-2">
          {groupName} <span className="inline-block animate-pulse">✨</span>
        </h1>
        <p className="text-gray-400 text-sm mt-2 font-medium">
          Group details and member information 📸
        </p>
      </div>
      <Link
        to={`/group/${groupId}`}
        className="px-5 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
      >
        <div className="flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Group Uploads
        </div>
      </Link>
    </div>
  );
};

export default GroupHeader;
