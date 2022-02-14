import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ConnectButton from '@/components/ConnectButton';
import { useApiContract, useMoralis, useNFTBalances } from 'react-moralis';
import SendMessage from '@/components/SendMessage';
import abi from '../nftContractAbi';
import CanvasDraw from 'react-canvas-draw';
import ResetCanvasButton from '@/components/ResetCanvasButton';
import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
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

  const onClickSend = () => {
    console.log(canvas.current.getDataURL());
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     recipient: '',
    //   }),
    // });
    //   const data = await canvas.current?.exportImage('jpeg');
    //   console.log(data);
    //   const nftMetadata = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       recipient,
    //       image: data,
    //       message,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }).then((r) => r.json());
    //   console.log(nftMetadata);
    // }}
  };

  const onClickReset = () => {
    canvas.current.clear();
  };
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <Layout>
      <Seo />
      <main className=''>
        <div className='layout flex min-h-screen flex-col items-center text-center'>
          <div className='mt-16 rounded-md bg-orange-100 py-8 px-4 text-2xl'>
            Welcome to Web3 Love
          </div>
          <div>{user?.get('ethAddress')}</div>
          <ConnectButton />

          <div className='mx-auto mt-8 flex flex-col justify-start rounded-md'>
            <div className='relative mt-8 w-full'>
              <CanvasDraw
                hideGrid={true}
                canvasHeight={697}
                canvasWidth={1024}
                imgSrc={'/images/envelope_background.jpg'}
                backgroundImage={'/images/envelope_background.jpg'}
                ref={canvas}
                className={'bg-transparent'}
              />

              <div className='absolute top-16 right-24'>
                <img src='/images/envelope_stamp.png' alt='' />
              </div>

              <div className='absolute top-32 left-32 rounded-md border-2 border-black bg-transparent'>
                <textarea
                  onChange={(e) => {
                    if (canvas.current) {
                      const ctx = canvas.current.ctx.drawing;
                      ctx.clearRect(100, 100, 500, 500);
                      ctx.font = '24px serif';
                      wrapText(ctx, e.target.value, 150, 170, 400, 24);
                      // ctx.fillText(e.target.value, 150, 150);
                      setMessage(e.target.value);
                    }
                  }}
                  id=''
                  name=''
                  rows={6}
                  cols={30}
                  className='bg-transparent text-2xl opacity-0'
                />
              </div>
            </div>
            <div className='mt-4 flex flex-row justify-around'>
              <div className='flex justify-center'>
                <ResetCanvasButton onClick={onClickReset} />
              </div>
              <div className='flex justify-center'>
                <SendMessage onClick={onClickSend} />
              </div>
            </div>
            <div>
              <div className='mt-8 text-left text-2xl text-white'>
                Your messages:
              </div>
            </div>
          </div>
          <footer className='m-4 text-2xl text-black'>
            © {new Date().getFullYear()} By{" Jessi's hackers"}
          </footer>
        </div>
      </main>
    </Layout>
  );
}

const wrapText = (
  ctx: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const words = text.split(' ');
  let line = '';
  // @ts-ignore
  for (const [index, w] of words.entries()) {
    const testLine = line + w + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && index > 0) {
      ctx.fillText(line, x, y);
      line = w + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
};
