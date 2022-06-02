import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';


const UploadedImage = ({ onUpdate, formData, dataLocation, imageId }) => {

  return (
    <div className='UploadedImage'>
      <div>
        <FontAwesomeIcon icon={faPlus} width="3em" />
        <p>Click to upload image</p>
      </div>
    </div>
  );
};

export default UploadedImage;
