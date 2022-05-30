import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';

const SingleImageUpload = ({ handleUpdateImage, currentImage }) => {
  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBuffer = e.target.result;
      const extension = file.name.split('.').pop();
      handleUpdateImage(imageBuffer, extension);
    };
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      handleUpdateImage(null, null);
    }
  };

  return (
    <div className="SingleImageUpload">
      {/* {currentImage && (
        <button type="button" title='Clear image' onClick={handleClearImage}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )} */}
      <label>
        {currentImage ? (
          <img src={currentImage} alt="Uploaded image" />
        ) : (
          <div className='SingleImageUpload-default'>
            <FontAwesomeIcon icon={faImage} width="5em" />
            <p>Click to upload image</p>
          </div>
        )}
        <input
          type="file"
          name="image-upload"
          id="image-upload"
          accept=".png,.jpeg,.jpg"
          onChange={handleUploadImage}
        />
      </label>
    </div>
  );
};

export default SingleImageUpload;
