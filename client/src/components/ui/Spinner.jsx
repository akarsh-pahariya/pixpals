import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#181818] bg-opacity-30 backdrop-blur-md pointer-events-none"></div>
      <ClipLoader color="#4C1D95" loading size={48} />
    </div>
  );
};

export default Spinner;
