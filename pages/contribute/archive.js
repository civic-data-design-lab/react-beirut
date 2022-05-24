import { useState, useEffect } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';
import Head from 'next/head';

const CONTRIBUTION_FORM_NAME = 'archive_contribution';

const ArchiveContribution = () => {
  const [form, setForm] = useState({
    location: { adm1: 'hi' },
    survey_origin: 'ongoing_contribution',
  });

  useEffect(() => {
    // Load the form data from localstorage
    const formData = JSON.parse(localStorage.getItem(CONTRIBUTION_FORM_NAME));
    if (formData) {
      setForm(formData);
    }
  }, []);

  const updateForm = (data) => {
    console.log(data);
    const updatedFormData = { ...form, ...data };
    setForm(updatedFormData);
    localStorage.setItem(
      CONTRIBUTION_FORM_NAME,
      JSON.stringify(updatedFormData),
    );
  };

  const onSubmit = () => {
    const data = {};
    fetch('/api/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Clear local storage
        localStorage.removeItem(CONTRIBUTION_FORM_NAME);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Head>
        <title>Archive Contribution | Intangible Heritage Atlas</title>
      </Head>
      <div className='container'>
        <p>ArchiveContribution</p>
        <MultipageForm
          onSubmit={onSubmit}
          requiredFields={[[], ['street', 'municipality'], []]}
          formData={form}
        >
          <ImageUploadForm onUpdate={updateForm} formData={form} />
          <LocationForm onUpdate={updateForm} formData={form} />
          <Preview />
        </MultipageForm>
      </div>
    </>
  );
};

export default ArchiveContribution;
