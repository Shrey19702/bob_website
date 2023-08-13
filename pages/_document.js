import Document, {Html, Head, Main, NextScript} from 'next/document'
// import Script from 'next/script'
class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* icon */}
                    {/* <link rel="shortcut icon" href="/logo_img.png" /> */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <title>Groceries store</title>
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