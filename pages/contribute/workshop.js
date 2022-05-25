import Head from 'next/head';
import { useState } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';

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
    console.log(data);
    const updatedFormData = { ...form, ...data };
    setForm(updatedFormData);
    localStorage.setItem(
      CONTRIBUTION_FORM_NAME,
      JSON.stringify(updatedFormData)
    );
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
