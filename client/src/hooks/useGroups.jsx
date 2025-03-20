import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import { fetchGroupsList } from '../services/groupService';
import { addGroupList } from '../store/slices/groupSlice';
import { showErrorToast } from '../components/ui/Toast';

const useGroups = (refreshTrigger = 0) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const getGroupsList = async () => {
        try {
          const response = await fetchGroupsList();
          dispatch(addGroupList(response.data.groups));
        } catch (error) {
          console.log('Unable to fetch the groups user has joined ', error);
          showErrorToast(
            'Unexpected error occurred, cannot fetch the groups user has joined, try reloading the page'
          );
        }
      };

      getGroupsList();
    }
  }, [dispatch, isLoggedIn, refreshTrigger]);
};

export default useGroups;
