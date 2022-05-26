import { getAllWorkshops } from '../lib/apiUtils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ImageFeed from '../components/discover/ImageFeed';
import ImageFilter from '../components/discover/ImageFilter';

const Discover = ({ workshops }) => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const { show } = router.query;
    if (!show) {
      setSelectedCard(null);
      return;
    }

    const card = workshops.find((w) => w.ID === show);
    if (!card) {
      // No card matches that ID
      setSelectedCard(null);
      return;
    }

    setSelectedCard(show);
  }, [router.query.show]);

  const handleExpand = (id) => {
    router.push(`/discover?show=${id}`, undefined, { shallow: true });
  };

  const resetSelected = () => {
    router.push(`/discover`, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>Discover | Intangible Heritage Atlas</title>
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1>DISCOVER</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <ImageFilter />
        </div>
        <hr />
        <ImageFeed
          workshops={workshops}
          selectedCard={selectedCard}
          onCloseCard={resetSelected}
          onExpandCard={handleExpand}
        />
      </div>
    </>
  );
};

/* Retrieves workshops data from mongodb database */
export async function getStaticProps() {
  const workshops = await getAllWorkshops();
  return { props: { workshops } };
}

export default Discover;
