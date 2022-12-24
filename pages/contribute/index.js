import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
} from '../../lib/utils';

import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

import { Trans, useTranslation } from 'react-i18next';
import Dialogue from '../../components/contribution/general/Dialogue';

const Contribute = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selection, setSelection] = useState(null);
  const [modal, setModal] = useState(null);
  const [cookiesEnabled, setCookiesEnabled] = useState(null);
  const [showCookiesModal, setShowCookiesModal] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    handleResize();
    setCookiesEnabled(navigator.cookieEnabled);
    if (!navigator.cookieEnabled) {
      setShowCookiesModal(true);
    }
    window.addEventListener('resize', handleResize);
    // unmount cleanup handler
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    return setWidth(window.innerWidth);
  };

  const getExistingForms = () => {
    const existingForms = {
      workshop: localStorage.getItem(WORKSHOP_CONTRIBUTION_NAME),
      archive: localStorage.getItem(ARCHIVE_CONTRIBUTION_NAME),
    };
    return existingForms;
  };

  const navigateToSelection = () => {
    if (!selection) {
      return;
    }

    if (cookiesEnabled) {
      const existingForms = getExistingForms();
      if (existingForms[selection]) {
        setModal(`existing-${selection}-form`);
        return;
      }
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
          let storedNumWorkshop = localStorage.getItem('numImageFormWorkshop');
          if (storedNumWorkshop)
            localStorage.removeItem('numImageFormWorkshop');
          break;
        case 'archive':
          localStorage.removeItem(ARCHIVE_CONTRIBUTION_NAME);
          let storedNumArchive = localStorage.getItem('numImageFormArchive');
          if (storedNumArchive) localStorage.removeItem('numImageFormArchive');
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
              <div className={'dialogue-title'}>
                {t('You have an unsubmitted workshop contribution')}
              </div>
              <button
                className={'close-card-btn dialogue-close-btn'}
                onClick={() => setModal(null)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                    fill="#404044"
                  />
                </svg>
              </button>

              <form
                className="Contribute-existing-form"
                onSubmit={handleExistingFormSubmit}
                id="modal-options"
              >
                <label htmlFor="modal-options" className={'dialogue-content'}>
                  {t(
                    'Would you like to continue with your existing record or discard it?'
                  )}
                </label>
                <span className="dialogue-buttons">
                  <button
                    type="submit"
                    name="discard"
                    className="cancel-button"
                  >
                    <p className={'cancel-label'}>{t('Discard Record')}</p>
                  </button>
                  <button
                    type="submit"
                    name="continue"
                    className="accept-button"
                  >
                    <p className={'accept-label'}> {t('Continue Record')} </p>
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
              <div className={'dialogue-title'}>
                {t('You have an unsubmitted archive contribution')}
              </div>
              <button
                className={'close-card-btn dialogue-close-btn'}
                onClick={() => setModal(null)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                    fill="#404044"
                  />
                </svg>
              </button>

              <form
                className="Contribute-existing-form"
                onSubmit={handleExistingFormSubmit}
                id="modal-options"
              >
                <label htmlFor="modal-options" className={'dialogue-content'}>
                  {t(
                    'Would you like to continue with your existing record or discard it?'
                  )}
                </label>
                <div className="dialogue-buttons">
                  <button
                    type="submit"
                    name="discard"
                    className="cancel-button"
                  >
                    <p className={'cancel-label'}>{t('Discard Record')}</p>
                  </button>
                  <button
                    type="submit"
                    name="continue"
                    className="accept-button"
                  >
                    <p className={'accept-label'}> {t('Continue Record')}</p>
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
                <div className={'dialogue-title'}>Ongoing Data Collection</div>
                <button
                  className={'close-card-btn dialogue-close-btn'}
                  onClick={() => setModal(null)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                      fill="#404044"
                    />
                  </svg>
                </button>

                <div className={'dialogue-content'}>
                  <p className="text-start">
                    The{' '}
                    <b>
                      <em>Living Heritage Atlas | Beirut</em>
                    </b>{' '}
                    research team has conducted multiple data collections
                    initiatives through interviews, desk-research, archival
                    research and surveys between 2021&ndash;2022. Data collected
                    by our team includes oral stories, personal photos, and
                    archival material collected from libraries and private
                    collections.
                  </p>
                  <p className="text-start">
                    We invite you to add to the <em>Living Heritage Atlas</em>{' '}
                    database of Beirut's craft workshops and archival images. By
                    creating this database, we aim to avocate for Beirut's
                    living heritage and intangible cultural practices in policy
                    decisions and documents.
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

  const getCookiesModal = () => {
    if (!showCookiesModal) {
      return <></>;
    }
    return (
      <Dialogue
        title={'Your cookies are disabled!'}
        content={'cookies explanation'}
        accept={true}
        // cancel={true}
        acceptText={'I understand'}
        // cancelText={'Disable Cookies'}
        handleCancel={null}
        handleAccept={() => {
          setShowCookiesModal(false);
        }}
        handleClose={() => {
          setShowCookiesModal(false);
        }}
      />
    );
  };

  return (
    <>
      <Head>
        <title>Contribute | Living Heritage Atlas</title>
      </Head>

      {modal && showModal()}
      {showCookiesModal && getCookiesModal()}
      <div className={'Contribute-container'}>
        <div className="Contribute drop-shadow__black">
          <div className={'Contribute-index'}>
            <div className={'Contribute-landing-text-container'}>
              <div className={'contribute-landing-text-section'}>
                <h1 className={'Contribute-landing-title'}>
                  {t('Contribute to the Living Heritage Atlas!')}
                </h1>
                <p className={'Contribute-landing-text'}>
                  {t(
                    'Add a current craft workshop or upload an archival image to the database.'
                  )}
                </p>
              </div>

              <div className="Contribute-types">
                <button
                  className="Contribute-type-select "
                  onClick={() => setSelection('archive')}
                  disabled={selection === 'archive'}
                >
                  <Trans i18nKey="addArchiveImage">
                    <h3>
                      {' '}
                      <b>{t('Add an Archival Image')}</b>{' '}
                    </h3>
                  </Trans>
                </button>
                <div className={'Contribute-landing-divider'}>
                  <hr className={'half-hr'} />
                  <p>{t('or')}</p>
                  <hr className={'half-hr'} />
                </div>

                <button
                  className="Contribute-type-select"
                  onClick={() => setSelection('workshop')}
                  disabled={selection === 'workshop'}
                >
                  <Trans i18nKey="addCraftWorkshop">
                    <h3>
                      {' '}
                      <b>{t('Add a Craft Workshop')}</b>{' '}
                    </h3>
                  </Trans>
                </button>
              </div>
              <div className={'Contribute-type-submit-container'}>
                <button
                  className="Contribute-type-submit"
                  disabled={selection === null}
                  onClick={navigateToSelection}
                >
                  {t('Next')}
                </button>
              </div>
            </div>
          </div>

          {width > 991 ? (
            <div className={'Contribute-vr-contianer'}>
              <div className={'vr Contribute-divider'} />
            </div>
          ) : (
            <div className={'Contribute-divider-container'}>
              <hr className={'Contribute-hr'} />
            </div>
          )}

          <div className="Contribute-index">
            <div
              className={'Contribute-about Contribute-landing-text-container'}
            >
              <p className="text-start">
                The{' '}
                <b>
                  <em>Living Heritage Atlas | Beirut</em>
                </b>{' '}
                research team has conducted multiple data collections
                initiatives through interviews, desk-research, archival research
                and surveys between 2021&ndash;2022. Data collected by our team
                includes oral stories, personal photos, and archival material
                collected from libraries and private collections.
              </p>
              <p className="text-start">
                We invite you to add to the <em>Living Heritage Atlas</em>{' '}
                database of Beirut's craft workshops and archival images. By
                creating this database, we aim to avocate for Beirut's living
                heritage and intangible cultural practices in policy decisions
                and documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contribute;
