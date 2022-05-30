import { useState } from 'react';
import SingleImageUpload from './SingleImageUpload';
import ImageUploadForm from './ImageUploadForm';
import BooleanButtonForm from './BooleanButtonForm';

const WorkshopImageForm = ({ onUpdate, formData, title, label }) => {

  return (
    <>
      <ImageUploadForm
        onUpdate={onUpdate}
        formData={formData}
        title="Craft Workshop Image Upload"
        label="Upload an image of the craft workshop"
        requiredFields={[]}
      />
      <BooleanButtonForm
          onUpdate={onUpdate}
          formData={formData}
          dataLocation="image_content"
          title="Image Content"
          label="What is shown in this image?"
          defaultTags={["Storefront", "Street view", "Craftsperson", "Craft object", "Other outdoor space"]} //This space might not work with the form bc of how it saves to the data.
          requiredFields={[]}
          hasOtherField={true}
        />
    </>
  );
};

export default WorkshopImageForm;
