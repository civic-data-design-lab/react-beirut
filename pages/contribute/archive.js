import { useState, useEffect } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';
import Head from 'next/head';
import { ARCHIVE_CONTRIBUTION_NAME } from '../../lib/utils';
import ArchiveAboutForm from '../../components/contribution/ArchiveAboutForm';

const ArchiveContribution = () => {
  const [form, setForm] = useState({
    survey_origin: ARCHIVE_CONTRIBUTION_NAME,
  });

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
    return; // FIXME: Temp disable submit

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
          name={ARCHIVE_CONTRIBUTION_NAME}
          formData={form}
          requiredFields={[[], ['street', 'municipality'], []]}
          onUpdate={updateForm}
          onSubmit={onSubmit}
        >
          <ImageUploadForm
            onUpdate={updateForm}
            formData={form}
            title="Archive Image Upload"
            label="Upload an image of the archival information"
          />
          <ArchiveAboutForm
            onUpdate={updateForm}
            formData={form}
          />
          <LocationForm onUpdate={updateForm} formData={form} />
          <Preview formData={form} />
        </MultipageForm>
      </div>
    </>
  );
};

export default ArchiveContribution;
