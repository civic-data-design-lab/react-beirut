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
    // INFO: Return nothing if there is no form data. (Is this necessary?)
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
      console.debug('Returning workshop to preview:', workshop);
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
      console.debug('Returning archive to preview:', archive);
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
        label={
          formData.survey_origin === WORKSHOP_CONTRIBUTION_NAME
            ? `Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your craft workshop information, location, and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview above.
        Checking this box indicates that you consent to sharing information and photo(s) about your craft workshop with the Living Heritage Atlas.
        Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!`
            : `Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your information and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview above.
        Checking this box indicates that you consent to sharing information and photo(s) with the Living Heritage Atlas.
        Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!`
        }
      />
    </div>
  );
};

export default Preview;
