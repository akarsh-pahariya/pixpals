import { useEffect } from 'react';
import { getGroupImages } from '../services/groupService';
import { showErrorToast } from '../components/ui/Toast';

const useGroupDetails = (groupId, pageNumber) => {
  useEffect(() => {
    const getImagesOfGroup = async (page) => {
      try {
        const response = await getGroupImages(groupId, pageNumber);
        console.log(response);
      } catch (error) {
        showErrorToast(error.message);
      }
    };
    getImagesOfGroup();
  }, [groupId, pageNumber]);
};

export default useGroupDetails;
