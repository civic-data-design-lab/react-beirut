import '../css/style.css';
import '../css/form.css';
import Head from 'next/head';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Project Title</title>
      </Head>
      <div className="">
        <Component {...pageProps} />
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Link href="/discover">Discover</Link>
          <Link href="/trace">Trace</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/contribute">Contribute</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </>
  );
}

export default MyApp;
