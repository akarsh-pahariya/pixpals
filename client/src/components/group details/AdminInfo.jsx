import { Mail } from 'lucide-react';
import { format } from 'date-fns';

const AdminInfo = ({ adminData, isAdmin, onInviteClick }) => {
  return (
    <div className="mb-8 p-6 border border-gray-800 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Admin Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InfoCard label="Username" value={adminData.username} />
        <InfoCard label="Name" value={adminData.name} />
        <InfoCard
          label="Group Creation Date"
          value={format(new Date(adminData.groupCreatedAt), 'MMM d, yyyy')}
        />
        <InfoCard
          label="Admin joining Date"
          value={format(new Date(adminData.createdAt), 'MMM d, yyyy')}
        />
      </div>

      {isAdmin && (
        <button
          onClick={onInviteClick}
          className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
        >
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" /> Send Invitation
          </div>
        </button>
      )}
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="font-bold text-lg text-white">{value}</p>
  </div>
);

export default AdminInfo;
