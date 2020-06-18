import React, { FunctionComponent, PropsWithChildren } from 'react';
import Head from 'next/head';

export interface PageLayoutProps extends PropsWithChildren<unknown> {
  docTitle?: string;
  className?: string;
}
const PageLayout: FunctionComponent<PageLayoutProps> = (props) => {
  const { docTitle = "zhunrong's site", children, className } = props;
  return (
    <div className={className}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          key="viewport"
        />
        <title>{docTitle}</title>
      </Head>
      {children}
    </div>
  );
};

export default PageLayout;
