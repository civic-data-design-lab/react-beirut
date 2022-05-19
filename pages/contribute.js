import Head from 'next/head';

const Contribute = () => {
  const saveNewWorkshop = () => {
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
    });
  };

  return (
    <>
      <Head>
        <title>Contribute | Project Title</title>
      </Head>
      <div>
        Contribute
        <button onClick={saveNewWorkshop}>Create new workshop</button>
      </div>
    </>
  );
};

export default Contribute;
