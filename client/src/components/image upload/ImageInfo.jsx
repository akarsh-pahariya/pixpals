const ImageInfo = ({ file }) => {
  return (
    <div>
      <p>File Size: {file}</p>
      <p>Images uploaded: {file.length}</p>
    </div>
  );
};

export default ImageInfo;
