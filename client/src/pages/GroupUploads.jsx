// Main page component
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import useGroupUploads from '../hooks/useGroupUploads';
import useGroups from '../hooks/useGroups';
import useAuth from '../hooks/useAuth';
import ActionButtons from '../components/group uploads/ActionButtons';
import ImageGrid from '../components/group uploads/Imagegrid';
import EmptyState from '../components/group uploads/EmptyState';
import PaginationControls from '../components/group uploads/PaginationControls';
import ImageViewer from '../components/group uploads/ImageViewer';
import LeaveGroupModal from '../components/group uploads/LeaveGroupModal';
import LeaveOrDeleteGroupButton from '../components/group uploads/LeaveOrDeleteGroupButton';
import DeleteGroupModal from '../components/group uploads/DeleteGroupModal';
import useIsAdmin from '../hooks/useIsAdmin';
import { deleteGroup, leaveGroup } from '../services/groupService';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import { setRefreshGroupsToTrue } from '../store/slices/groupSlice';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const GroupUploads = () => {
  useAuth();
  useGroups();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groupDetails = useSelector((state) => state.group);
  const [pageNumber, setPageNumber] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const loading = useSelector((state) => state.loading.isLoading);
  const api_response = useGroupUploads(groupId, pageNumber);
  const currentGroup = groupDetails.groupsList
    ? groupDetails.groupsList.find(
        (group) => group.id === groupId || group.id === parseInt(groupId, 10)
      )
    : null;
  const isAdmin = useIsAdmin(currentGroup);

  useEffect(() => {
    if (api_response) {
      setPageNumber(api_response.page);
      setTotalPages(api_response.totalPages);
      setImageData(api_response.images);
    }
  }, [api_response]);

  const handleViewGroupDetails = () => {
    navigate(`/group/${groupId}/details`);
  };

  const handlePostImage = () => {
    const currentPath = location.pathname;
    navigate(`${currentPath}/upload`);
  };

  const handleLeaveGroup = () => {
    setShowLeaveModal(true);
  };

  const handleDeleteGroup = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteGroup = async () => {
    dispatch(setIsLoadingToTrue());
    try {
      const response = await deleteGroup(groupId);
      showSuccessToast(response.message);
      dispatch(setRefreshGroupsToTrue());
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      dispatch(setIsLoadingToFalse());
    }
    setShowLeaveModal(false);
    navigate('/dashboard');
  };

  const confirmLeaveGroup = async () => {
    dispatch(setIsLoadingToTrue());
    try {
      const response = await leaveGroup(groupId);
      showSuccessToast(response.message);
      dispatch(setRefreshGroupsToTrue());
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      dispatch(setIsLoadingToFalse());
    }
    setShowLeaveModal(false);
    navigate('/dashboard');
  };

  const closeLeaveModal = () => {
    setShowLeaveModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction) => {
    if (imageData) {
      const newIndex = selectedImageIndex + direction;
      if (newIndex >= 0 && newIndex < imageData.length) {
        setSelectedImageIndex(newIndex);
      }
    }
  };

  if (loading || !currentGroup || !imageData) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-purple-950 p-4">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>
      <div className="w-full max-w-5xl p-8 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl relative backdrop-blur-sm z-10 bg-opacity-80">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x mb-2">
              {currentGroup.name}{' '}
              <span className="inline-block animate-pulse">✨</span>
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

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <ActionButtons
            handlePostImage={handlePostImage}
            handleViewGroupDetails={handleViewGroupDetails}
          />
          <LeaveOrDeleteGroupButton
            isAdmin={isAdmin}
            handleAction={isAdmin ? handleDeleteGroup : handleLeaveGroup}
          />
        </div>

        {imageData.length > 0 ? (
          <ImageGrid imageData={imageData} openImageViewer={openImageViewer} />
        ) : (
          <EmptyState handlePostImage={handlePostImage} />
        )}

        <PaginationControls
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />

        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-[100]">
            <ImageViewer
              images={imageData}
              currentIndex={selectedImageIndex}
              onClose={closeImageViewer}
              onNavigate={navigateImage}
            />
          </div>
        )}

        {showLeaveModal && (
          <LeaveGroupModal
            groupName={currentGroup.name}
            onConfirm={confirmLeaveGroup}
            onCancel={closeLeaveModal}
          />
        )}

        {showDeleteModal && (
          <DeleteGroupModal
            groupName={currentGroup.name}
            onConfirm={confirmDeleteGroup}
            onCancel={closeDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default GroupUploads;
