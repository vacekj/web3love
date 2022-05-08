import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";

import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";

const { provider, chains } = configureChains(
  [chain.polygon, chain.localhost, chain.polygonMumbai],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()],
);

const { connectors } = getDefaultWallets({
  appName: "Web3Love",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

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
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions={true}>
          <ChakraProvider>
            <MoralisProvider
              appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
              serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
            >
              <Component {...pageProps} />
            </MoralisProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </>
  );
}

export default MyApp;
