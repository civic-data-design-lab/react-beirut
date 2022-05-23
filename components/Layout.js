import Head from 'next/head'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Head>
          <title>Intangible Heritage Atlas</title>
          <meta
            name='keywords'
            content='intangible heritage, beirut, crafts, atlas'
          />
        </Head>
        <Nav />
        <main className='main'>{children}</main>
      </div>
    </>
  )
}

export default Layout
