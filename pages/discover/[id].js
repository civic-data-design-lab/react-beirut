import ImageCard from '../../components/discover/ImageCard';
import DiscoverLayout from '../../components/layout/DiscoverLayout';
import Layout from '../../components/layout/Layout';
import { getWorkshop } from '../../lib/apiUtils';

const CardPage = ({ workshop }) => {
  const handleClose = () => {
    window.history.back();
  };

  return (
    <ImageCard workshop={workshop} isExpanded={true} onClose={handleClose} />
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
  return { props: { workshop } };
}

export default CardPage;
