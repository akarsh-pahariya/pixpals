import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGroupImages } from '../services/groupService';
import { showErrorToast } from '../components/ui/Toast';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';

const useGroupUploads = (groupId, pageNumber) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoadingToTrue());
    const getImagesOfGroup = async () => {
      try {
        const response = await getGroupImages(groupId, pageNumber);
        setData(response.data);
      } catch (error) {
        showErrorToast(error.message);
        navigate('/dashboard');
      }
    };

    getImagesOfGroup();
    dispatch(setIsLoadingToFalse());
  }, [groupId, pageNumber, dispatch, navigate]);

  return data;
};

export default useGroupUploads;
