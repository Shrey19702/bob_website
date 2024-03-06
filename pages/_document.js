import Document, { Html, Head, Main, NextScript } from 'next/document'
import { SpeedInsights } from "@vercel/speed-insights/next"
// import Script from 'next/script'
class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <title>Groceries store</title>
                    <meta  />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <SpeedInsights />
                </body>
            </Html>
        );
    }
}

export default MyDocument