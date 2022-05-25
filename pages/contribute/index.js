import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Contribute = () => {
  const router = useRouter();

  const [selection, setSelection] = useState(null);
  const [help, setHelp] = useState(null);

  const navigateToSelection = () => {
    if (selection) {
      router.push(`/contribute/${selection}`);
    }
  };

  return (
    <>
      <Head>
        <title>Contribute | Intangible Heritage Atlas</title>
      </Head>
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
              <a onClick={() => console.log('inner clicked')}>What is this?</a>
            </button>
            <button
              className="Contribute-type-select"
              onClick={() => setSelection('workshop')}
              disabled={selection === 'workshop'}
            >
              <h3>
                Contribute to <b>Workshops</b>
              </h3>
              <a>What is this?</a>
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
