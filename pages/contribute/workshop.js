import Head from 'next/head';
import { useState } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import BooleanLabelForm from '../../components/contribution/BooleanButtonForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';
import { CRAFT_DISCIPLINES } from '../../lib/utils';

console.log(CRAFT_DISCIPLINES)

const CONTRIBUTION_FORM_NAME = 'workshop_contribution';

const WorkshopContribution = () => {
  const [form, setForm] = useState({
    location: { adm1: 'hi' },
    survey_origin: 'ongoing_contribution',
  });
  
  const onSubmit = () => {
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
      localStorage.setItem(
        CONTRIBUTION_FORM_NAME,
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
          onSubmit={onSubmit}
          requiredFields={[[], ['street', 'municipality'], []]}
          formData={form}
        >
          {/* Gatlen's Type Selector START */}
          <BooleanLabelForm
            onUpdate={updateForm}
            formData={form}
            dataLocation="craft_discipline"
            title="Craft Discipline"
            label="What catogories does the craftshop produce?"
            buttonNames={CRAFT_DISCIPLINES}
            hasOtherField={true}
          />
          {/* Gatlen's Type Selector END */}
          <ImageUploadForm
            onUpdate={updateForm}
            formData={form}
            title="Workshop Image Upload"
            label="Upload an image of the workshop"
          />
          <LocationForm onUpdate={updateForm} formData={form} />
          <Preview formData={form} />
        </MultipageForm>
      </div>
    </>
  );
};

export default WorkshopContribution;
