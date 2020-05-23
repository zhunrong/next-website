import React from "react";
import { AppProps } from "next/app";
import "../assets/styles/index.scss";
import "antd/dist/antd.css";
// import 'draft-js/dist/Draft.css'
import "braft-editor/dist/index.css";
import "braft-editor/dist/output.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
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
