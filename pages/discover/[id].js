import { useRouter } from 'next/router';
import ImageCard from '../../components/discover/ImageCard';
import DiscoverLayout from '../../components/layout/DiscoverLayout';
import Layout from '../../components/layout/Layout';
import {
  getSimilarWorkshops,
  getWorkshop,
  getImageMeta,
} from '../../lib/apiUtils';

const CardPage = ({ workshop, similarWorkshops, imageMeta }) => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/discover', undefined, { shallow: true });
  };

  return (
    <ImageCard
      workshop={workshop}
      similarWorkshops={similarWorkshops}
      isExpanded={true}
      onClose={handleClose}
      imageMeta={imageMeta}
    />
  );
};

CardPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DiscoverLayout>{page}</DiscoverLayout>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const workshop = await getWorkshop(params.id);
  const similarWorkshops = await getSimilarWorkshops(workshop);
  const imageMeta = await getImageMeta(workshop.ID);
  return { props: { workshop, similarWorkshops, imageMeta } };
}

export default CardPage;
