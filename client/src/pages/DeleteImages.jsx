import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGroups from '../hooks/useGroups';
import useAuth from '../hooks/useAuth';
import useUserGroupUploads from '../hooks/useUserGroupUploads';
import Spinner from '../components/ui/Spinner';
import SelectableImageGrid from '../components/delete images/SelectableImageGrid';
import DeleteActionButtons from '../components/delete images/DeleteActionButtons';
import PaginationControls from '../components/group uploads/PaginationControls';

const DeleteImages = () => {
  useAuth();
  useGroups();
  const { groupId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [selectedImages, setSelectedImages] = useState(new Set());

  const api_response = useUserGroupUploads(groupId, pageNumber);

  useEffect(() => {
    if (api_response) {
      setPageNumber(api_response.page);
      setTotalPages(api_response.totalPages);
      setImageData(api_response.images);
      setSelectedImages(new Set());
    }
  }, [api_response]);

  const handleSelectAll = () => {
    if (!imageData) return;
    if (selectedImages.size === imageData.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(imageData.map((img) => img._id)));
    }
  };

  const toggleImageSelection = (imageId) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId);
    } else {
      newSelection.add(imageId);
    }
    setSelectedImages(newSelection);
  };

  const handleDelete = () => {
    // This will be replaced with actual API call
    console.log('Deleting images:', Array.from(selectedImages));
  };

  if (!imageData) return <Spinner />;

  return (
    <div className="py-15 flex items-center justify-center bg-[#0C0C0C] p-4">
      <div className="w-full max-w-5xl p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-xl font-bold text-white">Delete Images</h1>
            <p className="text-gray-400 text-sm mt-2">
              Select images you want to delete
            </p>
          </div>
          <Link
            to={`/group/${groupId}`}
            className="px-5 py-3 rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200"
          >
            Back to Group
          </Link>
        </div>

        <DeleteActionButtons
          selectedCount={selectedImages.size}
          totalCount={imageData.length}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
        />

        <SelectableImageGrid
          imageData={imageData}
          selectedImages={selectedImages}
          onToggleSelect={toggleImageSelection}
        />

        <PaginationControls
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
};

export default DeleteImages;
