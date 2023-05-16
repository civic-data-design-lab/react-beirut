import Head from 'next/head';
import Schedule from '../components/about/schedule';
import { useTranslation } from 'next-i18next';

const About = ({ i18n }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>About | Living Heritage Atlas</title>
      </Head>
      <div className={'about-container container'}>
        <div className={'col-4 text-container'}>
          <h3>Living Heritage Atlas</h3>
          <p>
            Living Heritage Atlas celebrates the past and present of local
            artisanship in Beirut through archival data, interviews and
            community workshops. By leveraging historical data and interactions
            with craftspeople, the Living Heritage Atlas advocates for a more
            equitable future for small local crafts businesses. This project
            recognizes the enduring vulnerability of Beirut-based craftspeople
            as they cope with the ongoing economic crisis, post-disaster
            challenges and fierce global market competition.{' '}
          </p>
          {/* <p>This project advances three key interventions:</p>
          <ol>
            <li>
              It constructs a digital archive of geolocated historic data and
              images using visual and textual materials from local archives,
              residents, and craftspeople;
            </li>
            <li>
              It implements a series of small urban interventions by
              disseminating site-specific street stickers and physical signages
              that connect physical spaces in contemporary Beirut to the
              historic images available on the Living Heritage Atlas digital
              archive;
            </li>
            <li>
              It connects stakeholders working on the topic of craftsmanship
              through community meetings, participatory mapping workshops, and
              share-your-story events on the spaces and history of craftsmanship
              in Beirut
            </li>
          </ol> */}
        </div>
        <div className={'col-8'}> image container</div>
      </div>
      <div className={'about-container'}></div>
    </>
  );
};

export default About;
