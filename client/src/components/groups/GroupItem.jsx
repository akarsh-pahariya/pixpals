import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const GroupItem = ({ group }) => {
  // Generate a gradient based on the group name for unique visual identity
  const getGradient = (name) => {
    const hash = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hue1 + 60) % 360;
    return `from-[hsl(${hue1},70%,60%)] to-[hsl(${hue2},70%,55%)]`;
  };

  return (
    <div className="p-4 border border-gray-800/40 rounded-2xl transition-all duration-300 bg-gray-900/40 backdrop-blur-sm hover:bg-gray-900/60 hover:shadow-lg hover:shadow-purple-900/10 hover:border-gray-700/60 group">
      <div className="flex items-center">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradient(
            group.name
          )} flex items-center justify-center text-white font-bold text-lg shadow-md transform transition-transform group-hover:scale-105`}
        >
          {group.name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4 flex-grow">
          <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 transition-all duration-300">
            {group.name}
          </h3>
          <p className="text-xs text-gray-400 flex items-center mt-1">
            <span className="opacity-70">
              Created: {new Date(group.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <Link
          to={`/group/${group.id}`}
          className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg transform transition-all duration-300 hover:from-purple-500 hover:to-cyan-500 hover:shadow-md hover:shadow-purple-500/20 hover:scale-105 font-medium text-sm"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default GroupItem;
