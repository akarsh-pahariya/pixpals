import { Link } from 'react-router-dom';

const NoImagesFound = ({ groupId }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl mb-4">🖼️</div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        No Images Found
      </h2>
      <p className="text-gray-400 text-center mb-6">
        There are no images uploaded to this group yet.
      </p>
      <div className="flex gap-4">
        <Link
          to={`/group/${groupId}`}
          className="px-5 py-3 rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200"
        >
          Back to Group
        </Link>
        <Link
          to={`/group/${groupId}/upload`}
          className="px-5 py-3 rounded-lg text-white bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-all duration-200"
        >
          Upload Images
        </Link>
      </div>
    </div>
  );
};

export default NoImagesFound;
