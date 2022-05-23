import { getAllWorkshops } from '../lib/apiUtils';

import ImageFeed from '../components/discover/ImageFeed';
import ImageFilter from '../components/discover/ImageFilter';

const Discover = ({ workshops }) => {
  return (
    <>
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
        <ImageFeed workshops={workshops} />
      </div>
    </>
  );
};

/* Retrieves workshops data from mongodb database */
export async function getServerSideProps() {
  const workshops = await getAllWorkshops();
  return { props: { workshops } };
}

export default Discover;
