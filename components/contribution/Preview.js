import {
  convertWorkshopContributionToSchema,
  WORKSHOP_CONTRIBUTION_NAME,
  ARCHIVE_CONTRIBUTION_NAME,
  convertArchiveContributionToSchema,
} from '../../lib/utils';
import Archive from '../Archive';
import Workshop from '../Workshop';

const Preview = ({ formData, missingFields }) => {
  const getPreview = () => {
    if (!formData) {
      return <></>;
    }

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

    if (formData.survey_origin === WORKSHOP_CONTRIBUTION_NAME) {
      const { workshop, imageMeta, imageData } =
        convertWorkshopContributionToSchema(formData);
      console.log(workshop);
      return (
        <Workshop
          workshop={workshop}
          imageMetas={imageMeta && [imageMeta]}
          imageSrc={imageData?.data}
        />
      );
    } else if (formData.survey_origin === ARCHIVE_CONTRIBUTION_NAME) {
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
      {/* <pre id="json">
        <code>
          {JSON.stringify(
            { ...formData, imageData: formData.imageData ? 'uploaded' : null },
            null,
            4
          )}
        </code>
      </pre> */}
      {getPreview()}
    </div>
  );
};

export default Preview;
