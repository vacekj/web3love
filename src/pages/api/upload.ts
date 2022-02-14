import type { NextApiRequest, NextApiResponse } from 'next';
import { NFTStorage, File } from 'nft.storage';
import { Blob } from 'buffer';

const API_KEY = process.env.NEXT_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: API_KEY! });

async function storeNft(
  image: string,
  recipientAddress: string,
  message: string
) {
  const buff = Buffer.from(image, 'base64url');

  const nft = {
    image: new File([buff], recipientAddress + '.jpeg', {
      type: 'image/jpeg',
    }),
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
  image: string;
};

/* Takes an image and NFT metadata
 * and uploads both to IPFS via Infura
 * Returns an object with the NFT metadata that now includes the JPEG IPFS Link */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;

  if (!body.recipient || !body.image || !body.message) {
    return res.status(400).json({
      error: 'Bad request',
    });
  }

  try {
    const metadata = await storeNft(body.image, body.recipient, body.message);
    return res.status(201).json(metadata);
  } catch (e) {
    return res.status(500).json(e);
  }
};
