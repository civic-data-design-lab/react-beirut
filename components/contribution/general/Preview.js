import {
  ARCHIVE_CONTRIBUTION_NAME,
  convertArchiveContributionToSchema,
  convertWorkshopContributionToSchema,
  WORKSHOP_CONTRIBUTION_NAME,
} from '../../../lib/utils';
import { useTranslation } from 'next-i18next';
import InputField from './InputField';
import PreviewCard from './PreviewCard';

const Preview = ({
  formData,
  onUpdate,
  formSchema,
  missingFields,
  lang,
  i18n,
}) => {
  console.debug(formSchema);
  const missingFieldPages = [
    ...new Set(missingFields.map((field) => field.parent)),
  ];
  const page = formSchema.pages.preview;
  const fields = page.fields;
  const { t } = useTranslation();

  const getPreview = () => {
    // INFO: Return nothing if there is no form data. (Is this necessary?)
    if (!formData) {
      return <></>;
    }

    // INFO: Return list of missing fields if there are missing fields.
    if (missingFields.length > 0) {
      return (
        <div className={'preview-info-card'}>
          <h3 className={'Contribute-form-section-heading'}>
            {t('You are missing some necessary fields!')}
          </h3>
          <p>
            {t(
              'Please go back and fill in the required fields (*) before being able to see the preview and submit.'
            )}
          </p>
          {missingFieldPages.map((page) => {
            return (
              <div key={page}>
                <h4>{t(page)}</h4>
                <ul>
                  {missingFields
                    .map((field) =>
                      field.parent == page ? (
                        <li
                          style={{ listStylePosition: 'inside' }}
                          key={field.field_name}
                        >
                          {t(field.title)}
                        </li>
                      ) : null
                    )
                    .filter((field) => {
                      return field;
                    })}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }

    // INFO: If this form was for a workshop, show the workshop preview
    if (formData.survey_origin === WORKSHOP_CONTRIBUTION_NAME) {
      const { workshop, imageMetas, imageDataOriginals } =
        convertWorkshopContributionToSchema(formData, formSchema);

      let buffers = {};
      for (const [key, value] of Object.entries(formData.images)) {
        buffers[parseInt(key)] = value.imageData;
      }

      return (
        <PreviewCard
          object={workshop}
          imageMetas={imageMetas}
          imageSrc={buffers}
          objType={'workshop'}
          lang={lang}
          i18n={i18n}
        />
      );
    }

    // INFO: If this form was for an archive, show the archive preview
    if (formData.survey_origin === ARCHIVE_CONTRIBUTION_NAME) {
      console.log('formData in preview ', formData);
      const { archive, imageMetas, imageDataOriginals } =
        convertArchiveContributionToSchema(formData, formSchema);
      console.log('imageMeta in Preview ', imageMetas);

      let buffers = {};
      for (const [key, value] of Object.entries(formData.images)) {
        buffers[parseInt(key)] = value.imageData;
      }

      return (
        <PreviewCard
          object={archive}
          imageMetas={imageMetas}
          imageSrc={buffers}
          objType={'archive'}
          i18n={i18n}
        />
      );
    }
  };

  return (
    <div className={'previewForm'}>
      <div className={'form-title'}>
        <h2>{t('Preview')}</h2>
      </div>
      <div className={'sections'}>
        <div className={'section'}>
          <div className={'subsection'}>
            <InputField
              title={t(fields.consent.title)}
              fieldName={fields.consent.field_name}
              key={fields.consent.field_name}
              value={formData[fields.consent.field_name]}
              type="checkbox"
              onUpdate={onUpdate}
              required={fields.consent.required}
              label={t(
                'Data collected will be added to the Living Heritage Atlas (LHA) database and will be available for public download and used in research and analysis that might include caption details and metadata. Metadata and photo(s) submitted will be displayed on the LHA website, as shown in the preview below. Checking this box indicates that you consent to sharing information and photo(s) with the LHA and third-party users who might use the data independently from the LHA. Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!'
              )}
            />
          </div>
        </div>
        <div className={'preview-section'}>
          <div className={'subsection'}>{getPreview()}</div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
