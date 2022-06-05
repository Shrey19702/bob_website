import '../styles/globals.css'
import Layout from '../components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>BoB the Builder</title>
        <meta name='keywords' content='web development, programming' />
        <script src="https://kit.fontawesome.com/c80561e6bf.js" crossorigin="anonymous"></script>
      </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
    
  )
}

export default MyApp
