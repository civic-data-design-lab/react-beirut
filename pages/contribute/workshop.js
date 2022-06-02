import Head from 'next/head';
import { useState } from 'react';
import LocationForm from '../../components/contribution/general/location/LocationForm';
import MultipageForm from '../../components/contribution/general/MultipageForm';
import WorkshopCraftTypeForm from '../../components/contribution/workshop/WorkshopCraftTypeForm';
import WorkshopImageForm from '../../components/contribution/workshop/WorkshopImageForm'
import WorkshopAboutForm from '../../components/contribution/workshop/WorkshopAboutForm';
import Preview from '../../components/contribution/general/Preview';
import {
  convertWorkshopContributionToSchema,
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
import { prepareWorkshopContribution } from '../../lib/utils';


// Array of arrays of required fields for each page
const REQUIRED_FIELDS = [['shopName', 'status'], ['quarter', 'sector'], ['craft_categories', 'type_of_craft'], ['consent']];

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

    // console.log(workshop);
    // console.log(imageMeta);
    // console.log(imageData);

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
      console.info('setting form data to ', updatedFormData);

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
            'About the Workshop',
            'Workshop Location',
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
          <LocationForm 
            mapCaption={"Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly."}
            requiredFields={REQUIRED_FIELDS[1]} 
          />
          <WorkshopCraftTypeForm
            onUpdate={updateForm}
            formData={form}
            dataLocation="craft_category"
            title="Craft Category"
            label="What type of crafts are produced in this workshop?"
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
