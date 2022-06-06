import ImageUploadForm from '../general/imageUpload/ImageUploadForm';
import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';

const WorkshopImageForm = ({
  onUpdate,
  formData,
  formSchema,
  title,
  label,
}) => {
  const page = formSchema.pages.image_upload;
  const fields = page.fields;

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
          imageRequired={true}
          captionRequired={fields.caption.required}
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
        ]}
        hasOtherField={true}
        required={fields.image_content.required}
      />
    </>
  );
};

export default WorkshopImageForm;
