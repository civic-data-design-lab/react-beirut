import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About | Living Heritage Atlas</title>
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1>ABOUT</h1>
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

export default About;
