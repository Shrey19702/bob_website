import Document, { Html, Head, Main, NextScript } from 'next/document'
// import Script from 'next/script'
class MyDocument extends Document {
    render() {
        const router = useRouter();
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
                </body>
            </Html>
        );
    }
}

export default MyDocument