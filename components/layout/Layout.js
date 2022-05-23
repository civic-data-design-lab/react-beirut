import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => {
  //? how to work on dual language css
  return (
    <>
      <div>
        <Head>
          <title>Intangible Heritage Atlas</title>
          <meta
            name='keywords'
            content='intangible heritage, beirut, crafts, atlas'
          />
          <link
            href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
            rel='stylesheet'
          />
        </Head>
        <Nav />
        <main className='main'>{children}</main>
      </div>
    </>
  );
};

export default Layout;
