import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Web3Love</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <ChakraProvider>
        <MoralisProvider
          appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
          serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
        >
          <Component {...pageProps} />
        </MoralisProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
