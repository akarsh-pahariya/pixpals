import { useParams } from 'react-router-dom';

const GroupDetails = () => {
  const { groupId } = useParams();
  console.log(groupId);
};

export default GroupDetails;
