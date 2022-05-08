import { ethers, UnsignedTransaction, VoidSigner } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { File, NFTStorage } from "nft.storage";
const API_KEY = process.env.NEXT_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: API_KEY! });
import nftContractAbi from "@/nftContractAbi.json";

async function storeNft(
  image: Blob,
  recipientAddress: string,
  message: string,
  type: string
) {
  const nft = {
    image,
    name: "Web3Love Card",
    description:
      "Send web3Cards to your favourite person. Stored on-chain, forever.",
    properties: {
      recipient: recipientAddress,
      message,
      type,
    },
  };

  return await client.store(nft);
}

type Request = {
  recipient: string;
  /** Who will be signing the message */
  signer: string;
  message: string;
  /** ImageId to use */
  imageId: string;
};

const imageUrls: {
  [key: string]: string;
} = {
  mothersDay: "mothers-day.jpeg",
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;

  const voidSigner = new VoidSigner(body.signer);
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_NFT_CONTRACT!,
    nftContractAbi.abi,
    voidSigner
  );

  if (!body.recipient || !body.message) {
    return res.status(400).json({
      error: "Bad request",
      body,
    });
  }

  const image = await fetch("/images/cards/" + imageUrls[body.imageId]).then(
    (r) => r.blob()
  );

  try {
    const metadata = await storeNft(
      image,
      body.recipient,
      body.message,
      body.imageId
    );
    const transactionRequest = await contract.populateTransaction.safeMint([
      body.recipient,
      metadata.url,
    ]);

    const unsignedTransaction =
      ethers.utils.serializeTransaction(transactionRequest);

    return res.status(201).json({
      success: true,
      unsignedTransaction,
      metadata,
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};
