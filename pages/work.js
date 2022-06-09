import Head from 'next/head';

const WorkPage = () => {
  return (
    <>
      <Head>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8WP8TMP9M0"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8WP8TMP9M0');
        </script>
        <title>Work | Intangible Heritage Atlas</title>
      </Head>

      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1>Work</h1>
            <p>Work with our data.</p>
          </div>
        </div>
        <hr />
        <div className="container">
          <div>
            <h3>Workshops Information</h3>
            <button className="btn-pill">Download as CSV</button>
            <button className="btn-pill">Download as JSON</button>
          </div>
          <div>
            <h3>Archives Information</h3>
            <button className="btn-pill">Download as CSV</button>
            <button className="btn-pill">Download as JSON</button>
          </div>
          {/* <div>
            <h3>Image Metas</h3>
            <button className="btn-pill">Download as CSV</button>
            <button className="btn-pill">Download as JSON</button>
          </div>
          <div>
            <h3>Images</h3>
            <button className="btn-pill">Download ZIP Folder</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default WorkPage;
