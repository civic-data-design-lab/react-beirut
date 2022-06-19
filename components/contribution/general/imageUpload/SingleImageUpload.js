import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';

import {TRANSLATIONS} from "/lib/utils";
import i18n from "i18next";
import { Trans, useTranslation, initReactI18next } from "react-i18next";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);

const SingleImageUpload = ({ handleUpdateImage, currentImage }) => {
  const {t} = useTranslation();

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
          accept=".png,.jpeg,.jpg, .gif, .mp4, .mp3, m4a, .mov"
          onChange={handleUploadImage}
        />
      </label>
    </div>
  );
};

export default SingleImageUpload;
