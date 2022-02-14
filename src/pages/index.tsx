import * as React from 'react';
import { useEffect, useRef } from 'react';
import ConnectButton from '@/components/ConnectButton';
import { useApiContract, useMoralis, useNFTBalances } from 'react-moralis';
import SendMessage from '@/components/SendMessage';
import abi from '../nftContractAbi';
import CanvasDraw from 'react-canvas-draw';
import ResetCanvasButton from '@/components/ResetCanvasButton';

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

  const onClickSend = () => {
    console.log(canvas.current.getDataURL());
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     recipient: '',
    //   }),
    // });
  };

  const onClickReset = () => {
    canvas.current.clear();
  };

  return (
    <main className=''>
      <div className='layout flex min-h-screen flex-col items-center text-center'>
        <div className='mt-16 rounded-md bg-orange-100 py-8 px-4 text-2xl'>
          Welcome to Web3 Love
        </div>
        <div>{user?.get('ethAddress')}</div>
        <ConnectButton />

        <div className='mx-auto mt-8 flex flex-col justify-start rounded-md bg-white p-4'>
          <div className='relative mt-8 w-full'>
            <CanvasDraw
              hideGrid={true}
              canvasHeight={697}
              canvasWidth={1024}
              imgSrc={'/images/envelope_background.jpg'}
              ref={canvas}
              className={'bg-contain'}
            />

            <div className='absolute top-32 left-32 rounded-md border-2 border-black bg-transparent'>
              <textarea
                id=''
                name=''
                rows={6}
                cols={30}
                className='bg-transparent text-2xl'
              />
            </div>
          </div>
          <div className='flex flex-row justify-around'>
            <div className='flex justify-center'>
              <SendMessage onClick={onClickSend} />
            </div>
            <div className='flex justify-center'>
              <ResetCanvasButton onClick={onClickReset} />
            </div>
          </div>

          {/* <div>
            Your messages:
            {data?.result?.map((r) => {
              return <img className={'h-32 w-32'} src={r.metadata?.image} />;
            })}
          </div> */}
        </div>
        <footer className='m-4 text-2xl text-black'>
          © {new Date().getFullYear()} By{" Jessi's hackers"}
        </footer>
      </div>
    </main>
  );
}
