import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useIsAdmin = (currentGroup) => {
  const userDetails = useSelector((state) => state.user.userInfo);

  const isAdmin = useMemo(() => {
    if (!userDetails || !currentGroup) return false;
    return userDetails.id === currentGroup.admin;
  }, [userDetails, currentGroup]);

  return isAdmin;
};

export default useIsAdmin;
