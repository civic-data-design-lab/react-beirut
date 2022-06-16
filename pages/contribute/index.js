import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
} from '../../lib/utils';

import { useMediaQuery } from 'react-responsive';


const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

import i18n from "i18next";
import { Trans, useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Add an Archival Image": "Add an Archival Image"
        }
      },
      ar: {
        translation: {
            "Add an Archival Image": "أضف صورة أرشيفية"
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });


const Contribute = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selection, setSelection] = useState(null);
  const [modal, setModal] = useState(null);

  const getExistingForms = () => {
    const existingForms = {
      workshop: localStorage.getItem(WORKSHOP_CONTRIBUTION_NAME),
      archive: localStorage.getItem(ARCHIVE_CONTRIBUTION_NAME),
    };
    console.log(existingForms);
    return existingForms;
  };

  const navigateToSelection = () => {
    if (!selection) {
      return;
    }

    const existingForms = getExistingForms();
    if (existingForms[selection]) {
      setModal(`existing-${selection}-form`);
      return;
    }

    router.push(`/contribute/${selection}`);
  };

  const handleExistingFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    if (action === 'discard') {
      switch (selection) {
        case 'workshop':
          localStorage.removeItem(WORKSHOP_CONTRIBUTION_NAME);
          break;
        case 'archive':
          localStorage.removeItem(ARCHIVE_CONTRIBUTION_NAME);
          break;
        default:
          localStorage.removeItem(selection);
      }
    }
    setModal(null);
    router.push(`/contribute/${selection}`);
  };

  const showModal = () => {
    if (!modal) {
      return <></>;
    }

    switch (modal) {
      case 'existing-workshop-form':
        return (
          <div className={'card-cover'}>
    <div className={'dialogue-container'}>


        <div className={'dialogue-title'}>You have an unsubmitted workshop contribution</div>
        <button className={'close-card-btn dialogue-close-btn'} onClick={() => setModal(null)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#404044"/>
            </svg>
        </button>

        <form
            className="Contribute-existing-form"
            onSubmit={handleExistingFormSubmit}
            id="modal-options"
        >
          <label htmlFor="modal-options" className={'dialogue-content'}>
            Would you like to continue with your existing record or discard it?
          </label>
          <span className="dialogue-buttons">
            <button
                type="submit"
                name="discard"
                className="cancel-button">
              <p className={'cancel-label'}>Discard Record</p>
            </button>
            <button
                type="submit"
                name="continue"
                className="accept-button">
              <p className={'accept-label'}> Continue Record </p>
            </button>
          </span>
        </form>
    </div>
</div>



 );

      case 'existing-archive-form':
        return (
          <div className={'card-cover'}>
    <div className={'dialogue-container'}>


        <div className={'dialogue-title'}>You have an unsubmitted archive contribution</div>
        <button className={'close-card-btn dialogue-close-btn'} onClick={() => setModal(null)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#404044"/>
            </svg>
        </button>

        <form
            className="Contribute-existing-form"
            onSubmit={handleExistingFormSubmit}
            id="modal-options"
        >
          <label htmlFor="modal-options" className={'dialogue-content'}>
            Would you like to continue with your existing record or discard it?
          </label>
          <div className="dialogue-buttons">
            <button
                type="submit"
                name="discard"
                className="cancel-button">
              <p className={'cancel-label'}>Discard Record</p>
            </button>
            <button
                type="submit"
                name="continue"
                className="accept-button">
              <p className={'accept-label'}> Continue Record </p>
            </button>
          </div>
        </form>
    </div>
</div>
        );
      case 'workshop':
        return (
          <>

              <div className={'card-cover'}>
                <div className={'dialogue-container'}>


                    <div className={'dialogue-title'}> About | Ongoing Workshop Data Collection</div>
                    <button className={'close-card-btn dialogue-close-btn'} onClick={() => setModal(null)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#404044"/>
                        </svg>
                    </button>

                    <div className={'dialogue-content'}>
                        <p> The research team of the “Intangible Heritage Atlas | Crafts” has
                            conducted multiple data collections initiatives through
                            interviews, desk-research, archival research and surveys. Some
                            data gathering activities are still scheduled to happen during
                            participatory mapping workshops in late June and others will
                            continue throughout summer 2022 through our website “Contribute”
                            tab. </p>
                        <p>

                            The overall goal of our data collection strategy and methodology
                            is to maximes the inclusiveness of our data gathering methods and
                            sources. More specifically, the data collected by our team
                            includes both oral stories, persona photos from craftspeople
                            workshops but also visual material collected from libraries and
                            private collections. In light of this unique patchwork of data,
                            our team strongly believe that the “Intangible Heritage Atlas |
                            Crafts” has the potential to enrich the narrative on craftsmanship
                            in the city of Beirut and shed light onto those cultural practices
                            that do not usually make it to relevant policy decisions and
                            documents.
                        </p>
                    </div>
                </div>
              </div>
          </>

        );
      case 'archive':
        return (
          <>

              <div className={'card-cover'}>
                <div className={'dialogue-container'}>


                    <div className={'dialogue-title'}> About | Ongoing Workshop Data Collection</div>
                    <button className={'close-card-btn dialogue-close-btn'} onClick={() => setModal(null)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#404044"/>
                        </svg>
                    </button>
                    <hr/>

                    <div className={'dialogue-content'}>
                        <p> The research team of the “Intangible Heritage Atlas | Crafts” has
                            conducted multiple data collections initiatives through
                            interviews, desk-research, archival research and surveys. Some
                            data gathering activities are still scheduled to happen during
                            participatory mapping workshops in late June and others will
                            continue throughout summer 2022 through our website “Contribute”
                            tab.
                            <br/>

                            The overall goal of our data collection strategy and methodology
                            is to maximes the inclusiveness of our data gathering methods and
                            sources. More specifically, the data collected by our team
                            includes both oral stories, persona photos from craftspeople
                            workshops but also visual material collected from libraries and
                            private collections. In light of this unique patchwork of data,
                            our team strongly believe that the “Intangible Heritage Atlas |
                            Crafts” has the potential to enrich the narrative on craftsmanship
                            in the city of Beirut and shed light onto those cultural practices
                            that do not usually make it to relevant policy decisions and
                            documents.
                        </p>
                    </div>
                </div>
              </div>
          </>
        );
      default:
        return <></>;
    }
  };


  return (
    <>
      <Head>

        <title>Contribute | Living Heritage Atlas</title>

      </Head>


      {modal && showModal()}
      <div className={'Contribute-container'}>
          <div className="Contribute drop-shadow__black">
          <div className={'Contribute-index'}>
            <div className={'Contribute-landing-text-container'}>

              <div className={'contribute-landing-text-section'}>
                <h1 className={'Contribute-landing-title'}>Contribute to the Living Heritage Atlas!</h1>
                <p className={'Contribute-landing-text'}>Add a current craft workshop or upload an archival image to the database.</p>
                <a className={'Contribute-info-link'} onClick={() => setModal('archive')}>What is this?</a>
              </div>

            <div className="Contribute-types">
              <button
                className="Contribute-type-select "
                onClick={() => setSelection('archive')}
                disabled={selection === 'archive'}
              >
                  <Trans i18nKey="addArchiveImage">
                      <h3> <b>{t('Add an Archival Image')}</b> </h3>
                  </Trans>

              </button>
              <div className={'Contribute-landing-divider'}><hr className={'half-hr'}/><p>or</p><hr className={'half-hr'}/></div>
              <button
                className="Contribute-type-select"
                onClick={() => setSelection('workshop')}
                disabled={selection === 'workshop'}
              >
                <h3>
                  Add a <b>Craft Workshop</b>
                </h3>
              </button>
            </div>
              <div className={'Contribute-type-submit-container'}>
                <button
              className="Contribute-type-submit"
              disabled={selection === null}
              onClick={navigateToSelection}
            >
              Next
            </button>
              </div>

              </div>
          </div>

            <Desktop>
              <div className="Contribute-index">
            <div className={'Contribute-image'}></div>
          </div>
            </Desktop>

        </div>
      </div>

    </>
  );
};

export default Contribute;
