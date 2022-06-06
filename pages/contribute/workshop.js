import Head from 'next/head';
import { useState } from 'react';
import LocationForm from '../../components/contribution/general/location/LocationForm';
import MultipageForm from '../../components/contribution/general/MultipageForm';
import WorkshopCraftTypeForm from '../../components/contribution/workshop/WorkshopCraftTypeForm';
import WorkshopImageForm from '../../components/contribution/workshop/WorkshopImageForm';
import WorkshopAboutForm from '../../components/contribution/workshop/WorkshopAboutForm';
import Preview from '../../components/contribution/general/Preview';
import {
  convertWorkshopContributionToSchema,
  WORKSHOP_CONTRIBUTION_NAME,
  REGEX_VALIDATION,
  isProperlyTruthy,
} from '../../lib/utils';
import Card from '../../components/Card';

/**
 * Passed down to WorkshopAboutForm to display error. Passed down to MultipageForm to act as a requirement for the form.
 *
 * @param {object} formData
 * @returns {object} requirementFulfilled: boolean, errorMessage: string -
 *  Says whether the current form data passes the requirement and an error to display if not.
 */
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
    about_the_craft: {
      title: 'About the Craft',
      fields: {
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
    image_upload: {
      title: 'Craft Workshop Image Upload',
      short_title: 'Image Upload',
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
const WorkshopContribution = () => {
  const [form, setForm] = useState({
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
  });
  const [dialog, setDialog] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    // Prepare the form data for submission
    const { workshop, imageMeta, imageData } =
      convertWorkshopContributionToSchema(form, formSchema);

    // console.log(workshop);
    // console.log(imageMeta);
    // console.log(imageData);

    const data = { workshop, imageMetas: [imageMeta], imageData: [imageData] };

    console.group('Database Submission');
    console.info('Here is all the data being uploaded to the server:', data);
    console.info(
      `When uploaded, your workshop will be visible at http://localhost:3000/discover/${workshop.ID}`
    );
    console.info('Find these entries on MongoDB with the filters:');
    console.info(
      `workshops: {survey_origin: '${WORKSHOP_CONTRIBUTION_NAME}', response_id: '${workshop.ID}'}`
    );
    console.info(
      `imagemetas: {from_survey: '${WORKSHOP_CONTRIBUTION_NAME}', response_id: '${workshop.ID}'}`
    );
    console.info(
      `imagedatas: {img_id: '${data.imageMetas[0].img_id}'}`
    );
    console.groupEnd();

    fetch('/api/workshops', {
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
        setSubmitted(true);
        // TODO: UNCOMMENT THESE. ONLY UNCOMMENTED FOR TESTING.
        // INFO Clear the form data
        // setForm({});
        // localStorage.removeItem(WORKSHOP_CONTRIBUTION_NAME);
      })
      .catch((err) => setDialog(err));
  };

  const onUpdate = (data) => {
    setForm((prevForm) => {
      const updatedFormData = { ...prevForm, ...data };
      console.info('setting form data to ', updatedFormData);

      // INFO: Update the local storage
      localStorage.setItem(
        WORKSHOP_CONTRIBUTION_NAME,
        JSON.stringify(updatedFormData)
      ); //!! This errors if cookies are disabled.
      return updatedFormData;
    });
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
        <title>Workshop Contribution | Intangible Heritage Atlas</title>
      </Head>
      {dialog && (
        <Card handleClose={() => setDialog(null)}>
          <div className="card__content">{showDialogContent()}</div>
        </Card>
      )}
      <div className="Contribute drop-shadow__black">
        <MultipageForm
          name={WORKSHOP_CONTRIBUTION_NAME}
          formData={form}
          onUpdate={onUpdate}
          formSchema={formSchema}
          onSubmit={onSubmit}
          submitted={submitted}
        >
          <WorkshopAboutForm />
          <LocationForm
            mapCaption={
              'Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.'
            }
          />
          <WorkshopCraftTypeForm label="What type of crafts are produced in this workshop?" />
          <WorkshopImageForm label="Upload an image of the craft workshop" />
          <Preview/>
        </MultipageForm>
      </div>
    </>
  );
};

export default WorkshopContribution;
