import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import { getGroupDetails } from '../services/groupService';
import { showErrorToast } from '../components/ui/Toast';

const useGroupDetails = (groupId) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(setIsLoadingToTrue());
    const fetchGroupDetails = async () => {
      try {
        const response = await getGroupDetails(groupId);
        setData(response);
      } catch (error) {
        showErrorToast(error.message);
      }
    };

    fetchGroupDetails();
    dispatch(setIsLoadingToFalse());
  }, [dispatch, groupId]);

  return data;
};

export default useGroupDetails;
