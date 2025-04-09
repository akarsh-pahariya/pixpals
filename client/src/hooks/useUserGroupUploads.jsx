import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserGroupImages } from '../services/groupService';
import { showErrorToast } from '../components/ui/Toast';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const useUserGroupUploads = (groupId, pageNumber) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoadingToTrue());
    const getUserImagesOfGroup = async () => {
      try {
        const response = await getUserGroupImages(groupId, pageNumber);
        setData(response.data);
      } catch (error) {
        showErrorToast(error.message);
      }
    };

    getUserImagesOfGroup();
    dispatch(setIsLoadingToFalse());
  }, [groupId, pageNumber, dispatch]);

  return data;
};

export default useUserGroupUploads;
