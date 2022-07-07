import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import {useTranslation} from "react-i18next";
import heic2any from "heic2any";

const SingleImageUpload = ({currentImage, handleUpdateImage}) => {


    const {t}=useTranslation();

    const handleUploadImage = (e) => {
    const file = e.target.files[0];
    // CHECK IF HEIC OR HEIF
    try {
        const ext = file.name.toLowerCase().split('.').pop()
        if (ext === "heic" || ext === "heif") {
          heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.5
          }).then((img) => {
              console.log(img)
            readFile(img, "jpeg")
          })
        } else {
          readFile(file)
        }
    } catch (e) {
        handleUpdateImage(null, null);
    }
  }

    const readFile = (file, ext=null) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBuffer = e.target.result;
      if (!ext) {
        ext = file.name.split('.').pop();
      }
      console.log('extension is ', ext)
      handleUpdateImage(imageBuffer, ext);
    };
    try{
      reader.readAsDataURL(file);
    } catch (err) {
      handleUpdateImage(null, null);
    };
  }


    return (
        // <script src='https://cdn.jsdelivr.net/npm/heic2any@0.0.3/dist/heic2any.min.js'/>
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
  )}


export default SingleImageUpload;





