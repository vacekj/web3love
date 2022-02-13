import * as React from 'react';
import CanvasDraw from 'react-canvas-draw';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  return (
    <main className='bg-red-700'>
      <div className='layout flex min-h-screen flex-col items-center text-center'>
        <div className='mt-16 rounded-md bg-orange-100 py-8 px-4 text-2xl'>
          Welcome to Web3 Love
        </div>
        <div className='mt-8 rounded-md bg-orange-100 p-4 text-2xl'>
          Connect
        </div>
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
            <CanvasDraw hideGrid={true} canvasHeight={400} canvasWidth={800} />
          </div>
          <div className='flex justify-center'>
            <div className='w-fit rounded-md bg-red-700 p-4 text-2xl text-white'>
              <button>Send</button>
            </div>
          </div>
        </div>
        <footer className='absolute bottom-2 text-gray-700'>
          © {new Date().getFullYear()} By{" Jessi's hackers"}
        </footer>
      </div>
    </main>
  );
}
