import Link from 'next/link';
import { useState } from 'react';

import { useRouter } from 'next/router';
import Card from '../../../components/Card';

const imageDetail = ({ article }) => {
  const router = useRouter();
  //   const { id } = router.query
  const [ifShowCard, setShowCard] = useState(false);

  const handleClose = (ifShowCard) => {
    router.push('/discover');
  };

  const cardContent = () => {
    return (
      <div>
        <div className="container__item">
          {/* <img
            className="img__detail"
            src={`/api/images/${workshop.thumb_img_id}.jpg`}
            alt=""
          /> */}
        </div>
        <div className="container__item">
          <div className="container__text">
            <div className="container__title">
              <h1>Shop Name</h1>
              <small>Since 1948 | Metal</small>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
              velit interdum, ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora. onsectetur adipiscing elit. Nunc et velit
              interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
              ... Read More
            </p>
          </div>
          <div className="container__map">
            <p>See it on map</p>
            <div className="map"></div>
          </div>
          <div className="container__suggestion">
            <p>Explore similar shops</p>
            <div className="map"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card
        cardContent={cardContent()}
        ifShowCardOrg
        handleClose={handleClose}
      />
    </>
  );
};

// // getStaticPaths -> dynamically generate url => much faster
// // combine use with getStaticProps instead of getServerSideProps
// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `http://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );

//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://jsonplaceholder.typicode.com/posts`);

//   const articles = await res.json();

//   // format the res
//   const ids = articles.map((article) => article.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths,
//     fallback: false, // if try to access non-existing, return 404
//   };
// };

export default imageDetail;
