import { useState } from 'react';
import SingleImageUpload from './SingleImageUpload';

const ImageUploadForm = ({ onUpdate, formData, title, label }) => {
  console.log(formData)
  return (
    <form className="ImageUploadForm">
      <h2>{title || 'Image Upload'}</h2>
      <span>
        <div>
          <label>{label || 'Upload an image'}</label>
          <SingleImageUpload
            handleUpdateImage={(imageData) => onUpdate({ imageData })}
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
