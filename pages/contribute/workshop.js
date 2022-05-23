import Head from 'next/head';

const form = {
  location: { adm1: 'hi' },
  survey_origin: 'ongoing_contribution',
};

const WorkshopContribution = () => {
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

  return (
    <>
      <Head>
        <title>Workshop Contribution | Intangible Heritage Atlas</title>
      </Head>
      <div>WorkshopContribution</div>
    </>
  );
};

export default WorkshopContribution;
