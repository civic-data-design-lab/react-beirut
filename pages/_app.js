import Layout from '../components/layout/Layout';
import '../styles/globals.scss';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { TRANSLATIONS } from '../lib/utils';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Head } from 'next/document';

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector) // Registering the detection plugin
  .init(TRANSLATIONS);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (navigator.cookieEnabled) {
      const language = localStorage.getItem('language');
      if (language) {
        i18n.changeLanguage(language);
        document.dir = i18n.dir();
        setLanguage(language);
      }
    }

    // window.addEventListener('contextmenu', (event) => event.preventDefault());

    // // cleanup this component
    // return () => {
    //   window.removeEventListener('contextmenu', (event) =>
    //     event.preventDefault()
    //   );
    // };
  }, []);

  const [language, setLanguage] = useState(null);
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguage(language);
    localStorage.setItem('language', i18n.language);
  };

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

  useEffect(() => {});

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=places`}
      ></Script>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

      <Layout changeLanguage={changeLanguage} lang={language} i18n={i18n}>
        <Component
          {...pageProps}
          changeLanguage={changeLanguage}
          lang={language}
          i18n={i18n}
        />
      </Layout>
    </>
  );
}

export default MyApp;
