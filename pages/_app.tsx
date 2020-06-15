import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { generateStore } from '@/store/store';
import '../assets/styles/index.scss';
import 'antd/dist/antd.css';
// import 'draft-js/dist/Draft.css'
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

function MyApp({ Component, pageProps }: AppProps) {
  const store = generateStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
