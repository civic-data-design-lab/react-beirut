// import SingleImageUpload from './SingleImageUpload';
import BooleanButtonForm from '../booleanButtonForm/BooleanButtonForm';
import UploadedImage from './UploadedImage';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

const SingleImageUpload = dynamic(
  () => import('../imageUpload/SingleImageUpload'),
  {
    ssr: false,
  }
);

<SingleImageUpload />;

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
const ImageUploadForm = ({
  onUpdate,
  formData,
  dataLocation,
  title,
  label,
  imageRequired,
  captionRequired,
  maxNumberOfImages = 1,
  fields,
  forWorkshop = true,
  imageIndex,
}) => {
  const { t } = useTranslation();

  const [imageFormState, setImageFormState] = useState({});
  //const [imageIndex, setImageIndex] = useState(0); // TODO: Set up multi-image upload.

  const updateImageFormState = (imageIndex, data) => {
    let newData = formData;

    if (!newData[dataLocation]) {
      newData[dataLocation] = {};
    }

    newData[dataLocation][imageIndex] = data;

    setImageFormState((prevForm) => {
      const updatedFormData = { ...prevForm, ...newData };
      // console.log('setting ImageFormState to ', updatedFormData);
      onUpdate(updatedFormData);
      return updatedFormData;
    });
  };

  const changeCaption = (e) => {
    const caption = e.target.value;

    let newData = formData;

    if (!newData['caption']) {
      newData['caption'] = {};
    }

    newData['caption'][imageIndex] = {};
    newData['caption'][imageIndex] = caption;
    onUpdate(newData);
  };

  const getCaption = () => {
    if (!formData['caption'] || !formData['caption'][imageIndex]) {
      return '';
    } else {
      return formData['caption'][imageIndex];
    }
  };

  return (
    <form className="ImageUploadForm ">
      <div className={'sections'}>
        <div className={'d-flex flex-column image-section'}>
          <div className={'subsection'}>
            <h3 className={'Contribute-form-section-heading'}>
              {' '}
              {t(title || 'Image Upload')}
            </h3>

            {maxNumberOfImages != 1 &&
              [...Array(maxNumberOfImages).keys()].map((i) => {
                return (
                  <UploadedImage
                    onUpdate={onUpdate}
                    formData={formData}
                    imageId={i}
                  />
                );
              })}

            <label
              className={imageRequired ? 'required bbf-label' : 'bbf-label'}
            >
              {t(label || 'Upload an image')}
            </label>
            <SingleImageUpload
              handleUpdateImage={(imagebuffer, extension) => {
                updateImageFormState(imageIndex, {
                  imageData: imagebuffer,
                  imageExtension: extension,
                });
                // onUpdate({ [dataLocation]: { imageData: imagebuffer, imageExtension: extension } })
              }}
              currentImage={
                formData[dataLocation] && formData[dataLocation][imageIndex]
                  ? formData[dataLocation][imageIndex]['imageData']
                  : ''
              }
              // currentImage={formData[dataLocation][]}
            />
          </div>
        </div>

        <div className={'d-flex flex-column image-section'}>
          <div className={'subsection'}>
            {forWorkshop ? (
              <>
                <h3 className={'Contribute-form-section-heading'}>
                  {t('Image Tags')}
                </h3>
                <BooleanButtonForm
                  onUpdate={onUpdate}
                  formData={formData}
                  dataLocation="image_content"
                  title="Image Content"
                  label={t('What is shown in this image?')}
                  defaultTags={[
                    'Storefront',
                    'Street view',
                    'Craftsperson',
                    'Craft object',
                    'Other outdoor space',
                  ]}
                  hasOtherField={true}
                  required={fields.image_content.required}
                  imageIndex={imageIndex}
                />
              </>
            ) : (
              <>
                <h3 className={'Contribute-form-section-heading'}>
                  {t('Image Tags')}
                </h3>
                <BooleanButtonForm
                  onUpdate={onUpdate}
                  formData={formData}
                  title={t('What is the image showing?')}
                  label={t('What is the image showing?')}
                  dataLocation={'image_type'}
                  imageIndex={imageIndex}
                  required={fields.image_type.required}
                  defaultTags={[
                    'Storefront',
                    'Street view',
                    'Craftsperson',
                    'Craft object',
                    'Other outdoor space',
                  ]}
                  hasOtherField={true}
                />
              </>
            )}
          </div>

          <div className={'subsection'}>
            <label
              className={captionRequired ? 'required bbf-label' : 'bbf-label'}
              htmlFor="caption"
            >
              {t('Enter a caption or story associated with the image.')}
            </label>
            <textarea
              name="caption"
              id="caption"
              value={getCaption()}
              onChange={changeCaption}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ImageUploadForm;
