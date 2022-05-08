import abi from "@/nftContractAbi.json";
import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import { useAccount, useContractRead, useNetwork } from "wagmi";

export function useTotalCards() {
  return useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
      contractInterface: abi.abi,
    },
    "totalSupply",
  );
}

export function useCardNftsOfAddress(address: string) {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const result = useNFTBalances({
    address: account?.address,
    // @ts-ignore
    chain: `0x${activeChain?.id.toString(16)}`,
    token_addresses: [process.env.NEXT_PUBLIC_NFT_CONTRACT!],
  });

  /* When the user logs in or changes chain, refresh NFTs */
  useEffect(() => {
    if (account?.address) {
      result.getNFTBalances();
    }
  }, [account, activeChain]);

  return result;
}
