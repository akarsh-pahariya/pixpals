import { Link } from 'react-router-dom';

const GroupItem = ({ group }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
          {group.name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4 flex-grow">
          <h3 className="font-semibold text-gray-800">{group.name}</h3>
          <p className="text-sm text-gray-500">
            Created: {new Date(group.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/groups/${group.id}`}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default GroupItem;
