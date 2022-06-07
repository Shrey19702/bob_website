import Document, {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'
class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <Script src="https://kit.fontawesome.com/c80561e6bf.js"/>
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