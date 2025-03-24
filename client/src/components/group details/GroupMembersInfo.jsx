import { format } from 'date-fns';

const GroupMembersInfo = ({ users }) => {
  return (
    <div className="p-6 border border-gray-800 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
        Group Members
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Joining Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Images Posted
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user, index) => (
              <tr
                key={user.username}
                className={
                  index % 2 === 0
                    ? 'bg-gray-800 bg-opacity-50'
                    : 'bg-gray-900 bg-opacity-50'
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-cyan-400">
                    {user.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {format(new Date(user.joinedAt), 'MMM d, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {user.imagesPosted}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupMembersInfo;
