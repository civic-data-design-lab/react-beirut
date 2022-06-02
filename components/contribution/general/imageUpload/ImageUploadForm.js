import SingleImageUpload from './SingleImageUpload';
import BooleanButtonForm from '../booleanButtonForm/BooleanButtonForm';

import UploadedImage from './UploadedImage';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

/**
 * Image upload form component for the contribution page. Right now it only
 * accepts one image using the `SingleImageUpload` component. TODO: Add support
 * for multiple images.
 * 
 * @param {object} props - Props
 * @param {function} props.onUpdate - The function to call when the value of the
 *    image field updates (`{imageData: string}`)
 * @param {string} props.formData - The current form data.
 * @param {string} props.dataLocation - Location in the form object to read/save the images
 * @param {string} props.title - The title of this form
 * @param {string} props.label - The label of this form (e.g. 'Upload an image')
 * @param {Number} props.maxNumberOfImages - Number of images allowed for selection on this form. Any more than one will display the image sidebar.
 * @returns
 */
const ImageUploadForm = ({ onUpdate, formData, dataLocation, title, label, maxNumberOfImages=1}) => {
  console.log(formData);
  
  const [imageFormState, setImageFormState] = useState({});

  const updateImageFormState = (newData) => {
    setImageFormState((prevForm) => {
      const updatedFormData = { ...prevForm, ...newData };
      console.log('setting ImageFormState to ', updatedFormData);
      onUpdate(updatedFormData);
      return updatedFormData;
    });
  }

  // useEffect(() => {
  //   onUpdate({ [dataLocation]: { imageData: imagebuffer, imageExtension: extension, imageContent: null} })
  
  //   return 
  // }, [])
  

  return (
    <form className="ImageUploadForm">
      <h2>{title || 'Image Upload'}</h2>
      <div>
        <div>
          { maxNumberOfImages != 1 &&
            [...Array(maxNumberOfImages).keys()].map((i) => {
              console.log(i)
              return <UploadedImage
                onUpdate={onUpdate}
                formData={formData}
                imageId={i}
              />
            })
          }
        </div>
        <span>
          <div>
            <label>{label || 'Upload an image'}</label>
            <SingleImageUpload
              handleUpdateImage={(imagebuffer, extension) => {
                  updateImageFormState({ [dataLocation]: { imageData: imagebuffer, imageExtension: extension } });
                  // onUpdate({ [dataLocation]: { imageData: imagebuffer, imageExtension: extension } })
                }
              }
              currentImage={formData[dataLocation] ? formData[dataLocation]["imageData"] : ""}
              // currentImage={formData[dataLocation][]}
            />
          </div>

          <div>
            <label htmlFor="caption">
              Enter a caption or a story associated with this image.
            </label>
            <textarea
              name="caption"
              id="caption"
              value={formData.caption || ''}
              onChange={(e) => onUpdate({ caption: e.target.value })}
            />
          </div>
          {/* TODO: Fix this ugly space that is here for whatever reason. */}
          <BooleanButtonForm
              onUpdate={
                // (obj) => {
                //   console.log("HERE");
                //   console.log(obj);
                //   updateImageFormState({ [dataLocation]: { imageContent: obj["image_content"] } });
                //   // onUpdate({ [dataLocation]: { imageData: imagebuffer, imageExtension: extension } })
                // }
                onUpdate
            }
              formData={formData}
              dataLocation="image_content"
              title="Image Content"
              label="What is shown in this image?"
              defaultTags={["Storefront", "Street view", "Craftsperson", "Craft object", "Other outdoor space"]} //This space might not work with the form bc of how it saves to the data.
              hasOtherField={true}
            />
          </span>
        </div>
    </form>
  );
};

export default ImageUploadForm;
