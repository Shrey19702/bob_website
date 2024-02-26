import '../styles/globals.css'
import Layout from '../components/Layout'
import Head from 'next/head'
import { CartProvider } from "../components/Cart";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Groceries Store</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </SessionProvider>
    </>

  )
}

export default MyApp
