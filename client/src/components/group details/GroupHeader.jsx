import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const GroupHeader = ({ groupName }) => {
  const { groupId } = useParams();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <div className="mb-4 sm:mb-0 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-white">{groupName}</h1>
        <p className="text-gray-400 text-sm mt-2">
          Group details and member information
        </p>
      </div>
      <Link
        to={`/group/${groupId}`}
        className="px-5 py-3 rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200 shadow-lg shadow-[#4C1D95]/30"
      >
        <div className="flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Group Uploads
        </div>
      </Link>
    </div>
  );
};

export default GroupHeader;
