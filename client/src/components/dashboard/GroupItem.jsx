import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const GroupItem = ({ group }) => {
  return (
    <div className="p-4 border border-[#2A2A2A] rounded-lg bg-[#181818] hover:bg-[#121212] transition-all duration-200 shadow-md hover:shadow-lg">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-[#4C1D95] flex items-center justify-center text-white font-bold text-lg shadow-md">
          {group.name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4 flex-grow">
          <h3 className="font-semibold text-white">{group.name}</h3>
          <p className="text-xs text-gray-400 mt-1">
            Created: {new Date(group.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/group/${group.id}`}
          className="ml-4 px-4 py-2 bg-[#4C1D95] text-white rounded-lg hover:bg-[#5B21B6] transition-all duration-200 shadow-lg"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default GroupItem;
