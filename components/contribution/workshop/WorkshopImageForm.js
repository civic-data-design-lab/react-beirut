import ImageUploadForm from '../general/imageUpload/ImageUploadForm';
import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';

const WorkshopImageForm = ({ onUpdate, formData, title, label }) => {
  return (
    <>
    <h2>Craft Workshop Image Upload</h2>
      <div className="WorkshopImageForm">
        <ImageUploadForm
          onUpdate={onUpdate}
          formData={formData}
          dataLocation="images"
          title=""
          label="Upload an image of the craft workshop"
          requiredFields={[]}
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
        defaultTags={[
          'Storefront',
          'Street view',
          'Craftsperson',
          'Craft object',
          'Other outdoor space',
        ]} //!! This space might not work with the form bc of how it saves to the data.
        hasOtherField={true}
      />
    </>
  );
};

export default WorkshopImageForm;
