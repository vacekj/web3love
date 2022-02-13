import * as React from 'react';

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
        <div className='mt-8 rounded-md bg-orange-100 p-4'>Connect</div>
        <div className='mx-auto mt-8 flex w-4/5 flex-col justify-start rounded-md bg-white p-4'>
          <div className='text-left'>To:</div>
          <div className='text-left'>
            <input
              type='addres'
              className='bg-orange-300'
              placeholder='Enter the recipient address here'
            />
          </div>
          <div>Message:</div>
          <input
            type='message'
            className='bg-orange-300'
            placeholder='Enter the message here'
          />
          <div>Canvas drawing</div>
        </div>
        <footer className='absolute bottom-2 text-gray-700'>
          © {new Date().getFullYear()} By{" Jessi's hackers"}
        </footer>
      </div>
    </main>
  );
}
