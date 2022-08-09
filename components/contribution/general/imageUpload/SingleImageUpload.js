import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import imageCompression from "browser-image-compression";


const SingleImageUpload = ({currentImage, handleUpdateImage}) => {


    const [submitting, setSubmitting] = useState(false);
    const [sizeLimit, setSizeLimit] = useState(false);


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/heic2any@0.0.3/dist/heic2any.min.js";
        script.async = true;
        //script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
    }, [])

    const {t} = useTranslation();

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    const handleUploadImage = (e) => {
        setSizeLimit(false)
        setSubmitting(true)
        // CHECK IF HEIC OR HEIF


        try {

            const file = e.target.files[0];
            if (! (file instanceof Blob || file instanceof File)) {
                setSubmitting(false)
                handleUpdateImage(null, null);
                return
            }
            imageCompression(file, options)
                .then(compressedFile => {
                    console.log("size ", compressedFile.size)
                    let ext = file.name.toLowerCase().split('.').pop()
                    if (ext === 'jpg') ext = 'jpeg';
                    if (ext === "heic" || ext === "heif") {
                        console.log("heic detected")
                        heic2any({
                            blob: compressedFile,
                            toType: "image/jpeg",
                            quality: 0.5
                        }).then((img) => {
                            console.log("img", img)
                            readFile(img, "jpeg")
                        })
                    } else {
                        readFile(compressedFile)
                    }
                })
        } catch (e) {
            setSubmitting(false)
            handleUpdateImage(null, null);
        }
    }

    const readFile = (file, ext = null) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageBuffer = e.target.result;
            if (!ext) {
                ext = file.name.split('.').pop();
                if (ext === 'jpg') ext = 'jpeg';
            }
            console.log("image buffer and extension!!!")
            console.log(imageBuffer, ext)
            handleUpdateImage(imageBuffer, ext);
            setSubmitting(false)
        };
        try {
            reader.readAsDataURL(file);

        } catch (err) {
            setSubmitting(false)
            handleUpdateImage(null, null);
        }
        ;
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
                        <img src={currentImage} alt="Uploaded image"/>
                    ) : (submitting ?
                            <>
                                <div className="loader" style={{zIndex: "900"}}/>
                                <br/>
                                <h1>LOADING</h1>
                                <p>{t('Uploading Image...')}</p>
                            </>
                            : (<div className="SingleImageUpload-default">
                                <FontAwesomeIcon icon={faImage} width="5em"/>
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
                {sizeLimit ?
                    <small className="input-error">
                        * {t('Please upload images less than 4MB')}
                    </small> : null}
            </div>
        </>
    )
}


export default SingleImageUpload;





