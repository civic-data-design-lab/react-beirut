import { useState, useEffect } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';
import Head from 'next/head';
import { ARCHIVE_CONTRIBUTION_NAME } from '../../lib/utils';

const ArchiveContribution = () => {
  const [form, setForm] = useState({
    location: { adm1: 'hi' },
    survey_origin: 'ongoing_contribution',
  });

  useEffect(() => {
    // Load the form data from localstorage
    const formData = JSON.parse(
      localStorage.getItem(ARCHIVE_CONTRIBUTION_NAME)
    );
    if (formData) {
      setForm(formData);
    }
  }, []);

  const updateForm = (data) => {
    setForm((prevForm) => {
      const updatedFormData = { ...prevForm, ...data };
      console.log('setting form data to ', updatedFormData);
      localStorage.setItem(
        ARCHIVE_CONTRIBUTION_NAME,
        JSON.stringify(updatedFormData)
      );
      return updatedFormData;
    });
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
        localStorage.removeItem(ARCHIVE_CONTRIBUTION_NAME);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Head>
        <title>Archive Contribution | Intangible Heritage Atlas</title>
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
            title="Archive Image Upload"
            label="Upload an image of the archival information"
          />
          <LocationForm onUpdate={updateForm} formData={form} />
          <Preview formData={form} />
        </MultipageForm>
      </div>
    </>
  );
};

export default ArchiveContribution;
