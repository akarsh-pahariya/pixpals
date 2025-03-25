import ProgressBar from '@ramonak/react-progress-bar';

const ImageUploadProgressBar = ({ percentage }) => {
  return (
    <div className="mt-6">
      <ProgressBar
        completed={percentage}
        bgColor="#6D28D9"
        height="48px"
        width="100%"
        borderRadius="12px"
        baseBgColor="#2A2A2A"
        labelColor="#ffffff"
        transitionDuration="0.3s"
        customLabel={`${percentage}%`}
        labelSize="16px"
        labelAlignment="center"
      />
    </div>
  );
};

export default ImageUploadProgressBar;
