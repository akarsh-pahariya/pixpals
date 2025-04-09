import { useCallback, useEffect, useState } from 'react';
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

  const fetchData = useCallback(async () => {
    dispatch(setIsLoadingToTrue());
    try {
      const response = await getUserGroupImages(groupId, pageNumber);
      setData(response.data);
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      dispatch(setIsLoadingToFalse());
    }
  }, [groupId, pageNumber, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, refetch: fetchData }; // Return both data and refetch function
};

export default useUserGroupUploads;
