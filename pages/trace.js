import Head from 'next/head';

const Trace = () => {
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
        <title>Trace | Intangible Heritage Atlas</title>
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1>TRACE</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Trace;
