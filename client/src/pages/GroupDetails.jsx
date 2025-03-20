import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User, Calendar, ArrowLeft, Info, Upload, LogOut } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import useGroupDetails from '../hooks/useGroupDetails';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState('Pixel Enthusiasts');
  const loading = useSelector((state) => state.loading.isLoading);
  useGroupDetails(groupId, 1);

  const sampleImages = [
    {
      id: 1,
      imageUrl: '/api/placeholder/600/400',
      postedBy: 'Alex Johnson',
      postedAt: '2025-03-18T14:30:00Z',
    },
    {
      id: 2,
      imageUrl: '/api/placeholder/600/400',
      postedBy: 'Jamie Smith',
      postedAt: '2025-03-17T09:15:00Z',
    },
    {
      id: 3,
      imageUrl: '/api/placeholder/600/400',
      postedBy: 'Taylor Wright',
      postedAt: '2025-03-15T16:45:00Z',
    },
  ];

  const handleViewGroupInfo = () => {
    console.log('Viewing group info for:', groupName);
  };

  const handlePostImage = () => {
    console.log('Opening post image dialog');
  };

  const handleLeaveGroup = () => {
    console.log('Leaving group:', groupName);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-purple-950 p-4">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>
      <div className="w-full max-w-5xl p-8 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl relative backdrop-blur-sm z-10 bg-opacity-80">
        {/* Header with group name and navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x mb-2">
              {groupName} <span className="inline-block animate-pulse">✨</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              View and share images with your PixPals group 📸
            </p>
          </div>
          <Link
            to="/dashboard"
            className="px-5 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5" /> Back to Dashboard
            </div>
          </Link>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
            onClick={handlePostImage}
          >
            <div className="flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" /> Post Image
            </div>
          </button>
          <button
            className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-500/20 transform hover:scale-105"
            onClick={handleViewGroupInfo}
          >
            <div className="flex items-center justify-center gap-2">
              <Info className="w-5 h-5" /> Group Details
            </div>
          </button>
          <button
            className="w-full sm:w-auto py-3 px-5 font-bold rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105"
            onClick={handleLeaveGroup}
          >
            <div className="flex items-center justify-center gap-2">
              <LogOut className="w-5 h-5" /> Leave Group
            </div>
          </button>
        </div>

        {/* Images grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sampleImages.map((image) => (
            <div
              key={image.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg shadow-purple-500/10 transform transition-all duration-300 hover:scale-102 hover:shadow-purple-500/20"
            >
              <img
                src={image.imageUrl}
                alt={`Posted by ${image.postedBy}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300 text-sm font-medium">
                    {image.postedBy}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-400 text-xs">
                    {formatDate(image.postedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for when there are no images */}
        {sampleImages.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="text-gray-400 mb-4 text-8xl opacity-30">📷</div>
            <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              No Images Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to share an image with the group!
            </p>
            <button
              className="py-2 px-4 font-medium rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              onClick={handlePostImage}
            >
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> Upload First Image
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
