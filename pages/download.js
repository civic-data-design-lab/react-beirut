import Head from 'next/head';

const DownloadPage = () => {
  return (
    <>
      <Head>
        <title>Download | Living Heritage Atlas</title>
      </Head>

      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1>Download</h1>
            <p>Download data from the Living Heritage Atlas.</p>
          </div>
        </div>
        <hr />
        <div className="container">
          <div>
            <h3>Craft Workshop Data</h3>
            <button className="btn-pill">Download as CSV</button>
            <button className="btn-pill">Download as JSON</button>
          </div>
          <div>
            <h3>Archival Information Data</h3>
            <button className="btn-pill">Download as CSV</button>
            <button className="btn-pill">Download as JSON</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
