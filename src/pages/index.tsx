import * as React from 'react';
import { useEffect, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import ConnectButton from '@/components/ConnectButton';
import { useApiContract, useMoralis, useNFTBalances } from 'react-moralis';
import SendMessage from '@/components/SendMessage';
import abi from '../nftContractAbi';

export default function HomePage() {
  const canvas = useRef();
  const { user } = useMoralis();

  const { getNFTBalances, data } = useNFTBalances({
    chain: 'polygon',
    // address: '0x72B6Dc1003E154ac71c76D3795A3829CfD5e33b9',
  });
  useEffect(() => {
    getNFTBalances();
  }, [user]);

  const { data: nftData, runContractFunction: mintNft } = useApiContract({
    address: '0x72B6Dc1003E154ac71c76D3795A3829CfD5e33b9',
    functionName: 'mint',
    abi,
    params: {},
  });

  return (
    <main className='bg-red-700'>
      <div className='layout flex min-h-screen flex-col items-center text-center'>
        <div className='mt-16 rounded-md bg-orange-100 py-8 px-4 text-2xl'>
          Welcome to Web3 Love
        </div>
        <div>{user?.get('ethAddress')}</div>
        <ConnectButton />

        <div className='mx-auto mt-8 flex w-4/5 flex-col justify-start rounded-md bg-white p-4'>
          <div className='text-left'>To:</div>
          <input
            type='addres'
            className='rounded-md bg-orange-300 p-2'
            placeholder='Enter the recipient address here'
          />
          <div className='mt-4 text-left'>Message:</div>
          <input
            type='message'
            className='h-32 rounded-md bg-orange-300 p-2'
            placeholder='Enter the message here'
          />
          <div className='w-full'>
            <CanvasDraw
              hideGrid={true}
              canvasHeight={400}
              canvasWidth={800}
              ref={canvas}
            />
          </div>
          <div className='flex justify-center'>
            <SendMessage
              onClick={() => {
                fetch("/api/upload", {
                  method: "POST",
                  body: JSON.stringify({
                    recipient:
                  })
                })
              }}
            />
          </div>
          <div>
            Your messages:
            {data?.result?.map((r) => {
              console.log(r);
              return <img className={'h-32 w-32'} src={r.metadata?.image} />;
            })}
          </div>
        </div>
        <footer className='absolute bottom-2 text-gray-700'>
          © {new Date().getFullYear()} By{" Jessi's hackers"}
        </footer>
      </div>
    </main>
  );
}
