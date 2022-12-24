import { useRouter } from 'next/router';
import ImageCard from '../../components/discover/ImageCard';
import DiscoverLayout from '../../components/layout/DiscoverLayout';
import Layout from '../../components/layout/Layout';
import {
  getSimilarWorkshops,
  getImageMeta,
  getWorkshopOrArchive,
  getSimilarArchives,
} from '../../lib/apiUtils';

const CardPage = ({
  object,
  type,
  similarWorkshops,
  imageMetas,
  lang,
  i18n,
}) => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/discover', undefined, { shallow: false, scroll: false });
  };

  return (
    <ImageCard
      object={object}
      type={type}
      similarWorkshops={similarWorkshops}
      isExpanded={true}
      onClose={handleClose}
      imageMetas={imageMetas}
      lang={lang}
      i18n={i18n}
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
  const { object, type } = await getWorkshopOrArchive(params.id);

  let similarWorkshops = [];
  if (type === 'workshop') {
    similarWorkshops = await getSimilarWorkshops(object);
  } else if (type === 'archive') {
    similarWorkshops = await getSimilarArchives(object);
  }
  const imageMetas = await getImageMeta(object.ID);
  return {
    props: { object, type, similarWorkshops, imageMetas },
  };
}

export default CardPage;
