import Head from 'next/head';
import Link from 'next/link';

const Contribute = () => {
  return (
    <>
      <Head>
        <title>Contribute | Intangible Heritage Atlas</title>
      </Head>
      <div>contribute</div>
      <Link href="/contribute/archive">
        <a>Archive</a>
      </Link>
      <Link href="/contribute/workshop">
        <a>Workshop</a>
      </Link>
    </>
  );
};

export default Contribute;
