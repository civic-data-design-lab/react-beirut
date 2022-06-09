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
            <h1>DOWNLOAD</h1>
            <p>We invite you to download data from the Living Heritage Atlas to use this data responsibly.</p>
          </div>
        </div>
        <hr />
        <div className="download-card">
          <div className="mb-5">
            <p>Craftspeople have a historic role in perpetuating cultural practices in the city through their products and workshop spaces that are sites of socializing, learning, and commerce. However, they are marginalized in every reconstruction of the city and its subsequent gentrification. Our team believes that their movements and their workshops tell key stores on the urban development of Beirut that are worth uncovering.</p>
            <p>The research team of Living Heritage Atlas | Beirut has conducted multiple data collection initiatives through interviews, desk-research, archivla research, and surveys in the field. The data collected by our team includes personal photos from craftspeople, visual material collected from libraries and private collections, and inputs received through our crowdsourcing platform, where users are invited to <a href="/contribute">contribute to this database</a>. The Living Heritage Atlas | Beirut is a unique dataset which includes:
              </p>
            <ul>
              <li>20+ interviews with local stakeholders, NGOs, government organizations, and international agencies who joined forces since the aftermath of the August 4th explosion in Beirut</li>
              <li>100+ location points of 100+ craftspeoples' workshops</li>
              <li>60+ survey responses from craftspeople</li>
              <li>600+ archival entries (both textual and visual) on craft spaces and workshops between the early 20th Century to present day</li>
            </ul>
          </div>
          <div className="mb-5">
            <h3>Craft Workshop Data</h3>
            <p>This dataset contains publicly accessible information on current local craft workshops in Beirut. Data attributes available in this download include: location (latitude and longitude), craft type, operation status, decade of year established, and whether crafts are produced on site.</p>
            <p><b>Suggested citation:</b><br/>
            MIT Civic Data Design Lab, Future Heritage Lab. <em>Living Heritage Atlas | Beirut: Archival Information</em>. Massachusetts Institute of Technology, 2022.</p>
            <button className="btn-pill">Download CSV</button>
            <button className="btn-pill">Download JSON</button>
          </div>
          <div className="mb-5">
            <h3>Archival Information Data</h3>
            <p>This dataset contains information gathered from multi-site archival research on the presence of craftsmanship in Beirut over time. Data attributes available in this download include: location (latitude and longitude), craft type, image caption, image type, year photo taken, reference source</p>
            <p><b>Suggested citation:</b><br/>
            MIT Civic Data Design Lab, Future Heritage Lab. <em>Living Heritage Atlas | Beirut: Archival Information</em>. Massachusetts Institute of Technology, 2022.</p>
            <button className="btn-pill">Download CSV</button>
            <button className="btn-pill">Download JSON</button>
          </div>
          <div className="mb-5">
            <h3>Images and Image Metadata</h3>
            <p>Images from Living Heritage Atlas | Beirut are not currently available for download, but we plan to make these available in the near future. Stay tuned for more information soon!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
