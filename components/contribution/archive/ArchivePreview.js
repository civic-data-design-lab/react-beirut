import Preview from '../general/Preview';

const ArchivePreview = ({
  formData,
  onUpdate,
  requiredFields,
  missingFields,
}) => {

  return (
    <>
      <p>ARCHIVE PREVIEW</p>
      <Preview
        formData={formData}
        onUpdate={onUpdate}
        requiredFields={requiredFields}
        missingFields={missingFields}
      />
    </>
  );
};

export default ArchivePreview;
