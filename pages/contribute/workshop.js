import Head from 'next/head';
import { useState } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import BooleanLabelForm from '../../components/contribution/BooleanButtonForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';
import { CRAFT_DISCIPLINES, prepareWorkshopContribution } from '../../lib/utils';

console.log(CRAFT_DISCIPLINES);

import WorkshopAboutForm from '../../components/contribution/WorkshopAboutForm';
import { WORKSHOP_CONTRIBUTION_NAME } from '../../lib/utils';

// Array of arrays of required fields for each page
// 0: About the Workshop
// 1: Craft Disciplines
// 2: Image Upload
// 3: Preview
const REQUIRED_FIELDS = [['shopName', 'status'], [], [], []];

const WorkshopContribution = () => {
  const [form, setForm] = useState({
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
  });
  const [submitted, setSubmitted] = useState(false);
  
  const onSubmit = () => {
    // Prepare the form data for submission
    const {workshop, imageMeta, imageData} = prepareWorkshopContribution(form);

    console.log(workshop);
    console.log(imageMeta);
    console.log(imageData);
    return; // FIXME: Temp disable submit

    const data = {
      location: { adm1: 'hi' },
      survey_origin: 'ongoing_contribution',
    };

    fetch('/api/workshops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
      );
      return updatedFormData;
    });
  };

  return (
    <>
      <Head>
        <title>Workshop Contribution | Intangible Heritage Atlas</title>
      </Head>
      <div className="Contribute drop-shadow__black">
        <MultipageForm
          name={WORKSHOP_CONTRIBUTION_NAME}
          pageTitles={[
            'About the Workshop',
            'Craft Disciplines',
            'Image Upload',
            'Preview',
          ]}
          requiredFields={REQUIRED_FIELDS}
          formData={form}
          onUpdate={updateForm}
          onSubmit={onSubmit}
        >
          <WorkshopAboutForm
            onUpdate={updateForm}
            formData={form}
            title="About the Workshop"
            requiredFields={REQUIRED_FIELDS[0]}
          />
          {/* Gatlen's Type Selector START */}
          <BooleanLabelForm
            onUpdate={updateForm}
            formData={form}
            dataLocation="craft_discipline"
            title="Craft Discipline"
            label="What catogories does the craftshop produce?"
            buttonNames={CRAFT_DISCIPLINES}
            requiredFields={REQUIRED_FIELDS[1]}
            hasOtherField={true}
          />
          {/* Gatlen's Type Selector END */}
          <LocationForm
            onUpdate={updateForm}
            formData={form}
            requiredFields={REQUIRED_FIELDS[2]}
          />
          <ImageUploadForm
            onUpdate={updateForm}
            formData={form}
            title="Workshop Image Upload"
            label="Upload an image of the workshop"
            requiredFields={REQUIRED_FIELDS[3]}
          />
          <Preview formData={form} />
        </MultipageForm>
      </div>
    </>
  );
};

export default WorkshopContribution;
