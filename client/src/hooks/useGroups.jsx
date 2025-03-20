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
  const groupsList = useSelector((store) => store.group.groupsList);

  useEffect(() => {
    if (isLoggedIn) {
      if (groupsList !== null && refreshTrigger === 0) {
        return;
      }

      const getGroupsList = async () => {
        dispatch(setIsLoadingToTrue());

        try {
          const response = await fetchGroupsList();
          dispatch(addGroupList(response.data.groups));
        } catch (error) {
          console.log('Unable to fetch the groups user has joined ', error);
          showErrorToast(
            'Unexpected error occurred, cannot fetch the groups user has joined, try reloading the page'
          );
        }
        dispatch(setIsLoadingToFalse());
      };

      getGroupsList();
    }
  }, [dispatch, isLoggedIn, refreshTrigger, groupsList]);
};

export default useGroups;
