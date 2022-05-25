import Head from 'next/head';
import Card from '../../components/Card';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
} from '../../lib/utils';

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
      localStorage.removeItem(selection);
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
        <>
          <h2></h2>
        </>;
        break;
      case 'archive':
        break;
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
        <div className="card">
          <div className="card__cover">
            <div className="card__wrapper">
              <div className="Contribute-modal">{showModal()}</div>
              <div className="container__btn">
                <button className="btn-close" onClick={() => setModal(null)}>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {modal && (
        <div className="card">
          <div className="card__cover">
            <div className="card__wrapper">
              <div className="Contribute-modal">{showModal()}</div>
              <div className="container__btn">
                <button className="btn-close" onClick={() => setModal(null)}>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <div className="Contribute drop-shadow__black">
        <div className="Contribute-index">
          <h1>What would you like to contribute?</h1>
          <div className="Contribute-types">
            <button
              className="Contribute-type-select "
              onClick={() => setSelection('archive')}
              disabled={selection === 'archive'}
            >
              <h3>
                Contribute to <b>Archive</b>
              </h3>
              <a onClick={() => setModal('workshop')}>What is this?</a>
            </button>
            <button
              className="Contribute-type-select"
              onClick={() => setSelection('workshop')}
              disabled={selection === 'workshop'}
            >
              <h3>
                Contribute to <b>Workshops</b>
              </h3>
              <a onClick={() => setModal('workshop')}>What is this?</a>
            </button>
          </div>
          <button
            className="Contribute-type-submit"
            disabled={selection === null}
            onClick={navigateToSelection}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Contribute;
