import Layout from '../components/layout/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
  // return (
  //   <Layout>
  //     <Component {...pageProps} />
  //   </Layout>
  // );
}

export default MyApp;
