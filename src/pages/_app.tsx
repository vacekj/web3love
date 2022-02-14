import { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import '@/styles/globals.css';

import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
        />
      </Head>
      <MoralisProvider
        appId='KQWivZ5GLgs4hqVJbrBmwECgm4Zv5O4ifgCBMjst'
        serverUrl='https://5u4vllqzdjdb.usemoralis.com:2053/server'
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}

export default MyApp;
