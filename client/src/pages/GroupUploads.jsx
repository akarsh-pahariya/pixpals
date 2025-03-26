import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] p-4">
      <div className="w-full max-w-5xl p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-xl font-bold text-white">
              {currentGroup.name}
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              View and share images with your group
            </p>
          </div>
          <Link
            to="/dashboard"
            className="px-5 py-3 rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200"
          >
            Back to Dashboard
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
