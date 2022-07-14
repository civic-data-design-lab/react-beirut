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
import Dialogue from "../../components/contribution/general/Dialogue";
import {
  ARCHIVE_CONTRIBUTION_NAME,
  convertArchiveContributionToSchema,
  isProperlyTruthy,
  CRAFT_CATEGORIES, WORKSHOP_CONTRIBUTION_NAME,
} from '../../lib/utils';
import ArchiveAboutForm from '../../components/contribution/archive/ArchiveAboutForm';
import Card from '../../components/Card';
import {data} from "autoprefixer";

import { Trans, useTranslation } from "react-i18next";




let localStorageSize = function () {
   let _lsTotal = 0,_xLen, _x;
   for (_x in localStorage) {
   if (!localStorage.hasOwnProperty(_x)) continue;
       _xLen = (localStorage[_x].length + _x.length) * 2;
       _lsTotal += _xLen;
   }
 return  (_lsTotal / 1024).toFixed(2);
}

const imageRequirement = (formData) => {
  if (!formData.images || formData.images.length<1 || (!formData.images[0].imageData || !formData.images[0].imageExtension)) {
     // console.log('no formdata image detenceted');
    return {
      requirementFulfilled: false,
      errorMessage: 'Image upload required',
    };
  } else {
    console.log('uploaded image')
    return {
      requirementFulfilled: true,
      errorMessage: '',
    }
  }
}

const formSchema = {
  pages: {
    image_upload: {
      title: 'Archival Image Upload',
      short_title: 'Archive Upload',
      custom_reqs: {
        image_req: {
          function: imageRequirement,
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
      title: 'Archival Information',
      short_title: 'Archival Information',
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
          // required: true,
        },
        lat: {
          title: 'Latitude',
          field_name: 'lat',
        },
        lng: {
          title: 'Longitude',
          field_name: 'lng',
        },
        location_notes: {
          title: 'Location Notes',
          field_name: 'location_notes'
        }
      },
    },
    preview: {
      title: 'Preview',
      fields: {
        consent: {
          title: 'Consent to Publish Data',
          field_name: 'consent',
          // required: true,
        },
      },
    },
  },
};

const ArchiveContribution = ({i18n}) => {
  const [form, setForm] = useState({
    survey_origin: ARCHIVE_CONTRIBUTION_NAME,
  });

  const [dialog, setDialog] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [localStorageFull, setLocalStorageFull] = useState(false);
  const [submitFail, setSubmitFail] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(null);

  useEffect(()=> {
    setCookiesEnabled(navigator.cookieEnabled);
    if (navigator.cookieEnabled) {
      const tryExistingForm = JSON.parse(localStorage.getItem(ARCHIVE_CONTRIBUTION_NAME));
    if (tryExistingForm) {
      setForm(tryExistingForm)
      console.log('existing form is true so setForm to ', tryExistingForm)
    }
    }
  }, [])



  // INFO: Required fields for each page
  const [requiredFields, setRequiredFields] = useState({
    imageUpload: ['imageData', 'caption'],
    about: ['imageType', 'typeOfReference', 'referenceSourceCitation'],
    location: ['quarter', 'sector', 'lat', 'lng'],
    preview: ['consent'],
  });



  const handleRedirect = () => {
    setSubmitFail(false);
    setSubmitSuccess(false);
    setSubmitted(false);
    setSubmitting(false);
  }

  const onUpdate = (data) => {
    setForm((prevForm) => {
      const updatedFormData = { ...prevForm, ...data };
      console.info('setting form data to ', updatedFormData);

      if (cookiesEnabled && !localStorageFull) {
      try {
        localStorage.setItem(
        ARCHIVE_CONTRIBUTION_NAME,
        JSON.stringify(updatedFormData)
        );
      } catch (e) {
        console.log(e)
        setLocalStorageFull(true)
        setDialogTitle('Ran out of local storage space!')
        setDialog("Because your browser has exceeded its storage, it can no longer "+
            "save any more additions you make to this form for you to return to later. "  +
            "Please complete this submission within this session.")
      } }

      return updatedFormData;
    });
    // console.log( `size: ${localStorageSize()}kb`)
  };

  const onSubmit = () => {
    // INFO: Prepare the form data for submission
    const { archive, imageMeta, imageDataOriginal } =
      convertArchiveContributionToSchema(form, formSchema);

    const data = { archive, imageMetas: [imageMeta], imageDataOriginal: [imageDataOriginal] };

    console.group('Database Submission');

    console.info('Here is all the data being uploaded to the server:', data);
    console.info(
      `When uploaded, your workshop will be visible at http://localhost:3000/discover/${archive.ID}`
    );

    console.group('Find these entries on MongoDB with the filters:');
    console.info(
      `workshops: {survey_origin: '${ARCHIVE_CONTRIBUTION_NAME}', response_id: '${archive.ID}'}`
    );
    console.info(
      `imagemetas: {from_survey: '${ARCHIVE_CONTRIBUTION_NAME}', response_id: '${archive.ID}'}`
    );
    console.info(`imagedatas: {img_id: '${data.imageMetas[0].img_id}'}`);
    console.groupEnd();

    console.group(`Find the images here:`);
    const img_id = imageMeta.img_id;
    console.info(
      `Original: http://localhost:3000/api/original_images/${img_id}_original.jpeg -- May error if not actually a jpeg, didn't check file type.`
    );
    console.info(`Regular: http://localhost:3000/api/images/${img_id}.jpeg`);
    console.info(
      `Thumbnail: http://localhost:3000/api/thumbnail_images/${img_id}_thumbnail.jpeg`
    );
    console.groupEnd();

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
          console.log('failed to submit')
          res.json().then((data) => {

            //setDialog(data.message)
            setSubmitted(true);
            setSubmitFail(true);
            //setDialogTitle('Failed to Submit!')
          });
          return;
        } else {
          console.log('submitted')
          setSubmitted(true);
          setSubmitSuccess(true);
        // Clear the form data
        setForm({});
        if (cookiesEnabled) {
            setLocalStorageFull(false)
            localStorage.removeItem(ARCHIVE_CONTRIBUTION_NAME);
          }

        }
        return res.json();
      })
      .catch((err) => {
        setDialog(err)
        setDialogTitle('Failed to Submit!')
      });
  };



  return (
    <>
      <Head>

        <title>Archive Contribution | Living Heritage Atlas</title>

      </Head>
      {dialogTitle && dialog && (
          <Dialogue
            handleClose={() => {
              setDialog(null)
              setDialogTitle(null)
            }}
            cancel={false}
            accept={false}
            handleAccept={null}
            handleCancel={null}
            acceptText={null}
            cancelText={null}
            content={dialog}
            title={dialogTitle} />

      )}
      <div className={'Contribute-container'}>
        <div className="Contribute drop-shadow__black">
        <MultipageForm
          name={ARCHIVE_CONTRIBUTION_NAME}
          formData={form}
          formSchema={formSchema}
          onUpdate={onUpdate}
          onSubmit={onSubmit}
          submitted={submitted}
          submitFail={submitFail}
          submitSuccess={submitSuccess}
          handleRedirect={handleRedirect}
          setSubmitting={setSubmitting}
          submitting={submitting}
          cookiesEnabled={cookiesEnabled}
          i18n={i18n}
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
            name={ARCHIVE_CONTRIBUTION_NAME}
            i18n={i18n}
          />
          <Preview onUpdate={onUpdate} i18n={i18n}/>
        </MultipageForm>
      </div>
      </div>
    </>
  );
};

export default ArchiveContribution;
