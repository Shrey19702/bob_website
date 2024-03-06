import '../styles/globals.css'
import Layout from '../components/Layout'
import Head from 'next/head'
import { CartProvider } from "../components/Cart";
import { SessionProvider } from "next-auth/react"

import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
      <SpeedInsights route={router.pathname} />
    </>

  )
}

export default MyApp
