/**
 * Archive Contribution Page
 *
 * @GatlenCulp update this as changes to the fields are made
 * TODO: Add craft discipline/craft discipline category. Don't forget to update
 * the fields in `convertArchiveContributionToSchema()` in `lib/utils.js`
 *
 * Pages:
 * 0. Archive Image Upload
 *    - imageData*
 *    - imageExtension* (implied)
 *    - caption*
 * 1. Archive About
 *    - `imageType`
 *    - `yearTaken` (e.g. `'2022`) *[yearTaken OR (startDecade AND endDecade)]
 *    - `startDecade` (e.g. `'1930'`) *[yearTaken OR (startDecade AND endDecade)]
 *    - `endDecade` *[yearTaken OR (startDecade AND endDecade)]
 *    - `workshopName`
 *    - `ownerName`
 *    - `referenceName`
 *    - `referenceUrl`
 *    - `referenceCopyright`
 * 2. Archive Location
 *    - buildingNumber
 *    - street
 *    - quarter*
 *    - sector*
 *    - lat*
 *    - lng*
 * 3: Preview
 */

import { useState, useEffect } from 'react';
import ArchiveImageForm from '../../components/contribution/archive/ArchiveImageForm';
import LocationForm from '../../components/contribution/general/location/LocationForm';
import MultipageForm from '../../components/contribution/general/MultipageForm';
import Preview from '../../components/contribution/general/Preview';
import Head from 'next/head';
import {
  ARCHIVE_CONTRIBUTION_NAME,
  convertArchiveContributionToSchema,
  isProperlyTruthy,
  CRAFT_CATEGORIES,
} from '../../lib/utils';
import ArchiveAboutForm from '../../components/contribution/archive/ArchiveAboutForm';
import Card from '../../components/Card';

const formSchema = {
  pages: {
    image_upload: {
      title: 'Archival Image Upload',
      short_title: 'Archive Upload',
      custom_reqs: {
        image_req: {
          function: (formData) => {
            return {
              requirementFulfilled: isProperlyTruthy(formData.images),
              errorMessage: '',
            };
          },
          title: 'Image Upload',
        },
        time_req: {
          function: (formData) => {
            const fields = formSchema.pages.image_upload.fields;
            if (
              formData[fields.year_taken.field_name] ||
              (formData[fields.start_decade.field_name] &&
                formData[fields.end_decade.field_name])
            ) {
              return {
                requirementFulfilled: true,
                errorMessage: '',
              };
            }

            return {
              requirementFulfilled: false,
              errorMessage:
                'Either a year or range of decades must be provided.',
            };
          },
          title: 'Time Frame',
        },
      },
      fields: {
        image: {
          title: 'Craft Workshop Image Upload',
          field_name: 'image',
          // required: true, Need custom function to check for now.
        },
        caption: {
          title: 'Caption',
          field_name: 'caption',
          required: true,
        },
        image_type: {
          title: 'Image Type',
          field_name: 'image_type',
        },
        year_taken: {
          title: 'Year Taken',
          field_name: 'year_taken',
        },
        start_decade: {
          title: 'Start Decade',
          field_name: 'start_decade',
        },
        end_decade: {
          title: 'End Decade',
          field_name: 'end_decade',
        },
        craft_category: {
          title: 'Craft Category',
          field_name: 'craft_category',
        },
        type_of_craft: {
          title: 'Type of Craft',
          field_name: 'type_of_craft',
        },
      },
    },
    about: {
      title: 'About the Archive',
      short_title: 'About the Archive',
      custom_reqs: {
        ref_source_req: {
          function: (formData) => {
            const fields = formSchema.pages.about.fields;
            if (
              (formData[fields.type_of_reference.field_name] == 'Print source' ||
              formData[fields.type_of_reference.field_name] == 'Electronic source') &&
              !formData[fields.reference_source_citation.field_name]
            ) {
              return {
                requirementFulfilled: false,
                errorMessage: '',
              };
            }

            return {
              requirementFulfilled: true,
              errorMessage: '',
            };
          },
          title: 'Reference Source Citation',
        },
      },
      fields: {
        workshop_name: {
          title: 'Workshop Name',
          field_name: 'workshop_name',
        },
        owner_name: {
          title: 'Owner Name',
          field_name: 'owner_name',
        },
        type_of_reference: {
          title: 'Type of Reference',
          field_name: 'type_of_reference',
        },
        reference_source_citation: {
          // This is a link to the source if book or website
          title: 'Reference Source Citation',
          field_name: 'reference_source_citation',
        },
        reference_name: {
          // This is the name of the person submitting the photo if this is an original.
          title: 'Reference Name',
          field_name: 'reference_name',
        },
        reference_copyright: {
          // This is additional information about the copyright
          title: 'Reference Copyright',
          field_name: 'reference_copyright',
        },
      },
    },
    location: {
      title: 'Location of Archival Image',
      fields: {
        building_number: {
          title: 'Building Number',
          field_name: 'building_number',
        },
        street: {
          title: 'Street Name/Number',
          field_name: 'street',
        },
        quarter: {
          title: 'Quarter',
          field_name: 'quarter',
          required: true,
        },
        sector: {
          title: 'Sector',
          field_name: 'sector',
          required: true,
        },
        lat: {
          title: 'Latitude',
          field_name: 'lat',
        },
        lng: {
          title: 'Longitude',
          field_name: 'lng',
        },
      },
    },
    preview: {
      title: 'Preview',
      fields: {
        consent: {
          title: 'Consent',
          field_name: 'consent',
          required: true,
        },
      },
    },
  },
};

const ArchiveContribution = () => {
  const [form, setForm] = useState({
    survey_origin: ARCHIVE_CONTRIBUTION_NAME,
  });
  const [dialog, setDialog] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // INFO: Required fields for each page
  const [requiredFields, setRequiredFields] = useState({
    imageUpload: ['imageData', 'caption'],
    about: ['imageType', 'typeOfReference', 'referenceSourceCitation'],
    location: ['quarter', 'sector', 'lat', 'lng'],
    preview: ['consent'],
  });

  const onUpdate = (data) => {
    setForm((prevForm) => {
      const updatedFormData = { ...prevForm, ...data };
      console.info('setting form data to ', updatedFormData);
      localStorage.setItem(
        ARCHIVE_CONTRIBUTION_NAME,
        JSON.stringify(updatedFormData)
      );
      return updatedFormData;
    });
  };

  const onSubmit = () => {
    // INFO: Prepare the form data for submission
    const { archive, imageMeta, imageData } =
      convertArchiveContributionToSchema(form, formSchema);

    const data = { archive, imageMetas: [imageMeta], imageData: [imageData] };

    console.group('Database Submission');
    console.info('Here is all the data being uploaded to the server:', data);
    console.info(
      `When uploaded, your archive will be visible at http://localhost:3000/discover/${archive.ID}`
    );
    console.info('Find these entries on MongoDB with the filters:');
    console.info(
      `archives: {info_type: '${ARCHIVE_CONTRIBUTION_NAME}', ID: '${archive.ID}'}`
    );
    console.info(
      `imagemetas: {from_survey: '${ARCHIVE_CONTRIBUTION_NAME}', response_id: '${archive.ID}'}`
    );
    console.info(`imagedatas: {img_id: '${data.imageMetas[0].img_id}'}`);
    console.groupEnd();

    fetch('/api/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((data) => setDialog(data.message));
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        // console.log(data);
        setSubmitted(true);
        // Clear the form data
        setForm({});
        localStorage.removeItem(ARCHIVE_CONTRIBUTION_NAME);
      })
      .catch((err) => setDialog(err));
  };

  const showDialogContent = () => {
    return (
      <div>
        <h1>Failed to submit!</h1>
        <h4>{dialog}</h4>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Archive Contribution | Intangible Heritage Atlas</title>
      </Head>
      {dialog && (
        <Card handleClose={() => setDialog(null)}>
          <div className="card__content">{showDialogContent()}</div>
        </Card>
      )}
      <div className="Contribute drop-shadow__black">
        <MultipageForm
          name={ARCHIVE_CONTRIBUTION_NAME}
          formData={form}
          formSchema={formSchema}
          onUpdate={onUpdate}
          onSubmit={onSubmit}
          submitted={submitted}
        >
          <ArchiveImageForm
            title="Archival Image Upload"
            label="Upload an archival image related to crafts in Beirut"
            requiredFields={requiredFields.imageUpload}
          />
          <ArchiveAboutForm
            title="About the Archive"
            requiredFields={requiredFields.about}
          />
          <LocationForm
            title="Location of Archival Image"
            mapCaption="Locate where this image was taken on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly."
            requiredFields={requiredFields.location}
          />
          <Preview onUpdate={onUpdate} />
        </MultipageForm>
      </div>
    </>
  );
};

export default ArchiveContribution;
