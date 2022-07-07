import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";


const SingleImageUpload = ({currentImage, handleUpdateImage}) => {


    const [submitting, setSubmitting] = useState(false);


    useEffect(()=>{
       const script = document.createElement("script");
       script.src = "https://cdn.jsdelivr.net/npm/heic2any@0.0.3/dist/heic2any.min.js";
       script.async = true;
       //script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
    }, [])





    const {t}=useTranslation();

    const handleUploadImage = (e) => {
    setSubmitting(true)
    const file = e.target.files[0];
    // CHECK IF HEIC OR HEIF
    try {
        const ext = file.name.toLowerCase().split('.').pop()
        if (ext === "heic" || ext === "heif") {
            console.log("heic detected")
          heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.5
          }).then((img) => {
              console.log("img", img)
            readFile(img, "jpeg")
          })
        } else {
          readFile(file)
        }
    } catch (e) {
        setSubmitting(false)
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
      setSubmitting(false)
    };
    try{
      reader.readAsDataURL(file);
    } catch (err) {
        setSubmitting(false)
      handleUpdateImage(null, null);
    };
  }


    return (
        <>
        <div className="SingleImageUpload image-upload-container">
      {/* {currentImage && (
        <button type="button" title='Clear image' onClick={handleClearImage}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )} */}
          <label>
            {currentImage ? (
                <img src={currentImage} alt="Uploaded image" />
            ) : (submitting?
                    <>
                        <div className="loader" />
                        <br />
                        <p>{t('Uploading Images...')}</p>
                    </>
                :(<div className="SingleImageUpload-default">
                  <FontAwesomeIcon icon={faImage} width="5em" />
                  <p>{t('Click to upload image')}</p>
                </div>)
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
            </>
  )}


export default SingleImageUpload;





