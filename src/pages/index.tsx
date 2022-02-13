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
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
          <div className='rounded-md bg-red-300 p-4'>Connect</div>
          <div>
            <div>To</div>
            <div>
              <input type='addres' />
            </div>
            <div>Message</div>
            <input type='message' />
            <div>Canvas drawing</div>
          </div>
          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{" Jessi's hackers"}
          </footer>
        </div>
      </section>
    </main>
  );
}
