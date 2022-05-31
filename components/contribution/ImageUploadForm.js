import SingleImageUpload from './SingleImageUpload';

/**
 * Image upload form component for the contribution page. Right now it only
 * accepts one image using the `SingleImageUpload` component. TODO: Add support
 * for multiple images.
 * 
 * @param {object} props - Props
 * @param {function} props.onUpdate - The function to call when the value of the
 *    image field updates (`{imageData: string}`)
 * @param {string} props.formData - The current form data.
 * @param {string} props.title - The title of this form
 * @param {string} props.label - The label of this form (e.g. 'Upload an image')
 * @returns
 */
const ImageUploadForm = ({ onUpdate, formData, title, label }) => {
  console.log(formData);
  return (
    <form className="ImageUploadForm">
      <h2>{title || 'Image Upload'}</h2>
      <span>
        <div>
          <label>{label || 'Upload an image'}</label>
          <SingleImageUpload
            handleUpdateImage={(imagebuffer, extension) =>
              onUpdate({ imageData: imagebuffer, imageExtension: extension })
            }
            currentImage={formData.imageData}
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
      </span>
    </form>
  );
};

export default ImageUploadForm;
