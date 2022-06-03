import Preview from '../general/Preview';

const WorkshopPreview = ({
  formData,
  onUpdate,
  requiredFields,
  missingFields,
}) => {
  return (
    <>
      <p>WORKSHOP PREVIEW</p>
      <Preview
        formData={formData}
        onUpdate={onUpdate}
        requiredFields={requiredFields}
        missingFields={missingFields}
      />
    </>
  );
};

export default WorkshopPreview;
