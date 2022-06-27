import Layout from '../components/layout/Layout';
import '../styles/globals.scss';
import {useEffect, useState} from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

import LngDetector from 'i18next-browser-languagedetector';

import {TRANSLATIONS} from "../lib/utils";

import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(TRANSLATIONS);



function MyApp({ Component, pageProps }) {

  const [language, setLanguage] = useState(null);
  const changeLanguage = (language)=> {
    console.log(language)
    i18n.changeLanguage(language);
    setLanguage(language)

  }
  
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
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
        <Component {...pageProps} changeLanguage={changeLanguage} lang={language} i18n={i18n} />
    </Layout>
    </>
  );
}

export default MyApp;
