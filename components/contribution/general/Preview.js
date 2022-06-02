import {
  convertWorkshopContributionToSchema,
  WORKSHOP_CONTRIBUTION_NAME,
  ARCHIVE_CONTRIBUTION_NAME,
  convertArchiveContributionToSchema,
} from '../../../lib/utils';
import Archive from '../../Archive';
import Workshop from '../../Workshop';
import InputField from './InputField';

const Preview = ({ formData, onUpdate, requiredFields, missingFields }) => {
  const getPreview = () => {
    // INFO: Return nothing if there is no form data
    if (!formData) {
      return <></>;
    }

    // INFO: Return list of missing fields if there are missing fields.
    if (missingFields.length > 0) {
      return (
        <div>
          <h3>You are missing some necessary fields!</h3>
          <p>
            Please go back and fill in the required fields (*) before being able
            to see the preview and submit.
          </p>
          <ul>
            {missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      );
    }

    // INFO: If this form was for a workshop, show the workshop preview
    if (formData.survey_origin === WORKSHOP_CONTRIBUTION_NAME) {
      const { workshop, imageMeta, imageData } =
        convertWorkshopContributionToSchema(formData);
      // console.log(workshop);
      return (
        <Workshop
          workshop={workshop}
          imageMetas={imageMeta && [imageMeta]}
          imageSrc={imageData?.data}
        />
      );
    }

    // INFO: If this form was for an archive, show the archive preview
    if (formData.survey_origin === ARCHIVE_CONTRIBUTION_NAME) {
      const { archive, imageMeta, imageData } =
        convertArchiveContributionToSchema(formData);
      return (
        <Archive
          archive={archive}
          imageMetas={imageMeta && [imageMeta]}
          imageSrc={imageData?.data}
        />
      );
    }
  };

  return (
    <div>
      <h2>Preview</h2>
      {getPreview()}
      <InputField
        title="Data Consent"
        fieldName="consent"
        value={formData.consent}
        type="checkbox"
        onUpdate={onUpdate}
        required={requiredFields?.includes('consent')}
        label="I consent to the data in this form being shared on our public database."
      />
    </div>
  );
};

export default Preview;
