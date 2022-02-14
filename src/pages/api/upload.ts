import type { NextApiRequest, NextApiResponse } from 'next';
import { NFTStorage } from 'nft.storage';

const API_KEY = process.env.NEXT_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: API_KEY! });

async function storeNft(
  image: Blob,
  recipientAddress: string,
  message: string
) {
  const nft = {
    image,
    name: 'Web3Love Letter',
    description:
      "Give the gift of web3 this Valentine's day to your favourite person",
    properties: {
      recipient: recipientAddress,
      message,
    },
  };

  return await client.store(nft);
}

type Request = {
  recipient: string;
  message: string;
  image: Blob;
};

/* Takes an image and NFT metadata
 * and uploads both to IPFS via Infura
 * Returns an object with the NFT metadata that now includes the JPEG IPFS Link */
export default (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;
  if (!body.recipient || !body.image || !body.message) {
    return res.status(400).json({
      error: 'Bad request',
    });
  }

  const metadata = storeNft(body.image, body.recipient, body.message);
  return res.status(201).json(metadata);
};
