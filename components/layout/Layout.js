import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children, changeLanguage, i18n }) => {
  //? how to work on dual language css
  return (
    <>
      <div>
        <Head>
          <title>Living Heritage Atlas</title>
          <meta
            name="keywords"
            content="living heritage, beirut, crafts, atlas"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <link
            href="https://use.typekit.net/fpe5llj.css"
            rel="stylesheet"
          />
        </Head>
        <Nav changeLanguage={changeLanguage} i18n={i18n} />
        <main className="main">{children}</main>
      </div>
    </>
  );
};

export default Layout;
