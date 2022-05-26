import { useRouter } from 'next/router';
import Card from '../../../components/Card';
import ImageCard from '../../../components/discover/ImageCard';
import { getWorkshop, getAllWorkshops } from '../../../lib/apiUtils';

const imageDetail = ({ workshop }) => {
  // Parse workshop info
  const workshopParsed = JSON.parse(workshop);
  const name = workshopParsed.shop_name.content_orig;
  const craftCategory = workshopParsed.craft_discipline_category;
  const imgIDList = workshopParsed.images;

  // Close detail
  const router = useRouter();
  const handleClose = () => {
    router.push('/discover');
  };

  const cardContent = () => {
    return (
      <div className="card__content">
        <div className="card__item">
          <div className="container__img">
            <img
              className="img__detail"
              src={`/api/images/${imgIDList[0]}.jpg`}
              alt=""
            />
          </div>
        </div>
        <div className="card__item">
          <div className="container__text">
            <div className="container__title">
              <h1>{name}</h1>
              <p className="type">{[...craftCategory]}</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
              velit interdum, ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora. onsectetur adipiscing elit. Nunc et velit
              interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
              ... <b>Read More</b>
            </p>
          </div>
          <div className="container__map">
            <p>See it on map</p>
            <div className="img__map"></div>
          </div>
          <div className="container__suggestion">
            <p>Explore similar shops</p>
            <div className="wrapper">
              <div className="image-container">
                <ImageCard workshop={workshopParsed} />
              </div>
              <div className="image-container">
                <ImageCard workshop={workshopParsed} />
              </div>
              <div className="image-container">
                <ImageCard workshop={workshopParsed} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      1
      <Card
        cardContent={cardContent()}
        ifShowCardOrg
        handleClose={handleClose}
      />
    </>
  );
};

// getStaticPaths -> dynamically generate url => much faster
// combine use with getStaticProps instead of getServerSideProps
export async function getStaticProps(context) {
  const workshopRes = await getWorkshop(context.params.id);
  const workshop = JSON.stringify(workshopRes);
  return {
    props: {
      workshop,
    },
  };
}

export const getStaticPaths = async () => {
  const workshops = await getAllWorkshops();

  // format the res
  const ids = workshops.map((workshops) => workshops.ID);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false, // if try to access non-existing, return 404
  };
};

export default imageDetail;
