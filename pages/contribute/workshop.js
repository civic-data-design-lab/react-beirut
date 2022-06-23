import Head from 'next/head';
import {useEffect, useState} from 'react';
import LocationForm from '../../components/contribution/general/location/LocationForm';
import MultipageForm from '../../components/contribution/general/MultipageForm';
import WorkshopCraftTypeForm from '../../components/contribution/workshop/WorkshopCraftTypeForm';
import WorkshopImageForm from '../../components/contribution/workshop/WorkshopImageForm';
import WorkshopAboutForm from '../../components/contribution/workshop/WorkshopAboutForm';
import Preview from '../../components/contribution/general/Preview';
import Dialogue from "../../components/contribution/general/Dialogue";

import {
  convertWorkshopContributionToSchema,
  WORKSHOP_CONTRIBUTION_NAME,
  REGEX_VALIDATION,
  isProperlyTruthy,
} from '../../lib/utils';
import Card from '../../components/Card';

let localStorageSize = function () {
   let _lsTotal = 0,_xLen, _x;
   for (_x in localStorage) {
   if (!localStorage.hasOwnProperty(_x)) continue;
       _xLen = (localStorage[_x].length + _x.length) * 2;
       _lsTotal += _xLen;
   }
 return  (_lsTotal / 1024).toFixed(2);
}

/**
 * Passed down to WorkshopAboutForm to display error. Passed down to MultipageForm to act as a requirement for the form.
 *
 * @param {object} formData
 * @returns {object} requirementFulfilled: boolean, errorMessage: string -
 *  Says whether the current form data passes the requirement and an error to display if not.
 */

const imageRequirement = (formData) => {
  if (!formData.images || formData.images.length<1 || (!formData.images[0].imageData || !formData.images[0].imageExtension)) {
     console.log('no formdata image detenceted');
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

const contactRequirement = (formData) => {
  // INFO: No form of contact given
  if (
    ![
      formData.phone,
      formData.email,
      formData.website,
      formData.social_media,
    ].some((contact) => contact)
  ) {
    return {
      requirementFulfilled: false,
      errorMessage: 'Business contact information required',
    };
  }

  // INFO: Check if each of the fields are valid
  let requirementFulfilled = true;
  let incorrectFields = [];

  if (!REGEX_VALIDATION.tel.test(formData.phone) && formData.phone) {
    requirementFulfilled = false;
    incorrectFields.push('Phone Number');
  }
  if (!REGEX_VALIDATION.email.test(formData.email) && formData.email) {
    requirementFulfilled = false;
    incorrectFields.push('Email');
  }
  if (!REGEX_VALIDATION.url.test(formData.website) && formData.website) {
    requirementFulfilled = false;
    incorrectFields.push('Website');
  }
  if (
    !REGEX_VALIDATION.url.test(formData.social_media) &&
    formData.social_media
  ) {
    requirementFulfilled = false;
    incorrectFields.push('Social Media');
  }

  return requirementFulfilled
    ? { requirementFulfilled: true, errorMessage: '' }
    : {
        requirementFulfilled: false,
        errorMessage: `The following fields are invalid: ${incorrectFields.join(
          ', '
        )} `,
      };
};

/*
 * Only need to provide required if required = true.
 * Only required if both enabled and true.
 *
 */
const formSchema = {
  pages: {
    about: {
      title: 'About the Craft Workshop',
      short_title: 'About the Workshop',
      custom_reqs: {
        contact_requirement: {
          function: contactRequirement,
          title: 'Business Contact Information',
        },
      },
      fields: {
        shop_name: {
          title: 'Shop Name',
          field_name: 'shop_name',
          required: true,
        },
        year_established: {
          title: 'Year Established',
          field_name: 'year_established',
        },
        status: {
          title: 'Shop Status',
          field_name: 'status',
          required: true,
        },
        phone: {
          title: 'Phone Number',
          field_name: 'phone',
        },
        email: {
          title: 'Email',
          field_name: 'email',
        },
        website: {
          title: 'Website',
          field_name: 'website',
        },
        social_media: {
          title: 'Social Media',
          field_name: 'social_media',
        },
        craft_category: {
          title: 'Craft Category',
          field_name: 'craft_category',
          required: true,
        },
        type_of_craft: {
          title: 'Type of Craft',
          field_name: 'type_of_craft',
          required: true,
        },
      },
    },
    location: {
      title: 'Craft Workshop Location',
      short_title: 'Workshop Location',
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
    image_upload: {
      title: 'Craft Workshop Image Upload',
      short_title: 'Image Upload',
      custom_reqs: {
        image_req: {
          function: imageRequirement,
          title: 'Image Upload',
        },
      },
      fields: {
        image: {
          title: 'Craft Workshop Image Upload',
          field_name: 'image',
          //required: true, Need custom function to check for now.
        },
        caption: {
          title: 'Caption',
          field_name: 'caption',
          required: true,
        },
        image_content: {
          title: 'Image Content',
          field_name: 'image_content',
          required: false,
        },
      },
    },
    preview: {
      title: 'Preview',
      fields: {
        consent: {
          title: 'Consent to Publish Data',
          field_name: 'consent',
          required: true,
        },
      },
    },
  },
};

const conditionalRequirements = [{}];

/**
 * Workshop Contribution MultipageForm
 *
 */
const WorkshopContribution = ({lang, i18n}) => {
  const [form, setForm] = useState({
    survey_origin: WORKSHOP_CONTRIBUTION_NAME
  });
  const [dialog, setDialog] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [localStorageFull, setLocalStorageFull] = useState(false);
  const [submitFail, setSubmitFail] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=> {
    const tryExistingForm = JSON.parse(localStorage.getItem(WORKSHOP_CONTRIBUTION_NAME));
    if (tryExistingForm) {
      setForm(tryExistingForm)
      console.log('existing form is true so setForm to ', tryExistingForm)
    }
  }, [])

  const handleRedirect = () => {
    setSubmitFail(false);
    setSubmitSuccess(false);
    setSubmitted(false);
    setSubmitting(false);
  }


  const onSubmit = () => {
    // Prepare the form data for submission
    const { workshop, imageMeta, imageDataOriginal } =
      convertWorkshopContributionToSchema(form, formSchema);

    const data = {
      workshop,
      imageMetas: [imageMeta],
      imageDataOriginal: [imageDataOriginal],
    };

    console.group('Database Submission');

    console.info('Here is all the data being uploaded to the server:', data);
    console.info(
      `When uploaded, your workshop will be visible at http://localhost:3000/discover/${workshop.ID}`
    );

    console.group('Find these entries on MongoDB with the filters:');
    console.info(
      `workshops: {survey_origin: '${WORKSHOP_CONTRIBUTION_NAME}', response_id: '${workshop.ID}'}`
    );
    console.info(
      `imagemetas: {from_survey: '${WORKSHOP_CONTRIBUTION_NAME}', response_id: '${workshop.ID}'}`
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

    console.log('-------------------------------------------------------------')
    console.log(data)

    console.log('stringifying data now ')
    console.log(JSON.stringify(data))
    console.log('finished stringifying')

    fetch('/api/workshops', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((data) => setDialog(data.message));
          setSubmitted(true);
          setSubmitFail(true);
          return;
        } else {
          // TODO: UNCOMMENT THESE. ONLY UNCOMMENTED FOR TESTING.
          // INFO Clear the form data
          setLocalStorageFull(false)
           setForm({});
           localStorage.removeItem(WORKSHOP_CONTRIBUTION_NAME);
           setSubmitted(true);
           setSubmitSuccess(true);
        }
        return res.json();
      })
      .catch((err) => {
        setDialog(err);
        setDialogTitle('Failed to Submit!')
        //location.href = '/contribute/workshop';

      });
  };

  const onUpdate = (data) => {
    console.log('check submit status ', )
    console.log('onUpdate called')
    console.log('printing data ', data);
    setForm((prevForm) => {
      const updatedFormData = { ...prevForm, ...data };
      console.info('setting form data to ', updatedFormData);

      if (!localStorageFull) {
      try {
          localStorage.setItem(
          WORKSHOP_CONTRIBUTION_NAME,
          JSON.stringify(updatedFormData)
        ); //!! This errors if cookies are disabled.

      } catch (e) {
          console.log(e)
        setLocalStorageFull(true)
        setDialogTitle('Ran out of local storage space!')
        setDialog("Because your browser has exceeded its storage, it can no longer "+
            "save any more additions you make to this form for you to return to later. "  +
            "Please complete this submission within this session.")
      }}
      // INFO: Update the local storage


      console.log("getting from local storage ", localStorage.getItem(WORKSHOP_CONTRIBUTION_NAME))

      return updatedFormData;
    });
    console.log( `size: ${localStorageSize()}kb`)
  };

  const showDialogContent = () => {
    return (
        <>
      <Dialogue
        title={'Failed to submit!'}
        content={dialog}
        accept={false}
        cancel={false}
        handleClose={() => setDialog(null)}
        acceptText={''}
        cancelText={''}
        handleCancel={null}
        handleAccept={null} />
          </>
    );
  };

  return (
    <>
      <Head>
        <title>Workshop Contribution | Living Heritage Atlas</title>
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
          name={WORKSHOP_CONTRIBUTION_NAME}
          formData={form}
          onUpdate={onUpdate}
          formSchema={formSchema}
          onSubmit={onSubmit}
          submitted={submitted}
          submitFail={submitFail}
          submitSuccess={submitSuccess}
          handleRedirect={handleRedirect}
          setSubmitting={setSubmitting}
          submitting={submitting}
        >
          <WorkshopAboutForm />
          <LocationForm
            mapCaption={
              'Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.'
            }
            i18n={i18n}
          />
          <WorkshopImageForm label="Upload an image of the craft workshop" />
          <Preview lang={lang} i18n={i18n}/>
        </MultipageForm>
      </div>
      </div>
    </>
  );
};

export default WorkshopContribution;
