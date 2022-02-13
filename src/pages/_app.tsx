import { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId="KQWivZ5GLgs4hqVJbrBmwECgm4Zv5O4ifgCBMjst"
      serverUrl="https://5u4vllqzdjdb.usemoralis.com:2053/server"
    >
      <Component {...pageProps} />;
    </MoralisProvider>
  );
}

export default MyApp;
