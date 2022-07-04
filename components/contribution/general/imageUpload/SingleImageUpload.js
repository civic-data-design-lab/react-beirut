import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Trans, useTranslation } from "react-i18next";




const SingleImageUpload = ({ handleUpdateImage, currentImage }) => {
  const {t} = useTranslation();
  const reader = new FileReader()
  let extension;
  let imageBuffer;


  const readFile = (file) =>{

      console.log('2')
      return new Promise((res, reject)=>{
          reader.onload = (e) => {
              console.log("3")
              const imageBuffer = e.target.result;
              const extension = file.name.split('.').pop();
              console.log('extension is ', extension)
              console.log('buffer is ', imageBuffer)
              handleUpdateImage(imageBuffer, extension)
              res([imageBuffer, extension])
          };
          reader.readAsDataURL(file)

      })
  }




  const handleUploadImage = async (e) => {
      let file = e.target.files[0];
      console.log('1')
      await readFile(file)
          .then((info)=>{
              console.log("info ", info)
              extension = info[1];
              imageBuffer = info[0];
          })
          .then(()=>{
              if (extension === "HEIC" || extension === "HEIF") {
                  console.log("HEREEEE")
                  console.log("buffer before fetch ", imageBuffer)
                  fetch('/api/convertedImages', {
                      method: 'POST',
                      body: file//imageBuffer,//.toString(),
                  })
                      .then((res) => {
                          imageBuffer = res.json()
                          extension = "jpeg"
                          console.log("buffer is now ", imageBuffer)
                          // file = new File(res, "")
              })
              }
          })





      // await readFile(file)

      try {
          //
          } catch (e) {
              handleUpdateImage(null, null)
              console.warn("could not read file")
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
