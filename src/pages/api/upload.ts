import { ethers, UnsignedTransaction, VoidSigner } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Blob, NFTStorage } from "nft.storage";
const API_KEY = process.env.NEXT_NFT_STORAGE_API_KEY;
import nftContractAbi from "@/nftContractAbi.json";

const client = new NFTStorage({ token: API_KEY! });
const dev = process.env.NODE_ENV !== "production";
export const server = dev
  ? "http://localhost:3000"
  : "https://web3love.vercel.app";

async function storeNft(
  image: Blob,
  recipientAddress: string,
  message: string,
  type: string
) {
  const arrayBuffer = await image.arrayBuffer();
  const nft = {
    image: new Blob([arrayBuffer]),
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
  "mothers-day": "mothers-day.jpeg",
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

  if (!imageUrls[body.imageId]) {
    return res.status(404).json({
      error: "Image not found",
      body,
    });
  }

  try {
    const image = await fetch(
      `${server}/images/cards/${imageUrls[body.imageId]}`
    ).then((r) => r.blob());

    const metadata = await storeNft(
      image,
      body.recipient,
      body.message,
      body.imageId
    );

    const transactionRequest = await contract.populateTransaction.safeMint(
      body.recipient,
      "ipfs://bafyreigqlyp4fares5ymghktqeg4udbi6kap5je5g3teiuku5jpwsyeze4/metadata.json"
    );

    const { from, ...unsignedTx } = transactionRequest;

    console.log(unsignedTx);
    const serializedTransaction = ethers.utils.serializeTransaction(unsignedTx);

    return res.status(201).json({
      success: true,
      serializedTransaction,
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};
