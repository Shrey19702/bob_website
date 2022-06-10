import '../styles/globals.css'
import Layout from '../components/Layout'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BoB the Builder</title>
      </Head>
      <SessionProvider session={ pageProps.session }>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
    
  )
}

export default MyApp
