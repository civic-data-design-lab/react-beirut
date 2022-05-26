import { useState, useEffect } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';
import Head from 'next/head';
import { ARCHIVE_CONTRIBUTION_NAME } from '../../lib/utils';
import ArchiveAboutForm from '../../components/contribution/ArchiveAboutForm';

// Required fields for each page
// 0: Image Upload
// 1: About
// 2: Location
const REQUIRED_FIELDS = [
  ['imageData'],
  ['imageType', 'referenceName'],
  ['municipality', 'lat', 'lng'],
];

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
          pageTitles={[
            'Archive Upload',
            'About',
            'Location Information',
            'Preview',
          ]}
          formData={form}
          requiredFields={REQUIRED_FIELDS}
          onUpdate={updateForm}
          onSubmit={onSubmit}
        >
          <ImageUploadForm
            onUpdate={updateForm}
            formData={form}
            title="Archive Image Upload"
            label="Upload an image of the archival information"
            requiredFields={REQUIRED_FIELDS[0]}
          />
          <ArchiveAboutForm
            onUpdate={updateForm}
            formData={form}
            requiredFields={REQUIRED_FIELDS[1]}
          />
          <LocationForm
            onUpdate={updateForm}
            formData={form}
            requiredFields={REQUIRED_FIELDS[2]}
          />
          <Preview formData={form} />
        </MultipageForm>
      </div>
    </>
  );
};

export default ArchiveContribution;
