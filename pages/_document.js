import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>

        {/* Import adobe fonts */}
        <link
          rel='stylesheet'
          href='https://use.typekit.net/fpe5llj.css'
        ></link>
      </Html>
    )
  }
}

export default MyDocument
