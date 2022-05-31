import Head from 'next/head';
import { useState } from 'react';
// import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import CraftDisciplineForm from '../../components/contribution/CraftDisciplineForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import WorkshopImageForm from '../../components/contribution/WorkshopImageForm';
import WorkshopAboutForm from '../../components/contribution/WorkshopAboutForm';
import Preview from '../../components/contribution/Preview';
import {
  convertWorkshopContributionToSchema,
  CRAFT_DISCIPLINES,
} from '../../lib/utils';
import { WORKSHOP_CONTRIBUTION_NAME } from '../../lib/utils';
import Card from '../../components/Card';

/**
 * Workshop Contribution Page
 * 
 * @GatlenCulp update this as changes to the fields are made
 * 
 * Pages:
 * 0. About the Workshop
 *    - shopName
 *    - yearEstablished
 *    - status
 *    - phoneNumber
 *    - email
 *    - website
 *    - socialMedia
 * 1. Workshop Location
 *    - buildingNumber
 *    - street
 *    - quarter
 *    - sector
 * 2. Craft Disciplines
 *    - type_of_craft
 *    - craft_discipline (category)
 * 3. Image Upload
 *    - image_content
 *    - imageData
 *    - caption
 * 4: Preview
 * 
 */


// Array of arrays of required fields for each page
const REQUIRED_FIELDS = [['shopName', 'status'], ['quarter', 'sector'], [], []];

const WorkshopContribution = () => {
  const [form, setForm] = useState({
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
  });
  const [dialog, setDialog] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    // Prepare the form data for submission
    const { workshop, imageMeta, imageData } =
      convertWorkshopContributionToSchema(form);

    console.log(workshop);
    console.log(imageMeta);
    console.log(imageData);

    const data = { workshop, imageMetas: [imageMeta], imageData: [imageData] };

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
        // Clear the form data
        setForm({});
        localStorage.removeItem(WORKSHOP_CONTRIBUTION_NAME);
      })
      .catch((err) => setDialog(err));
  };

  const updateForm = (data) => {
    setForm((prevForm) => {
      // console.log(data);
      // console.log('old form:', prevForm);
      const updatedFormData = { ...prevForm, ...data };
      console.log('setting form data to ', updatedFormData);

      // Update the local storage as well
      localStorage.setItem(
        WORKSHOP_CONTRIBUTION_NAME,
        JSON.stringify(updatedFormData)
      ); // This errors if cookies are disabled.
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
          pageTitles={[
            'About the Shop',
            'Location Information',
            'About the Craft',
            'Image Upload',
            'Preview',
          ]}
          requiredFields={REQUIRED_FIELDS}
          formData={form}
          onUpdate={updateForm}
          onSubmit={onSubmit}
          submitted={submitted}
        >
          <WorkshopAboutForm
            title="About the Craft Workshop"
            requiredFields={REQUIRED_FIELDS[0]}
          />
          <LocationForm requiredFields={REQUIRED_FIELDS[1]} />
          <CraftDisciplineForm
            dataLocation="craft_discipline"
            title="Craft Discipline"
            label="What type of crafts are produced in this workshop?"
            defaultTags={CRAFT_DISCIPLINES}
            requiredFields={REQUIRED_FIELDS[2]}
            hasOtherField={true}
          />
          {/* <BooleanButtonForm
            onUpdate={updateForm}
            formData={form}
            dataLocation="craft_discipline"
            title="Craft Discipline"
            label="What type of crafts are produced in this workshop?"
            defaultTags={CRAFT_DISCIPLINES}
            requiredFields={REQUIRED_FIELDS[2]}
            hasOtherField={true}
          /> */}
          <WorkshopImageForm
            title="Craft Workshop Image Upload"
            label="Upload an image of the craft workshop"
            requiredFields={REQUIRED_FIELDS[3]}
          />
          <Preview />
        </MultipageForm>
      </div>
    </>
  );
};

export default WorkshopContribution;
