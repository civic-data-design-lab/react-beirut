import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Trans, useTranslation } from 'react-i18next';

const UploadedImage = ({ onUpdate, formData, dataLocation, imageId }) => {
  const { t } = useTranslation();
  return (
    <div className="UploadedImage">
      <div>
        <FontAwesomeIcon icon={faPlus} width="3em" />
        <p>{t('Click to upload image')}</p>
      </div>
    </div>
  );
};

export default UploadedImage;
