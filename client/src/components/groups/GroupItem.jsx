import { Link } from 'react-router-dom';

const GroupItem = ({ group }) => {
  return (
    <div className="p-4 border border-gray-800 rounded-2xl hover:shadow-xl transition-shadow bg-gray-950 bg-opacity-90 backdrop-blur-md">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
          {group.name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4 flex-grow">
          <h3 className="font-semibold text-white">{group.name}</h3>
          <p className="text-sm text-gray-400">
            Created: {new Date(group.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/group/${group.id}`}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default GroupItem;
