import React from 'react';
import Document, {
  Html,
  Head as HeadDefault,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Head from 'next/head';
import { getStore } from '@/store/store';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const store = getStore();
    const state = store.getState();
    console.log('doc');
    return (
      <Html>
        <HeadDefault />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            key="viewport"
          />
          <title>zhunrong&apos;s site</title>
        </Head>
        <body className="line-numbers">
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ =${JSON.stringify(state)}`,
            }}
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
