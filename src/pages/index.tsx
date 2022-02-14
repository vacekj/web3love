import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ConnectButton from '@/components/ConnectButton';
import { useApiContract, useMoralis, useNFTBalances } from 'react-moralis';
import SendMessage from '@/components/SendMessage';
import abi from '../nftContractAbi';
import CanvasDraw from 'react-canvas-draw';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

export default function HomePage() {
  const canvas = useRef<ReactSketchCanvasRef | null>(null);
  const { user } = useMoralis();

  const { getNFTBalances, data } = useNFTBalances({
    chain: 'polygon',
    // address: '0x72B6Dc1003E154ac71c76D3795A3829CfD5e33b9',
  });
  useEffect(() => {
    getNFTBalances();
    address.current = user?.get('ethAddress');
  }, [user]);
  const address = useRef<string | null>();

  const { data: nftData, runContractFunction: mintNft } = useApiContract({
    address: '0x72B6Dc1003E154ac71c76D3795A3829CfD5e33b9',
    functionName: 'mint',
    abi,
    params: {
      to: address.current,
    },
  });

  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <main className=''>
      <div className='layout flex min-h-screen flex-col items-center text-center'>
        <div className='mt-16 rounded-md bg-orange-100 py-8 px-4 text-2xl'>
          Welcome to Web3 Love
        </div>
        <div>{user?.get('ethAddress')}</div>
        <ConnectButton />

        <div className='mx-auto mt-8 flex flex-col justify-start rounded-md bg-white p-4'>
          <div className='text-left'>To:</div>
          <input
            onChange={(e) => {
              setRecipient(e.target.value);
            }}
            value={recipient}
            className='rounded-md bg-orange-300 p-2'
            placeholder='Enter the recipient address here'
          />
          <div className='mt-4 text-left'>Message:</div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type='message'
            className='h-32 rounded-md bg-orange-300 p-2'
            placeholder='Enter the message here'
          />
          <div className='relative mt-8 w-full'>
            <ReactSketchCanvas
              height={'697'}
              width={'1024'}
              exportWithBackgroundImage={true}
              strokeColor={''}
              backgroundImage={'/images/envelope_background.jpg'}
              ref={canvas}
              className={'bg-contain'}
            />

            <input
              type='text'
              placeholder='hello world'
              className='absolute top-32 left-32 bg-green-800'
            />
          </div>
          <div className='flex justify-center'>
            <SendMessage
              onClick={async () => {
                const data = await canvas.current?.exportImage('jpeg');
                console.log(data);
                const nftMetadata = await fetch('/api/upload', {
                  method: 'POST',
                  body: JSON.stringify({
                    recipient,
                    image: data,
                    message,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }).then((r) => r.json());
                console.log(nftMetadata);
              }}
            />
          </div>
          <div>
            Your messages:
            {data?.result?.map((r) => {
              return (
                <img
                  className={'h-32 w-32'}
                  src={r.metadata?.image}
                  alt={r.name}
                />
              );
            })}
          </div>
        </div>
      </div>
      <footer className='absolute bottom-2 text-gray-700'>
        © {new Date().getFullYear()} By{" Jessi's hackers"}
      </footer>
    </main>
  );
}
