import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Trans, useTranslation } from "react-i18next";




const SingleImageUpload = ({ handleUpdateImage, currentImage }) => {
  const {t} = useTranslation();



  const handleUploadImage = (e) => {
      let file = e.target.files[0];
      const reader = new FileReader()

      reader.onload = (e) => {
            let imageBuffer = e.target.result;
            let extension = file.name.split('.').pop();
            console.log('extension is ', extension)
            console.log('buffer is ', imageBuffer);

            if (extension === "HEIC" || extension === "HEIF") {
                fetch('/api/convertedImages', {
                    method: 'POST',
                    body: imageBuffer,
                })
                    .then((res) => {
                        imageBuffer = res
                        extension = "jpeg"
                        console.log("buffer is now ", imageBuffer)
                        //file = new File(res)
                    })
            }

            try {
                    reader.readAsDataURL(file)
                } catch (e) {
                    handleUpdateImage(null, null)
                    console.warn("could not read file")
                }
      }
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
