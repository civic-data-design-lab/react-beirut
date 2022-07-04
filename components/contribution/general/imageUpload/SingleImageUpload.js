import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Trans, useTranslation } from "react-i18next";




const SingleImageUpload = ({ handleUpdateImage, currentImage }) => {
  const {t} = useTranslation();



  const handleUploadImage = (e) => {
      console.log("entered function 1")
      const file = e.target.files[0];
      console.log("entered function 2")
      const reader = new FileReader()
      console.log("entered function")
      fetch('/api/convertedImages', {
                      method: 'POST',
                      body: file,
                  })
          .then((res)=>{
              try {
                  reader.readAsDataURL(res[0])
                  handleUpdateImage(res[1], res[2]);
              } catch (e) {
                  handleUpdateImage(null, null);
              }

          })

  }





  return (
    <div className="SingleImageUpload image-upload-container">
      {/* {currentImage && (
        <button type="button" title='Clear image' onClick={handleClearImage}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )} */}
      <label>
        {currentImage ? (
          <img src={currentImage} alt="Uploaded image" />
        ) : (
          <div className="SingleImageUpload-default">
            <FontAwesomeIcon icon={faImage} width="5em" />
            <p>{t('Click to upload image')}</p>
          </div>
        )}
        <input
          type="file"
          name="image-upload"
          id="image-upload"
          accept=".png,.jpeg,.jpg, .gif, .mp4, .mp3, m4a, .mov, .HEIC, .HEIF"
          onChange={handleUploadImage}
        />
      </label>
    </div>
  );
};

export default SingleImageUpload;
