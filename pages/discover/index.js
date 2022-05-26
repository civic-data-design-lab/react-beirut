import React from 'react';
import DiscoverLayout from '../../components/layout/DiscoverLayout';
import Layout from '../../components/layout/Layout';

const Discover = () => {
  return <></>;
};

Discover.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DiscoverLayout>{page}</DiscoverLayout>
    </Layout>
  );
};

export default Discover;
