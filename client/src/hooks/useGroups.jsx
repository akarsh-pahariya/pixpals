import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import { fetchGroupsList } from '../services/groupService';

const useGroups = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getGroupsList = async () => {
      dispatch(setIsLoadingToTrue());

      try {
        const response = await fetchGroupsList();
        console.log(response);
      } catch (error) {}
      dispatch(setIsLoadingToFalse());
    };

    getGroupsList();
  }, [dispatch]);
};

export default useGroups;
