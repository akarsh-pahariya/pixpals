import { useDispatch } from 'react-redux';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import { fetchInvitations } from '../services/invitationService';
import { showErrorToast } from '../components/ui/Toast';
import { useState } from 'react';

const useInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const dispatch = useDispatch();

  const loadInvitations = async () => {
    dispatch(setIsLoadingToTrue());
    try {
      const res = await fetchInvitations();
      setInvitations(res.data.invitations);
    } catch (error) {
      showErrorToast(error.message);
    }
    dispatch(setIsLoadingToFalse());
  };

  return { invitations, loadInvitations };
};

export default useInvitations;
