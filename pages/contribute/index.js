import Head from 'next/head';
import Card from '../../components/Card';
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


const Contribute = () => {
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
          <>
            <h2>You have an unsubmitted workshop contribution</h2>

            {/* TODO: Show preview here */}
            {/* <code>{getExistingForms()['workshop']}</code> */}

            <form
              className="Contribute-existing-form"
              onSubmit={handleExistingFormSubmit}
              id="modal-options"
            >
              <label htmlFor="modal-options">
                Would you like to continue with your existing record or discard
                it?
              </label>
              <span className="Contribute-modal-options">
                <button
                  type="submit"
                  name="discard"
                  className="btn-pill secondary"
                >
                  Discard Record
                </button>
                <button type="submit" name="continue" className="btn-pill">
                  Continue Record
                </button>
              </span>
            </form>
          </>
        );

      case 'existing-archive-form':
        return (
          <>
            <h2>You have an unsubmitted archive contribution</h2>

            {/* TODO: Show preview here */}
            {/* <code>{getExistingForms()['workshop']}</code> */}

            <form
              className="Contribute-existing-form"
              onSubmit={handleExistingFormSubmit}
              id="modal-options"
            >
              <label htmlFor="modal-options">
                Would you like to continue with your existing record or discard
                it?
              </label>
              <span className="Contribute-modal-options">
                <button
                  type="submit"
                  name="discard"
                  className="btn-pill secondary"
                >
                  Discard Record
                </button>
                <button type="submit" name="continue" className="btn-pill">
                  Continue Record
                </button>
              </span>
            </form>
          </>
        );
      case 'workshop':
        return (
          <>
            {/* TODO: Update this */}
            <h2>
              <b>About</b> | Ongoing Workshop Data Collection
            </h2>
            <p>
              The research team of the “Intangible Heritage Atlas | Crafts” has
              conducted multiple data collections initiatives through
              interviews, desk-research, archival research and surveys. Some
              data gathering activities are still scheduled to happen during
              participatory mapping workshops in late June and others will
              continue throughout summer 2022 through our website “Contribute”
              tab.
            </p>
            <br />
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
          </>
        );
      case 'archive':
        return (
          <>
            {/* TODO: Update this */}
            <h2>
              <b>About</b> | Ongoing Archival Information Collection
            </h2>
            <p>
              The research team of the “Intangible Heritage Atlas | Crafts” has
              conducted multiple data collections initiatives through
              interviews, desk-research, archival research and surveys. Some
              data gathering activities are still scheduled to happen during
              participatory mapping workshops in late June and others will
              continue throughout summer 2022 through our website “Contribute”
              tab.
            </p>
            <br />
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
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>Contribute | Intangible Heritage Atlas</title>
      </Head>
      {modal && (
        <Card handleClose={() => setModal(null)}>
          <div className="card__content slide-up">{showModal()}</div>
        </Card>
      )}
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
                <h3>
                  Add an <b>Archival Image</b>
                </h3>
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
